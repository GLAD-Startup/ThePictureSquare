'use client';

import React, { useEffect, useState } from 'react';

interface SectionItem {
  id: string;
  name: string;
  number: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'hero', name: 'HERO', number: '01' },
  { id: 'welcome', name: 'WELCOME', number: '02' },
  { id: 'founder-quote', name: 'MANIFESTO', number: '03' },
  { id: 'three-beliefs', name: 'BELIEFS', number: '04' },
  { id: 'stories', name: 'STORIES', number: '05' },
  { id: 'services', name: 'SERVICES', number: '06' },
  { id: 'enquire', name: 'ENQUIRE', number: '07' },
];

export const SectionIndexRail: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const element = document.getElementById(SECTIONS[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Section Page Index Navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2.5 select-none"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group flex items-center gap-3 py-1 text-right focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none rounded-sm transition-all cursor-pointer"
            aria-label={`Jump to ${sec.name} section`}
          >
            {/* Section Label in .text-meta at 10-11px, legible with --fg-dim on cream */}
            <span
              className={`text-[10px] font-sans tracking-[0.24em] uppercase transition-all duration-300 ${
                isActive
                  ? 'text-fg font-bold translate-x-0'
                  : 'text-fg-dim font-medium hover:text-fg translate-x-0.5'
              }`}
            >
              {sec.number} {sec.name}
            </span>

            {/* Indicator Dot / Accent Bar */}
            <span
              className={`block transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-4 h-[2px] bg-accent'
                  : 'w-1.5 h-[2px] bg-fg-dim/40 group-hover:bg-fg-dim group-hover:w-2.5'
              }`}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </aside>
  );
};

export default SectionIndexRail;
