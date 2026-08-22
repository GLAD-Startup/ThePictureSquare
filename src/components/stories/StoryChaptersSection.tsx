'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChapterEvent } from '@/lib/content/types';
import { SectionHead } from '@/components/ui/SectionHead';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { Lightbox } from '@/components/gallery/Lightbox';

interface StoryChaptersSectionProps {
  events: ChapterEvent[];
}

/**
 * Deferred Chapter wrapper that mounts children only when within viewport range
 */
const DeferredChapter: React.FC<{
  children: React.ReactNode;
  isEager: boolean;
}> = ({ children, isEager }) => {
  const [isVisible, setIsVisible] = useState(isEager);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEager || isVisible) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isEager, isVisible]);

  if (!isVisible) {
    return (
      <div ref={containerRef} className="min-h-[400px] flex items-center justify-center">
        <span className="text-meta-sm text-fg-faint tracking-widest uppercase">
          LOADING CHAPTER...
        </span>
      </div>
    );
  }

  return <div ref={containerRef}>{children}</div>;
};

export const StoryChaptersSection: React.FC<StoryChaptersSectionProps> = ({ events }) => {
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const handleOpenLightbox = (
    chapterId: string,
    imageIndex: number,
    triggerEl?: HTMLElement
  ) => {
    setActiveChapterId(chapterId);
    setLightboxIndex(imageIndex);
    if (triggerEl) setTriggerElement(triggerEl);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    setActiveChapterId(null);
  };

  const currentChapter = events.find((ev) => ev.id === activeChapterId);
  const currentChapterImages = currentChapter ? currentChapter.images : [];

  const handleNext = () => {
    if (lightboxIndex !== null && currentChapterImages.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % currentChapterImages.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null && currentChapterImages.length > 0) {
      setLightboxIndex(
        (lightboxIndex - 1 + currentChapterImages.length) % currentChapterImages.length
      );
    }
  };

  return (
    <div className="space-y-32">
      {events.map((event, idx) => {
        const isEager = idx < 2;

        return (
          <section
            key={event.id}
            id={`chapter-${event.id}`}
            className="scroll-mt-24 space-y-12"
          >
            {/* Chapter Event Section Header */}
            <SectionHead
              number={idx + 1}
              title={event.label}
              eyebrow="CHAPTER EVENT"
              align="center"
            />

            {/* MasonryGallery wrapped in DeferredChapter */}
            <DeferredChapter isEager={isEager}>
              <MasonryGallery
                images={event.images}
                onOpen={(imageIdx, el) => handleOpenLightbox(event.id, imageIdx, el)}
              />
            </DeferredChapter>
          </section>
        );
      })}

      {/* Lightbox scoped strictly to the current chapter's images */}
      <Lightbox
        images={currentChapterImages}
        index={lightboxIndex}
        onClose={handleCloseLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
        triggerElement={triggerElement}
      />
    </div>
  );
};

export default StoryChaptersSection;
