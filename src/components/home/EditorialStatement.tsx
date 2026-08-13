import React from 'react';
import { motion } from 'framer-motion';
import { GoldNumber, GoldMeta } from '../ui/GoldAccent';

export const EditorialStatement: React.FC = () => {
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-[#141413]/10 space-y-12">
      {/* Section Header Marker */}
      <div className="flex items-center justify-between pb-6 border-b border-[#141413]/10">
        <div className="flex items-center gap-3">
          <GoldNumber number={1} />
          <GoldMeta>PHILOSOPHY & MANIFESTO</GoldMeta>
        </div>
        <span className="text-meta text-[#6C6862]/70 hidden sm:inline font-semibold">
          THE ART OF RESTRAINT
        </span>
      </div>

      {/* Large Image + Statement Editorial Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Massive Headline + Narrative Paragraph */}
        <div className="lg:col-span-6 space-y-8">
          <div className="font-serif-editorial text-display-lg text-[#141413] tracking-tight leading-[0.9] select-none">
            <div className="overflow-hidden pb-1">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1.2, ease: easeOutEditorial }}
                className="block font-light"
              >
                THE MOMENTS
              </motion.span>
            </div>

            <div className="overflow-hidden pb-1">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1.2, delay: 0.15, ease: easeOutEditorial }}
                className="block font-normal italic text-[#141413]/90"
              >
                YOU DON'T
              </motion.span>
            </div>

            <div className="overflow-hidden pb-2">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1.2, delay: 0.3, ease: easeOutEditorial }}
                className="block font-light text-[#141413]"
              >
                POSE FOR.
              </motion.span>
            </div>
          </div>

          {/* Narrative Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.0, delay: 0.45, ease: easeOutEditorial }}
            className="space-y-4 pt-4 border-t border-[#141413]/10 max-w-lg"
          >
            <p className="font-sans text-xs sm:text-[13px] md:text-[14px] leading-relaxed text-[#141413]/85 tracking-wide font-normal">
              We believe the photographs worth keeping are rarely the ones you plan.
              They are the glance, the laugh, the trembling hands, the chaos, the silence —
              the moments that become memories before you even realise they happened.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Large High-Editorial Wedding Photograph Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.2, ease: easeOutEditorial }}
          className="lg:col-span-6 relative h-[52vh] sm:h-[62vh] lg:h-[72vh] overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10 shadow-[0_20px_50px_rgba(20,20,19,0.06)]"
          data-cursor="MANIFESTO"
        >
          <img
            src="/images/ceremony-vows.jpg"
            alt="The Picture Square Photography — Candid Emotional Wedding Moment"
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/40 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-5 left-5 z-10 px-4 py-2 bg-[#141413]/85 backdrop-blur-md text-[#F6F4EE] border border-white/10 rounded-full">
            <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#B89B72] uppercase">
              CANDID CELEBRATION ARCHIVE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
