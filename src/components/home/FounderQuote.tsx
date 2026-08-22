'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shell } from '@/components/layout/Shell';
import { Rule } from '@/components/ui/Rule';
import { scrollReveal } from '@/lib/motion';

export const FounderQuote: React.FC = () => {
  return (
    <section id="founder-quote" className="relative w-full py-16 sm:py-24">
      <Shell>
        <div className="space-y-10 max-w-4xl mx-auto">
          {/* Hairline Above */}
          <Rule />

          {/* Pull Quote Block with Decorative Opening Mark */}
          <motion.div
            {...scrollReveal}
            className="relative py-4 text-center space-y-8"
          >
            {/* Decorative Opening Mark */}
            <div
              className="font-display text-7xl sm:text-8xl text-accent/30 -mb-10 select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <blockquote className="text-quote text-fg italic font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.3] max-w-3xl mx-auto">
              We do not photograph people to show what they wore.
              We photograph them to show how they loved, how they held one another,
              and what the air felt like when the pheras began.
            </blockquote>

            {/* Attribution in .text-meta */}
            <div className="pt-2">
              <span className="text-meta text-accent-text tracking-[0.24em] block">
                — FOUNDER &amp; LEAD DIRECTION · THE PICTURE SQUARE
              </span>
              <span className="text-meta-sm text-fg-faint tracking-[0.20em] block mt-1">
                ESTABLISHED 2000 · MATHURA, UTTAR PRADESH
              </span>
            </div>
          </motion.div>

          {/* Hairline Below */}
          <Rule />
        </div>
      </Shell>
    </section>
  );
};

export default FounderQuote;
