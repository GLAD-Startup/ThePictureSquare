'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Film } from '@/lib/content/types';

interface VideoLightboxProps {
  film: Film | null;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

export const VideoLightbox: React.FC<VideoLightboxProps> = ({
  film,
  onClose,
  triggerElement,
}) => {
  const isOpen = film !== null;
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (triggerElement) {
      triggerRef.current = triggerElement;
    } else if (isOpen && document.activeElement instanceof HTMLElement) {
      triggerRef.current = document.activeElement;
    }
  }, [isOpen, triggerElement]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation & Focus trap
  useEffect(() => {
    if (!isOpen) {
      if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !film) return null;

  const isVertical = film.kind === 'instacut';

  const embedUrl =
    film.provider === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${film.videoId}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${film.videoId}?autoplay=1`;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[95] bg-bg-inverse/97 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
        role="dialog"
        aria-modal="true"
        aria-label={`Video player for ${film.couple} ${film.kind}`}
      >
        {/* Close Button Top Right */}
        <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video player"
            className="p-3 text-fg-inverse hover:text-accent rounded-full border border-fg-inverse/20 hover:border-accent bg-bg-inverse/80 transition-all focus-visible:ring-2 focus-visible:ring-accent focus:outline-none cursor-pointer"
            data-cursor="CLOSE"
          >
            <X size={22} />
          </button>
        </div>

        {/* Video Frame Container */}
        <div
          className={`relative overflow-hidden rounded-sm bg-bg-inverse border border-fg-inverse/20 shadow-[0_25px_70px_rgba(0,0,0,0.8)] ${
            isVertical
              ? 'w-full max-w-[420px] aspect-[9/16] max-h-[88vh]'
              : 'w-full max-w-5xl aspect-[16/9] max-h-[85vh]'
          }`}
        >
          <iframe
            src={embedUrl}
            title={`${film.couple} — ${film.kind}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Caption beneath video */}
        <div className="absolute bottom-5 left-0 right-0 z-40 text-center pointer-events-none">
          <span className="text-meta text-accent tracking-widest uppercase">
            {film.couple} — {film.location} ({film.runtime})
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoLightbox;
