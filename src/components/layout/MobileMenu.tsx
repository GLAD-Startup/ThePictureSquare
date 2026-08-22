'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/SocialIcons';
import { GoldDivider } from '../ui/GoldAccent';
import { SITE_CONFIG, NavItem } from '@/lib/site-config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavItem[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  links,
}) => {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // 1. Close on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 2. Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 3. Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // 4. Focus trap
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={drawerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg text-fg px-6 py-8 sm:px-10 sm:py-10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={onClose}
              className="flex flex-col rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
            >
              <span className="font-display text-xl sm:text-2xl tracking-[0.20em] uppercase text-fg">
                {SITE_CONFIG.wordmark}
              </span>
              <span className="text-[11px] font-sans font-semibold tracking-[0.22em] text-accent-text uppercase mt-0.5">
                {SITE_CONFIG.cityTag} · UTTAR PRADESH
              </span>
            </Link>

            <button
              onClick={onClose}
              className="p-2.5 text-fg hover:text-accent-text transition-colors rounded-full border border-rule hover:border-accent focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
              aria-label="Close navigation menu"
              data-cursor="CLOSE"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="my-auto py-8">
            <nav className="flex flex-col gap-4 sm:gap-5" aria-label="Mobile Navigation">
              {links.map((link, idx) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.1 + idx * 0.06,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="flex items-baseline gap-4 group"
                  >
                    <span className="text-[12px] font-sans font-semibold text-accent-text tracking-widest w-6">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <Link
                      href={link.path}
                      onClick={onClose}
                      className={`font-sans text-xl sm:text-2xl font-semibold uppercase tracking-[0.18em] transition-colors duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none ${
                        isActive ? 'text-accent-text font-bold' : 'text-fg group-hover:text-accent-text'
                      }`}
                      data-cursor="EXPLORE"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Footer Block */}
          <div className="space-y-5 pt-4">
            <GoldDivider subtle />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-fg-dim text-[13px] font-sans font-medium tracking-wide">
              {/* Location */}
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-accent-text shrink-0" />
                <span className="uppercase text-fg-dim">{SITE_CONFIG.address.formatted}</span>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-2.5">
                <InstagramIcon size={15} className="text-accent-text shrink-0" />
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent-text transition-colors uppercase"
                >
                  @THEPICTURESQUAREPHOTOGRAPHY
                </a>
              </div>

              {/* Booking line */}
              <div className="flex items-center gap-2.5 sm:justify-end">
                <Calendar size={15} className="text-accent-text shrink-0" />
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="text-accent-text hover:text-fg transition-colors uppercase font-semibold tracking-widest"
                >
                  RESERVE 2026/27 WEDDING DATES →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
