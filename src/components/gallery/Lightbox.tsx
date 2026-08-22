'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/lib/content/types';
import { ease } from '@/lib/motion';

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  triggerElement?: HTMLElement | null;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  index,
  onClose,
  onNext,
  onPrev,
  triggerElement,
}) => {
  const isOpen = index !== null && index >= 0 && index < images.length;
  const currentImage = isOpen ? images[index] : null;

  const [reducedMotion, setReducedMotion] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchDelta, setTouchDelta] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Remember trigger element to restore focus on close
  useEffect(() => {
    if (triggerElement) {
      triggerRef.current = triggerElement;
    } else if (isOpen && document.activeElement instanceof HTMLElement) {
      triggerRef.current = document.activeElement;
    }
  }, [isOpen, triggerElement]);

  // 1. Check prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // 2. Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // 3. Focus trap & restoration
  useEffect(() => {
    if (!isOpen) {
      // Restore focus on close
      if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
      return;
    }

    const focusableElements = lightboxRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Arrow navigation
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
        return;
      }

      // Tab trap
      if (e.key === 'Tab' && focusableElements && focusableElements.length > 0) {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  // 4. Preload adjacent two images
  useEffect(() => {
    if (!isOpen || index === null) return;

    const indicesToPreload = [
      (index + 1) % images.length,
      (index + 2) % images.length,
      (index - 1 + images.length) % images.length,
    ];

    indicesToPreload.forEach((idx) => {
      const img = images[idx];
      if (img && typeof window !== 'undefined') {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
      }
    });
  }, [isOpen, index, images]);

  // 5. Touch Gestures (Swipe left/right to navigate, swipe down to close)
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only track single touch points so multi-touch pinch-zoom is unaffected
    if (e.touches.length === 1) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setTouchDelta({ x: 0, y: 0 });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    setTouchDelta({
      x: currentX - touchStart.x,
      y: currentY - touchStart.y,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart) return;

    const deltaX = touchDelta.x;
    const deltaY = touchDelta.y;

    // Vertical swipe down threshold (deltaY > 80px and greater than horizontal delta)
    if (deltaY > 80 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
      onClose();
    }
    // Horizontal swipe threshold (deltaX > 50px)
    else if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        onNext();
      } else {
        onPrev();
      }
    }

    setTouchStart(null);
    setTouchDelta({ x: 0, y: 0 });
  };

  if (!isOpen || !currentImage || index === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={lightboxRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[90] bg-bg-inverse/97 backdrop-blur-md flex items-center justify-center select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Image Lightbox Gallery Viewer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Screen Reader Live Announcement Region */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {`Viewing image ${index + 1} of ${images.length}: ${currentImage.alt}`}
        </div>

        {/* Top Control Bar: Close Button */}
        <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 flex items-center gap-4">
          <button
            onClick={onClose}
            aria-label="Close Lightbox (Escape)"
            className="p-3 text-fg-inverse hover:text-accent rounded-full border border-fg-inverse/20 hover:border-accent bg-bg-inverse/80 transition-all focus-visible:ring-2 focus-visible:ring-accent focus:outline-none cursor-pointer"
            data-cursor="CLOSE"
          >
            <X size={20} />
          </button>
        </div>

        {/* ========================================================= */}
        {/* INVISIBLE HIT TARGETS (Left & Right Thirds)              */}
        {/* ========================================================= */}
        {/* Left Third Hit Target */}
        <div
          onClick={onPrev}
          className="absolute inset-y-0 left-0 w-1/3 z-30 cursor-pointer"
          aria-hidden="true"
          data-cursor="PREV"
        />

        {/* Right Third Hit Target */}
        <div
          onClick={onNext}
          className="absolute inset-y-0 right-0 w-1/3 z-30 cursor-pointer"
          aria-hidden="true"
          data-cursor="NEXT"
        />

        {/* ========================================================= */}
        {/* VISIBLE CHEVRON BUTTONS (Desktop >= 768px)                */}
        {/* ========================================================= */}
        <div className="hidden md:flex absolute inset-y-0 left-6 z-40 items-center">
          <button
            onClick={onPrev}
            aria-label="Previous photograph"
            className="p-3.5 rounded-full border border-fg-inverse/20 bg-bg-inverse/80 text-fg-inverse hover:text-accent hover:border-accent transition-all focus-visible:ring-2 focus-visible:ring-accent focus:outline-none cursor-pointer"
            data-cursor="PREV"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        <div className="hidden md:flex absolute inset-y-0 right-6 z-40 items-center">
          <button
            onClick={onNext}
            aria-label="Next photograph"
            className="p-3.5 rounded-full border border-fg-inverse/20 bg-bg-inverse/80 text-fg-inverse hover:text-accent hover:border-accent transition-all focus-visible:ring-2 focus-visible:ring-accent focus:outline-none cursor-pointer"
            data-cursor="NEXT"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* ========================================================= */}
        {/* MAIN CONTAINED PHOTOGRAPH CONTAINER (5vh / 5vw Inset)      */}
        {/* ========================================================= */}
        <div className="relative w-full h-full p-[5vh_5vw] flex items-center justify-center z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage.src}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.98 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.98 }
              }
              transition={
                reducedMotion
                  ? { duration: 0.2 }
                  : { duration: 0.35, ease: ease.smooth }
              }
              className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center pointer-events-auto"
            >
              <div
                className="relative overflow-hidden rounded-sm border border-fg-inverse/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
                style={{
                  maxHeight: '82vh',
                  maxWidth: '90vw',
                  aspectRatio: `${currentImage.width} / ${currentImage.height}`,
                }}
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={currentImage.width}
                  height={currentImage.height}
                  priority
                  fetchPriority="high"
                  placeholder={currentImage.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={currentImage.blurDataURL}
                  sizes="90vw"
                  className="w-auto h-auto max-h-[82vh] max-w-[90vw] object-contain filter brightness-[0.98] contrast-[1.02]"
                />
              </div>

              {/* Optional Caption under Image */}
              {currentImage.alt && (
                <p className="mt-3 text-center text-[12px] font-sans text-fg-inverse/70 tracking-wider uppercase max-w-xl truncate">
                  {currentImage.alt}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM-CENTRE COUNTER: "07 / 42" in .text-meta            */}
        {/* ========================================================= */}
        <div className="absolute bottom-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="px-5 py-2 rounded-full bg-bg-inverse/90 backdrop-blur-md border border-fg-inverse/20 shadow-sm pointer-events-auto">
            <span className="text-meta text-accent font-semibold tracking-[0.24em]">
              {(index + 1).toString().padStart(2, '0')} / {images.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
