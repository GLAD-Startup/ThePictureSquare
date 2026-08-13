import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film } from 'lucide-react';
import { GoldDivider, GoldMeta } from '../ui/GoldAccent';

export interface StoryData {
  id: string;
  couple: string;
  location: string;
  date: string;
  coverImage: string;
  introText: string;
  details: {
    venue: string;
    planner: string;
    outfits: string;
    filmTitle: string;
  };
  gallery: { src: string; alt: string; aspect: string }[];
}

export const SAMPLE_STORY: StoryData = {
  id: 'a-and-r-jaipur',
  couple: 'ANANYA + ROHAN',
  location: 'JAIPUR, RAJASTHAN',
  date: 'FEBRUARY 14, 2026',
  coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1600&auto=format&fit=crop',
  introText: 'A three-day royal palace celebration framed by golden hour light, family heirlooms, and unscripted laughter across the courtyards of Jaipur.',
  details: {
    venue: 'THE PALACE AT RAMBAGH · JAIPUR',
    planner: 'HERITAGE WEDDINGS INDIA',
    outfits: 'SABYASACHI & DESIGNER ARCHIVES',
    filmTitle: 'THE PALACE IN GOLDEN LIGHT (4K CINEMA)',
  },
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=85&w=1200&auto=format&fit=crop',
      alt: 'The Sacred Vows & Pheras',
      aspect: 'aspect-[4/3]',
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=85&w=1000&auto=format&fit=crop',
      alt: 'Bridal Jewelry & Gold Embroidery Details',
      aspect: 'aspect-[3/4]',
    },
    {
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=85&w=1600&auto=format&fit=crop',
      alt: 'Sunset Couple Portrait at Palace Lawn',
      aspect: 'aspect-[16/9]',
    },
    {
      src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=85&w=1200&auto=format&fit=crop',
      alt: 'Dance Floor & Reception Celebration',
      aspect: 'aspect-[4/5]',
    },
  ],
};

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story?: StoryData;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  story = SAMPLE_STORY,
}) => {
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] bg-[#141413]/95 backdrop-blur-lg text-[#F6F4EE] overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-12 bg-[#141413]/90 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-4">
              <span className="font-serif-editorial text-2xl tracking-widest text-[#F6F4EE]">
                THE PICTURE SQUARE
              </span>
              <span className="hidden sm:inline text-meta text-[#B89B72]">
                CASE STUDY — {story.couple}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-3 rounded-full border border-white/15 text-[#F6F4EE] hover:border-[#B89B72] hover:text-[#B89B72] transition-colors"
              aria-label="Close story"
              data-cursor="CLOSE"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Container */}
          <div className="max-w-[1280px] mx-auto px-6 sm:px-12 py-12 space-y-24">
            {/* 1. Hero Cover Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: easeOutEditorial }}
              className="relative w-full h-[65vh] sm:h-[75vh] overflow-hidden rounded-sm border border-white/10"
            >
              <img
                src={story.coverImage}
                alt={story.couple}
                className="w-full h-full object-cover object-center filter brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-transparent to-transparent opacity-80" />

              {/* Cover Metadata Overlay */}
              <div className="absolute bottom-8 left-8 right-8 z-10 space-y-3">
                <span className="text-meta text-[#B89B72]">{story.location}</span>
                <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-[#F6F4EE]">
                  {story.couple}
                </h1>
                <p className="font-sans text-xs text-[#9B968E] tracking-widest uppercase">
                  CELEBRATED ON {story.date}
                </p>
              </div>
            </motion.div>

            {/* 2. Couple Introduction Narrative */}
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <GoldMeta>THE NARRATIVE</GoldMeta>
              <p className="font-serif-editorial text-3xl sm:text-4xl text-[#F6F4EE] font-light leading-relaxed italic">
                "{story.introText}"
              </p>
            </div>

            <GoldDivider subtle className="bg-white/10" />

            {/* 3. Wedding Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4 text-xs font-sans">
              <div className="space-y-1">
                <span className="text-meta text-[#B89B72]">VENUE</span>
                <p className="font-semibold text-[#D5CFC3] tracking-wider uppercase">
                  {story.details.venue}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-meta text-[#B89B72]">STYLING & ARCHIVES</span>
                <p className="font-semibold text-[#D5CFC3] tracking-wider uppercase">
                  {story.details.outfits}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-meta text-[#B89B72]">PLANNING</span>
                <p className="font-semibold text-[#D5CFC3] tracking-wider uppercase">
                  {story.details.planner}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-meta text-[#B89B72]">CINEMA RELEASE</span>
                <p className="font-semibold text-[#D5CFC3] tracking-wider uppercase flex items-center gap-2">
                  <Film size={14} className="text-[#B89B72]" />
                  {story.details.filmTitle}
                </p>
              </div>
            </div>

            {/* 4. Editorial Image Sequence */}
            <div className="space-y-12">
              <div className="flex items-center justify-between">
                <GoldMeta>EDITORIAL PHOTOGRAPHY SEQUENCE</GoldMeta>
                <span className="font-sans text-[11px] text-[#9B968E] uppercase tracking-widest">
                  CURATED PRINTS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {story.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-sm border border-white/10 ${img.aspect} ${
                      idx === 2 ? 'md:col-span-2' : ''
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover filter brightness-[0.98]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button Footer */}
            <div className="pt-12 text-center pb-8">
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-full border border-[#B89B72] text-[#F6F4EE] hover:bg-[#B89B72] hover:text-[#141413] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400"
              >
                CLOSE STORY EXHIBITION
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
