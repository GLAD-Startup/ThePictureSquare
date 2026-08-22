'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GoldNumber, GoldMeta } from '../ui/GoldAccent';
import { scrollReveal } from '@/lib/motion';

export const EditorialStatement: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-rule space-y-12">
      {/* Section Header Marker */}
      <div className="flex items-center justify-between pb-6 border-b border-rule">
        <div className="flex items-center gap-3">
          <GoldNumber number={1} />
          <GoldMeta>PHILOSOPHY &amp; MANIFESTO</GoldMeta>
        </div>
        <span className="text-meta text-fg-faint hidden sm:inline font-semibold">
          THE ART OF RESTRAINT
        </span>
      </div>

      {/* Editorial Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Display Headline + Body Narrative */}
        <motion.div
          {...scrollReveal}
          className="lg:col-span-6 space-y-8"
        >
          <div className="font-display text-display-lg text-fg tracking-tight leading-[0.92] select-none">
            <span className="block font-normal">THE MOMENTS</span>
            <span className="block font-normal italic text-fg/90">YOU DON&apos;T</span>
            <span className="block font-normal text-fg">POSE FOR.</span>
          </div>

          {/* Body Copy — Plus Jakarta Sans 400, 16–18px, max-width 68ch */}
          <div className="space-y-4 pt-4 border-t border-rule">
            <p className="prose-editorial text-fg-dim">
              We believe the photographs worth keeping are rarely the ones you plan.
              They are the glance, the laugh, the trembling hands, the chaos, the silence —
              the moments that become memories before you even realise they happened.
            </p>
          </div>
        </motion.div>

        {/* Right Column: High-Editorial Photograph */}
        <motion.div
          {...scrollReveal}
          className="lg:col-span-6 relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden rounded-sm bg-bg-raised border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.06)] group"
          data-cursor="MANIFESTO"
        >
          <Image
            src="/images/ceremony-vows.jpg"
            alt="The Picture Square — Candid Emotional Wedding Moment"
            width={1600}
            height={1200}
            className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-bg-inverse/40 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="absolute bottom-5 left-5 z-10 px-4 py-2 bg-bg-raised/90 backdrop-blur-md text-fg border border-rule rounded-full">
            <span className="font-sans text-[13px] font-semibold tracking-[0.20em] text-accent-text uppercase">
              CANDID CELEBRATION ARCHIVE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialStatement;
