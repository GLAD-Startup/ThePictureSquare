'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GoldMeta } from '@/components/ui/GoldAccent';
import { ArrowUpRight } from 'lucide-react';
import { scrollReveal } from '@/lib/motion';
import { WEDDING_GALLERY, WEDDING_CATEGORIES } from '@/lib/data';

export default function WeddingsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredItems =
    activeFilter === 'ALL'
      ? WEDDING_GALLERY
      : WEDDING_GALLERY.filter((item) => item.category === activeFilter);

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-16">
      {/* Editorial Page Header */}
      <div className="space-y-6 max-w-4xl border-b border-rule pb-12">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          <GoldMeta>PORTFOLIO ARCHIVE</GoldMeta>
        </div>

        <h1 className="font-display text-display-lg text-fg font-normal leading-none">
          WEDDINGS
        </h1>

        <p className="font-display text-2xl sm:text-3xl font-normal italic text-fg-dim">
          &ldquo;The moments, the people, the chaos, the quiet.&rdquo;
        </p>

        <p className="prose-editorial text-fg-dim">
          Documenting sacred vows, grand rituals, and unguarded tears with high-contrast editorial restraint across Mathura, Vrindavan, Agra, Jaipur, and worldwide destinations.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 font-sans pb-4">
        {WEDDING_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 text-[13px] font-semibold tracking-[0.20em] uppercase rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer ${
              activeFilter === cat
                ? 'bg-fg text-fg-inverse'
                : 'text-fg-dim hover:text-fg border border-rule hover:border-accent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            {...scrollReveal}
            className={`group relative ${item.span} flex flex-col space-y-4`}
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto overflow-hidden rounded-sm bg-bg-raised border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.06)]">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                priority={idx === 0}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-bg-raised/90 backdrop-blur-md text-fg border border-rule rounded-full font-sans text-[13px] font-semibold tracking-widest">
                <span className="text-accent-text">{item.number}</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1 border-b border-rule pb-3 font-sans">
              <div>
                <span className="text-[13px] font-semibold tracking-[0.20em] text-accent-text uppercase block">
                  {item.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-fg font-normal">
                  {item.title}
                </h3>
              </div>
              <span className="text-[13px] font-medium tracking-[0.18em] text-fg-dim uppercase">
                {item.location}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Page Closing CTA */}
      <div className="pt-16 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-meta text-accent-text font-semibold">READY TO BEGIN?</span>
          <h3 className="font-display text-3xl sm:text-4xl text-fg font-normal">
            RESERVE YOUR WEDDING DATE
          </h3>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg font-sans text-[13px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md"
        >
          <span>START YOUR STORY →</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
