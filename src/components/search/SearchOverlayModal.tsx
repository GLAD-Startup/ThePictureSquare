'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { SearchInterface } from './SearchInterface';

interface SearchOverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlayModal: React.FC<SearchOverlayModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] bg-bg/98 backdrop-blur-lg overflow-y-auto pt-24 pb-20 px-4 sm:px-8 text-fg"
          role="dialog"
          aria-modal="true"
          aria-label="Site Archive Search"
        >
          {/* Close Button Top Right */}
          <div className="fixed top-6 right-6 sm:top-8 sm:right-8 z-50">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search overlay"
              className="p-3 text-fg hover:text-accent-text rounded-full border border-rule hover:border-accent bg-bg-raised/90 transition-all focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer"
              data-cursor="CLOSE"
            >
              <X size={22} />
            </button>
          </div>

          <Shell>
            <div className="py-8">
              <SearchInterface isOverlay onCloseOverlay={onClose} />
            </div>
          </Shell>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlayModal;
