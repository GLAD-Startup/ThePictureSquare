'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: string;
  caption?: string;
  category?: string;
  cursorText?: string;
  priority?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  width = 1200,
  height = 1500,
  className = '',
  aspectRatio = 'aspect-[4/5]',
  caption,
  category,
  cursorText = 'VIEW',
  priority = false,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <figure
      className={`group relative overflow-hidden bg-bg-sunken rounded-sm ${className}`}
      data-cursor={cursorText}
    >
      {/* Curtain Mask Overlay Reveal */}
      <motion.div
        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={
          reducedMotion
            ? { duration: 0.01 }
            : { duration: 1.0, ease: ease.outEditorial }
        }
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-sm bg-bg-sunken`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] filter brightness-[0.98] contrast-[1.02]"
        />

        {/* 1px Inset Border & Inset Ring: keeps light/white photographs defined as objects */}
        <div
          className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
          aria-hidden="true"
        />
      </motion.div>

      {/* Editorial Image Subtitle / Caption */}
      {(caption || category) && (
        <figcaption className="mt-3.5 flex items-center justify-between font-sans text-fg-dim">
          {category && (
            <span className="text-meta text-accent-text tracking-[0.20em] font-semibold">
              {category}
            </span>
          )}
          {caption && (
            <span className="text-[13px] font-normal italic font-display text-fg">
              {caption}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageReveal;
