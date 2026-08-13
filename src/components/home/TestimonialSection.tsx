import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldNumber, GoldMeta, GoldDivider } from '../ui/GoldAccent';

interface Testimonial {
  id: string;
  number: string;
  quote: string;
  couple: string;
  event: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'priya-karan',
    number: '01',
    quote: '“Every photograph felt like a moment we remembered rather than a photograph we posed for.”',
    couple: 'PRIYA & KARAN',
    event: 'DESTINATION WEDDING · AGRA',
    location: 'HERITAGE PALACE CELEBRATION',
  },
  {
    id: 'ananya-rohan',
    number: '02',
    quote: '“They captured the quiet glances, the laughter, and the spirit of Jaipur without ever intruding into the celebration.”',
    couple: 'ANANYA & ROHAN',
    event: 'PALACE WEDDING · JAIPUR',
    location: 'RAMBAGH PALACE STORY',
  },
];

export const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = TESTIMONIALS[activeIndex];
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-[#141413]/10">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-12">
        <div className="flex items-center gap-3">
          <GoldNumber number={7} />
          <GoldMeta>WORDS FROM OUR COUPLES</GoldMeta>
        </div>

        {/* Minimal Editorial Pagination Controls */}
        <div className="flex items-center gap-4 font-sans text-xs">
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] transition-all ${
                activeIndex === idx
                  ? 'bg-[#141413] text-[#F6F4EE]'
                  : 'text-[#6C6862] hover:text-[#141413] border border-[#141413]/15'
              }`}
            >
              {item.number} / {item.couple.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Very Large Editorial Quote Frame */}
      <div className="relative py-12 lg:py-16 px-8 sm:px-16 bg-[#ECE8DF]/50 border border-[#141413]/10 rounded-sm space-y-12 min-h-[320px] flex flex-col justify-between">
        {/* Subtle Decorative Background Quotation Mark */}
        <div className="absolute top-6 left-8 font-serif-editorial text-9xl text-[#141413]/5 select-none pointer-events-none">
          “
        </div>

        {/* Massive Editorial Quote Typography with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: easeOutEditorial }}
            className="relative z-10 font-serif-editorial text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light italic text-[#141413] leading-[1.15] max-w-5xl"
          >
            {current.quote}
          </motion.blockquote>
        </AnimatePresence>

        <GoldDivider subtle />

        {/* Couple & Location Metadata */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + '-meta'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans"
          >
            <div className="space-y-1">
              <h4 className="font-serif-editorial text-2xl text-[#141413] font-normal tracking-wide">
                {current.couple}
              </h4>
              <p className="font-sans text-xs tracking-[0.22em] text-[#B89B72] uppercase font-semibold">
                {current.event}
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-meta text-[#6C6862]">
                {current.location}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
