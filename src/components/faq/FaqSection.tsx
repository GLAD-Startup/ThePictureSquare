'use client';

import React, { useEffect } from 'react';
import { FaqItem } from '@/lib/content/types';
import { ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  sections: {
    title: string;
    items: FaqItem[];
  }[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ sections }) => {
  // Deep-link support: open matching <details> element if URL carries a hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      const targetEl = document.getElementById(hash);
      if (targetEl && targetEl.tagName.toLowerCase() === 'details') {
        (targetEl as HTMLDetailsElement).open = true;
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    // Check hash on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="space-y-24 max-w-4xl mx-auto">
      {sections.map((sec) => (
        <div key={sec.title} className="space-y-8">
          {/* Hairline Section Head */}
          <div className="border-b border-rule pb-3">
            <h2 className="text-meta text-accent-text font-semibold uppercase tracking-[0.24em]">
              {sec.title}
            </h2>
          </div>

          {/* Native <details> / <summary> List */}
          <div className="divide-y divide-rule border-b border-rule">
            {sec.items.map((item, idx) => {
              const isFirst = idx === 0;

              return (
                <details
                  key={item.id}
                  id={item.id}
                  open={isFirst}
                  className="group py-6 scroll-mt-28 transition-colors duration-200"
                >
                  <summary
                    className="flex items-center justify-between gap-4 cursor-pointer list-none select-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-4 focus-visible:ring-offset-bg focus:outline-none rounded-sm"
                    data-cursor="EXPAND"
                  >
                    <span className="text-[0.9rem] font-sans font-medium uppercase tracking-[0.16em] text-fg group-hover:text-accent-text transition-colors duration-200 leading-snug">
                      {item.question}
                    </span>

                    <span className="p-1 text-accent-text shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-open:rotate-180">
                      <ChevronDown size={18} />
                    </span>
                  </summary>

                  <div className="pt-5 pr-8 font-sans">
                    <p className="text-body text-fg-dim leading-[1.8] font-normal text-sm sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqSection;
