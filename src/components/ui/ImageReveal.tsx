import React from 'react';
import { motion } from 'framer-motion';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'aspect-portrait' | 'aspect-landscape' | 'aspect-square' | 'aspect-[4/5]' | 'aspect-[16/9]';
  caption?: string;
  category?: string;
  cursorText?: string;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[4/5]',
  caption,
  category,
  cursorText = 'VIEW',
}) => {
  return (
    <figure className={`group relative overflow-hidden bg-[#ECE8DF] ${className}`} data-cursor={cursorText}>
      {/* Curtain Mask Overlay Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
        className={`relative w-full ${aspectRatio} overflow-hidden`}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
        />

        {/* Understated Vignette Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>

      {/* Optional Editorial Image Subtitle / Caption */}
      {(caption || category) && (
        <figcaption className="mt-3.5 flex items-center justify-between font-sans text-[#6C6862]">
          {category && (
            <span className="text-meta text-[#B89B72] tracking-[0.22em]">
              {category}
            </span>
          )}
          {caption && (
            <span className="text-[12px] font-light italic font-serif-editorial text-[#141413]">
              {caption}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};
