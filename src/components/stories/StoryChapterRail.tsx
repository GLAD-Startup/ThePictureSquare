'use client';

import React, { useEffect, useState } from 'react';
import { ChapterEvent } from '@/lib/content/types';

interface StoryChapterRailProps {
  events: ChapterEvent[];
}

export const StoryChapterRail: React.FC<StoryChapterRailProps> = ({ events }) => {
  const [activeChapterId, setActiveChapterId] = useState<string>(events[0]?.id || '');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (events.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = entry.target.id.replace('chapter-', '');
            setActiveChapterId(eventId);
          }
        });
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    events.forEach((ev) => {
      const el = document.getElementById(`chapter-${ev.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [events]);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(`chapter-${id}`);
    if (el) {
      el.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  if (events.length === 0) return null;

  return (
    <aside
      aria-label="Story Chapters Rail Navigation"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-12 select-none"
    >
      {events.map((event, idx) => {
        const isActive = activeChapterId === event.id;

        return (
          <button
            key={event.id}
            onClick={() => scrollToChapter(event.id)}
            className="group relative flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none rounded-sm transition-all cursor-pointer"
            aria-label={`Jump to chapter: ${event.label}`}
          >
            {/* Active Accent Line Indicator */}
            <span
              className={`block w-[2px] transition-all duration-300 rounded-full ${
                isActive
                  ? 'h-8 bg-accent'
                  : 'h-2 bg-fg-dim/40 group-hover:h-4 group-hover:bg-fg-dim'
              }`}
              aria-hidden="true"
            />

            {/* Rotated 90deg Vertical Text in .text-meta at 13px (WCAG AA legible with --fg-dim on cream) */}
            <span
              className={`text-[11px] font-sans tracking-[0.24em] uppercase transition-all duration-300 origin-left [writing-mode:vertical-rl] rotate-180 py-1 ${
                isActive
                  ? 'text-fg font-bold translate-x-0'
                  : 'text-fg-dim font-medium hover:text-fg'
              }`}
            >
              0{idx + 1} — {event.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
};

export default StoryChapterRail;
