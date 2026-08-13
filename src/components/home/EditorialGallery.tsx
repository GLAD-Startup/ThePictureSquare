import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoldNumber, GoldMeta } from '../ui/GoldAccent';

interface GalleryItem {
  id: string;
  number: string;
  title: string;
  category: string;
  location: string;
  aspect: string;
  src: string;
  alt: string;
  span: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'bride-portrait',
    number: '01',
    title: 'THE ADORNED BRIDE',
    category: 'WEDDINGS',
    location: 'ROYAL PALACE · MATHURA',
    aspect: 'aspect-[3/4]',
    src: '/images/hero-wedding.jpg',
    alt: 'Luxury Indian Bride Portrait in Traditional Lehenga',
    span: 'lg:col-span-7',
  },
  {
    id: 'ceremony-vows',
    number: '02',
    title: 'THE SACRED RITUAL',
    category: 'WEDDINGS',
    location: 'AMPHITHEATRE · AGRA',
    aspect: 'aspect-[4/3]',
    src: '/images/ceremony-vows.jpg',
    alt: 'Sacred Indian Wedding Ceremony Ritual and Sacred Flame',
    span: 'lg:col-span-5',
  },
  {
    id: 'full-width-landscape',
    number: '03',
    title: 'GOLDEN HOUR SILENCE',
    category: 'PRE-WEDDINGS',
    location: 'YAMUNA GHATS · MATHURA',
    aspect: 'aspect-[16/8]',
    src: '/images/sunset-ghats.jpg',
    alt: 'Panoramic Sunset Portrait at Mathura Ghats',
    span: 'lg:col-span-12',
  },
  {
    id: 'wedding-details',
    number: '04',
    title: 'HEIRLOOM & HEAVY GOLD',
    category: 'PORTRAITS',
    location: 'HERITAGE SUITE · MATHURA',
    aspect: 'aspect-[4/5]',
    src: '/images/jewelry-details.jpg',
    alt: 'Fine-Art Bridal Jewelry and Handcrafted Embroidery Details',
    span: 'lg:col-span-6',
  },
  {
    id: 'dance-floor',
    number: '05',
    title: 'UNFILTERED JOY',
    category: 'WEDDINGS',
    location: 'COURTYARD · DELHI NCR',
    aspect: 'aspect-[4/5]',
    src: '/images/dance-celebration.jpg',
    alt: 'Emotional Family Moment & Dance Floor Celebration',
    span: 'lg:col-span-6',
  },
];

const CATEGORIES = ['ALL', 'WEDDINGS', 'PRE-WEDDINGS', 'PORTRAITS'];

export const EditorialGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  const filteredItems = activeFilter === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-[#141413]/10">
      {/* Exhibition Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#141413]/10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <GoldNumber number={2} />
            <GoldMeta>PHOTOGRAPHY EXHIBITION</GoldMeta>
          </div>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#141413] font-light">
            CURATED STORIES
          </h2>
        </div>

        {/* Editorial Filter Tabs */}
        <div className="flex flex-wrap items-center gap-4 font-sans">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-[10px] font-semibold tracking-[0.22em] uppercase rounded-full transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-[#141413] text-[#F6F4EE] shadow-sm'
                  : 'text-[#6C6862] hover:text-[#141413] border border-[#141413]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* EXPANSIVE EXHIBITION GRID SEQUENCE                            */}
      {/* ------------------------------------------------------------- */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {filteredItems.map((item) => (
          <GalleryCard
            key={item.id}
            item={item}
            easeOut={easeOutEditorial}
          />
        ))}
      </div>
    </section>
  );
};

interface GalleryCardProps {
  item: GalleryItem;
  easeOut: readonly [number, number, number, number];
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, easeOut }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: easeOut }}
      className={`group relative ${item.span} flex flex-col space-y-4`}
      data-cursor="VIEW STORY →"
    >
      {/* Image Container */}
      <div className={`relative w-full ${item.aspect} overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10 shadow-[0_15px_40px_rgba(20,20,19,0.04)]`}>
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] filter brightness-[0.98] contrast-[1.02]"
        />

        {/* Understated Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Number Badge Top Left */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#141413]/80 backdrop-blur-md text-[#F6F4EE] border border-white/10 rounded-full">
          <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#B89B72]">
            {item.number}
          </span>
        </div>

        {/* Hover View Story Tag */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <span className="px-5 py-2.5 bg-[#141413]/90 backdrop-blur-md text-[#F6F4EE] font-sans text-[10px] font-semibold tracking-[0.25em] uppercase rounded-full border border-[#B89B72]/40 shadow-lg">
            VIEW STORY →
          </span>
        </div>
      </div>

      {/* Editorial Metadata Below Image */}
      <div className="flex items-baseline justify-between pt-1 font-sans border-b border-[#141413]/5 pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-semibold tracking-[0.22em] text-[#B89B72] uppercase block">
            {item.category}
          </span>
          <h3 className="font-serif-editorial text-xl text-[#141413] font-normal group-hover:text-[#B89B72] transition-colors duration-300">
            {item.title}
          </h3>
        </div>

        <span className="text-[10px] font-medium tracking-[0.2em] text-[#6C6862] uppercase">
          {item.location}
        </span>
      </div>
    </motion.div>
  );
};
