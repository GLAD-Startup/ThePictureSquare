'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SingleImage } from '@/lib/content/types';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { Lightbox } from '@/components/gallery/Lightbox';

interface ImagesExplorerProps {
  images: SingleImage[];
}

const CATEGORIES = [
  'ALL',
  'PORTRAITS',
  'CEREMONIES',
  'CANDID',
  'DETAILS',
  'CELEBRATIONS',
] as const;

type Category = (typeof CATEGORIES)[number];
const BATCH_SIZE = 40;

export const ImagesExplorer: React.FC<ImagesExplorerProps> = ({ images }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read active category from URL (?category=PORTRAITS)
  const categoryParam = (searchParams.get('category') || 'ALL').toUpperCase() as Category;
  const activeCategory = CATEGORIES.includes(categoryParam) ? categoryParam : 'ALL';

  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // Filter images by selected category
  const filteredImages = useMemo(() => {
    if (activeCategory === 'ALL') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  // Reset visibleCount when category changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [activeCategory]);

  // Progressive loading with IntersectionObserver sentinel
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredImages.length));
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [filteredImages.length]);

  const handleCategoryChange = (cat: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'ALL') {
      params.delete('category');
    } else {
      params.set('category', cat.toLowerCase());
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleOpenLightbox = (index: number, element?: HTMLElement) => {
    setLightboxIndex(index);
    if (element) setTriggerEl(element);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex !== null && filteredImages.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null && filteredImages.length > 0) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  const displayedImages = filteredImages.slice(0, visibleCount);

  return (
    <div className="space-y-12">
      {/* ------------------------------------------------------------- */}
      {/* 1. CATEGORY PILL FILTER                                       */}
      {/* ------------------------------------------------------------- */}
      <nav
        aria-label="Image Category Filter"
        className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 border-b border-rule scrollbar-none select-none justify-center"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-meta-sm uppercase transition-all duration-300 shrink-0 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer ${
                isActive
                  ? 'bg-fg text-fg-inverse font-semibold shadow-sm'
                  : 'text-fg-dim hover:text-fg border border-rule hover:border-accent'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </nav>

      {/* ------------------------------------------------------------- */}
      {/* 2. 4-COLUMN MASONRY GALLERY                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full">
        <MasonryGallery
          images={displayedImages}
          onOpen={handleOpenLightbox}
          className="columns-1 sm:columns-2 md:columns-3 xl:columns-4"
        />
      </div>

      {/* Progressive Loading Sentinel */}
      {visibleCount < filteredImages.length && (
        <div ref={sentinelRef} className="h-16 flex items-center justify-center">
          <span className="text-meta-sm text-accent-text animate-pulse font-semibold">
            LOADING MORE ARCHIVAL FRAMES...
          </span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. SHARED LIGHTBOX VIEWER                                     */}
      {/* ------------------------------------------------------------- */}
      <Lightbox
        images={filteredImages}
        index={lightboxIndex}
        onClose={handleCloseLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
        triggerElement={triggerEl}
      />
    </div>
  );
};

export default ImagesExplorer;
