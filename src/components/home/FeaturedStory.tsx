'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GoldNumber, GoldMeta } from '../ui/GoldAccent';
import { ArrowRight } from 'lucide-react';
import { scrollReveal } from '@/lib/motion';

export const FeaturedStory: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-rule space-y-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-rule">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <GoldNumber number={6} />
            <GoldMeta>FEATURED CASE STUDY</GoldMeta>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-fg font-normal">
            FEATURED WEDDING STORY
          </h2>
        </div>

        <Link
          href="/stories"
          className="font-sans text-[13px] text-fg-dim hover:text-accent-text tracking-widest uppercase transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
        >
          VIEW ALL STORIES →
        </Link>
      </div>

      {/* Cinematic Featured Story Card */}
      <motion.div
        {...scrollReveal}
        className="group relative w-full h-[60vh] sm:h-[72vh] lg:h-[80vh] overflow-hidden rounded-sm bg-bg-raised border border-rule shadow-[0_15px_40px_rgba(20,20,19,0.08)]"
        data-cursor="OPEN STORY"
      >
        <Link
          href="/stories/ananya-rohan"
          className="block w-full h-full relative focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
          aria-label="View Ananya & Rohan featured wedding story"
        >
          <Image
            src="/images/hero-wedding.jpg"
            alt="Ananya and Rohan Jaipur Wedding Story"
            width={1600}
            height={1000}
            className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-bg-inverse/90 via-bg-inverse/30 to-transparent transition-opacity duration-500"
            aria-hidden="true"
          />

          {/* Top Left Tag */}
          <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-bg-raised/90 backdrop-blur-md text-fg border border-rule rounded-full">
            <span className="font-sans text-[13px] font-semibold tracking-[0.20em] text-accent-text uppercase">
              JAIPUR PALACE STORY
            </span>
          </div>

          {/* Bottom Content Overlay (Inside inverse dark overlay) */}
          <div className="absolute bottom-8 left-8 right-8 sm:bottom-12 sm:left-12 sm:right-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-8 text-fg-inverse">
            <div className="space-y-3 max-w-xl">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-fg-inverse">
                A + R
              </span>
              <p className="font-sans text-[13px] sm:text-[14px] font-semibold tracking-[0.22em] text-fg-inverse/80 uppercase">
                JAIPUR · NOVEMBER 2026
              </p>
              <p className="font-display text-lg sm:text-xl font-normal italic text-fg-inverse/90 max-w-md hidden sm:block">
                &ldquo;A three-day palace celebration framed by golden hour light and family heirlooms.&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]">
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wider text-fg-inverse group-hover:text-accent transition-colors">
                VIEW STORY →
              </span>
              <div className="p-3 rounded-full border border-fg-inverse/30 group-hover:border-accent group-hover:bg-accent group-hover:text-fg-inverse transition-all">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default FeaturedStory;
