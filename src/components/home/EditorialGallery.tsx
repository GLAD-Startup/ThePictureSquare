'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GoldNumber, GoldMeta } from '../ui/GoldAccent';
import { scrollReveal } from '@/lib/motion';
import { WEDDING_GALLERY, WeddingItem } from '@/lib/data';

const CATEGORIES = ['ALL', 'PORTRAITS', 'CEREMONIES', 'CANDID', 'CELEBRATIONS', 'TRADITIONAL'] as const;

export const EditorialGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredItems =
    activeFilter === 'ALL'
      ? WEDDING_GALLERY
      : WEDDING_GALLERY.filter((item) => item.category === activeFilter);

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-rule">
      {/* Exhibition Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-rule">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <GoldNumber number={2} />
            <GoldMeta>PHOTOGRAPHY EXHIBITION</GoldMeta>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-fg font-normal">
            CURATED STORIES
          </h2>
        </div>

        {/* Editorial Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 font-sans">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-[13px] font-semibold tracking-[0.20em] uppercase rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer ${
                activeFilter === cat
                  ? 'bg-fg text-fg-inverse shadow-sm'
                  : 'text-fg-dim hover:text-fg border border-rule hover:border-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exhibition Grid */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {filteredItems.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

interface GalleryCardProps {
  item: WeddingItem;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item }) => {
  return (
    <motion.div
      {...scrollReveal}
      className={`group relative ${item.span} flex flex-col space-y-4`}
      data-cursor="PORTFOLIO"
    >
      {/* Image Container with Inset Border & Subtle Ring */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto overflow-hidden rounded-sm bg-bg-sunken border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.04)]">
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] filter brightness-[0.98] contrast-[1.02]"
        />

        {/* 1px Inset Border & Ring */}
        <div
          className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
          aria-hidden="true"
        />

        {/* Number Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-bg-raised/90 backdrop-blur-md text-fg border border-rule rounded-full">
          <span className="font-sans text-[13px] font-semibold tracking-[0.20em] text-accent-text">
            {item.number}
          </span>
        </div>
      </div>

      {/* Editorial Metadata Below Image */}
      <div className="flex items-baseline justify-between pt-1 font-sans border-b border-rule pb-3">
        <div className="space-y-1">
          <span className="text-[13px] font-semibold tracking-[0.20em] text-accent-text uppercase block">
            {item.category}
          </span>
          <h3 className="font-display text-2xl text-fg font-normal group-hover:text-accent-text transition-colors duration-300">
            {item.title}
          </h3>
        </div>

        <span className="text-[13px] font-medium tracking-[0.18em] text-fg-dim uppercase">
          {item.location}
        </span>
      </div>
    </motion.div>
  );
};

export default EditorialGallery;
