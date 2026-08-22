'use client';

import React, { useState } from 'react';
import { GalleryImage } from '@/lib/content/types';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { Lightbox } from '@/components/gallery/Lightbox';

interface PreWeddingFlatGalleryProps {
  images: GalleryImage[];
}

export const PreWeddingFlatGallery: React.FC<PreWeddingFlatGalleryProps> = ({ images }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const handleOpen = (index: number, element?: HTMLElement) => {
    setLightboxIndex(index);
    if (element) setTriggerElement(element);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="space-y-6">
      <MasonryGallery images={images} onOpen={handleOpen} />

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
        triggerElement={triggerElement}
      />
    </div>
  );
};

export default PreWeddingFlatGallery;
