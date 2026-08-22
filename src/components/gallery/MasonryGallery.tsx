'use client';

import React from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/lib/content/types';

interface MasonryGalleryProps {
  images: GalleryImage[];
  onOpen?: (index: number, triggerElement?: HTMLElement) => void;
  className?: string;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  images,
  onOpen,
  className = '',
}) => {
  return (
    <div
      className={`w-full columns-1 sm:columns-2 lg:columns-3 gap-3 lg:gap-5 ${className}`}
    >
      {images.map((image, index) => {
        const isEager = index < 6;

        return (
          <div
            key={`${image.src}-${index}`}
            className="break-inside-avoid mb-3 lg:mb-5 relative group overflow-hidden rounded-sm bg-bg-raised border border-rule shadow-[0_4px_20px_rgba(20,20,19,0.04)]"
          >
            <button
              type="button"
              onClick={(e) => onOpen?.(index, e.currentTarget)}
              aria-label={image.alt || `View photograph ${index + 1}`}
              className="block w-full text-left relative overflow-hidden focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus:outline-none cursor-pointer"
              data-cursor="EXPAND"
            >
              {/* Natural Aspect Ratio Preservation & Sunken Skeleton Ground */}
              <div
                className="relative w-full overflow-hidden bg-bg-sunken rounded-sm"
                style={{
                  aspectRatio: `${image.width} / ${image.height}`,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading={isEager ? 'eager' : 'lazy'}
                  priority={isEager}
                  placeholder={image.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={image.blurDataURL}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] filter brightness-[0.98] contrast-[1.02]"
                />

                {/* 1px Inset Border & Subtle Inset Ring: keeps high-key/white images crisp on #F6F4EE */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
                  aria-hidden="true"
                />

                {/* Corner Frame Marker */}
                <div
                  className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2.5 py-1 bg-bg-raised/90 backdrop-blur-md rounded-full border border-rule pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="text-meta-sm text-accent-text font-semibold">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MasonryGallery;
