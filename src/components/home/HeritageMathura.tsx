'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GoldNumber, GoldMeta, GoldDivider } from '../ui/GoldAccent';
import { scrollReveal } from '@/lib/motion';
import { HERITAGE_LOCATIONS } from '@/lib/data';

export const HeritageMathura: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-rule space-y-20"
    >
      {/* 1. Heritage Section */}
      <div className="space-y-12">
        {/* Exhibition Header Marker */}
        <div className="flex items-center justify-between pb-6 border-b border-rule">
          <div className="flex items-center gap-3">
            <GoldNumber number={4} />
            <GoldMeta>STUDIO HERITAGE &amp; LEGACY</GoldMeta>
          </div>
          <span className="text-meta text-fg-faint hidden sm:inline font-semibold">
            ESTABLISHED 2000 — MATHURA, UTTAR PRADESH
          </span>
        </div>

        {/* Minimalist Exhibition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <motion.div {...scrollReveal} className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-[13px] font-semibold tracking-[0.22em] text-accent-text uppercase block">
                TWENTY-SIX YEARS OF UNBROKEN CRAFT
              </span>

              <div className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal text-fg tracking-tight leading-none">
                2000 — 2026
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-rule">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-fg leading-[0.95]">
                <span className="block font-normal">26 YEARS.</span>
                <span className="block font-normal italic text-fg/90">3,000+ STORIES.</span>
              </div>

              <p className="prose-editorial text-fg-dim">
                For more than two decades, we&apos;ve photographed celebrations,
                families and people at their happiest across India and worldwide.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Heritage Photograph */}
          <motion.div
            {...scrollReveal}
            className="lg:col-span-6 relative h-[48vh] sm:h-[58vh] lg:h-[65vh] overflow-hidden rounded-sm bg-bg-raised border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.06)] group"
            data-cursor="HERITAGE"
          >
            <Image
              src="/images/hero-wedding.jpg"
              alt="The Picture Square Heritage Archive"
              width={1200}
              height={1600}
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-bg-inverse/40 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div className="absolute bottom-5 left-5 z-10 px-4 py-2 bg-bg-raised/90 backdrop-blur-md text-fg border border-rule rounded-full">
              <span className="font-sans text-[13px] font-semibold tracking-[0.20em] text-accent-text uppercase">
                HERITAGE ARCHIVE (2000 — 2026)
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <GoldDivider subtle />

      {/* 2. Mathura & Destinations Section */}
      <div className="space-y-12">
        {/* Section Marker */}
        <div className="flex items-center justify-between pb-6 border-b border-rule">
          <div className="flex items-center gap-3">
            <GoldNumber number={5} />
            <GoldMeta>GEOGRAPHIC ANCHOR &amp; DESTINATIONS</GoldMeta>
          </div>
          <span className="text-meta text-fg-dim">
            UTTAR PRADESH · INDIA
          </span>
        </div>

        {/* Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Sequential Locations */}
          <motion.div {...scrollReveal} className="lg:col-span-6 space-y-8">
            <div className="font-display text-display-lg text-fg tracking-tight leading-[0.92]">
              <span className="block font-normal">BORN IN MATHURA.</span>
              <span className="block font-normal italic text-fg/90">BUILT FOR EVERYWHERE.</span>
            </div>

            {/* Sequential Location List */}
            <div className="space-y-3 pt-2 border-t border-rule">
              {HERITAGE_LOCATIONS.map((loc, idx) => (
                <div
                  key={loc.name}
                  className="flex items-center justify-between py-2.5 border-b border-rule/50 group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-meta text-accent-text">
                      0{idx + 1}
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-normal text-fg group-hover:text-accent-text transition-colors">
                      {loc.name}
                    </span>
                  </div>

                  <span className="font-sans text-[13px] font-semibold tracking-[0.20em] text-fg-dim uppercase">
                    {loc.tag}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Heritage Visual */}
          <motion.div
            {...scrollReveal}
            className="lg:col-span-6 relative h-[50vh] sm:h-[60vh] lg:h-[68vh] overflow-hidden rounded-sm bg-bg-raised border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.06)] group"
            data-cursor="DESTINATION"
          >
            <Image
              src="/images/mathura-heritage.jpg"
              alt="Mathura Heritage Ghats and Architecture"
              width={1600}
              height={1000}
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-bg-inverse/40 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div className="absolute bottom-5 left-5 z-10 px-4 py-2 bg-bg-raised/90 backdrop-blur-md text-fg border border-rule rounded-full">
              <span className="font-sans text-[13px] font-semibold tracking-[0.20em] text-accent-text uppercase">
                MATHURA STUDIO &amp; WORLDWIDE DESK
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeritageMathura;
