import React from 'react';
import { motion } from 'framer-motion';
import { GoldNumber, GoldMeta, GoldDivider } from '../ui/GoldAccent';

const LOCATIONS = [
  { name: 'MATHURA', tag: 'HERITAGE STUDIO & HOME' },
  { name: 'AGRA', tag: 'TAJ DESTINATION WEDDINGS' },
  { name: 'DELHI NCR', tag: 'ROYAL PALACE & FARM CELEBRATIONS' },
  { name: 'JAIPUR', tag: 'PALACE & RAJASTHAN DESTINATIONS' },
  { name: 'DESTINATION', tag: 'WORLDWIDE COVERAGE' },
];

export const HeritageMathura: React.FC = () => {
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <section
      id="about"
      className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-[#141413]/10 space-y-20"
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. HERITAGE SECTION — ART EXHIBITION WALL WITH LARGE IMAGE    */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-12">
        {/* Exhibition Header Marker */}
        <div className="flex items-center justify-between pb-6 border-b border-[#141413]/10">
          <div className="flex items-center gap-3">
            <GoldNumber number={4} />
            <GoldMeta>STUDIO HERITAGE & LEGACY</GoldMeta>
          </div>
          <span className="text-meta text-[#6C6862]/70 hidden sm:inline font-semibold">
            ESTABLISHED 2000 — MATHURA, UTTAR PRADESH
          </span>
        </div>

        {/* Minimalist Exhibition Grid Paired with Large Editorial Photograph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Year Numbers & Narrative Copy */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-xs font-semibold tracking-[0.3em] text-[#B89B72] uppercase block">
                TWENTY-SIX YEARS OF UNBROKEN CRAFT
              </span>

              <div className="font-serif-editorial text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-[#141413] tracking-tight leading-none">
                2000 — 2026
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#141413]/10">
              <div className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#141413] leading-[0.95]">
                <span className="block font-light">26 YEARS.</span>
                <span className="block font-normal italic text-[#141413]/90">3,000+ STORIES.</span>
              </div>

              <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#6C6862] tracking-wide max-w-md">
                For more than two decades, we've photographed celebrations,
                families and people at their happiest across India and worldwide.
              </p>
            </div>
          </div>

          {/* Right Column: Large Full-Height Editorial Heritage Photograph */}
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.4, ease: easeOutEditorial }}
            className="lg:col-span-6 relative h-[48vh] sm:h-[58vh] lg:h-[65vh] overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10 shadow-[0_20px_50px_rgba(20,20,19,0.06)]"
            data-cursor="HERITAGE"
          >
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1400&auto=format&fit=crop"
              alt="The Picture Square Photography Heritage Archive"
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 z-10 px-4 py-2 bg-[#141413]/85 backdrop-blur-md text-[#F6F4EE] border border-white/10 rounded-full">
              <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#B89B72] uppercase">
                HERITAGE ARCHIVE (2000 — 2026)
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <GoldDivider subtle />

      {/* ------------------------------------------------------------- */}
      {/* 2. MATHURA & DESTINATION SECTION — DRAMATIC SPLIT              */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-12">
        {/* Section Marker */}
        <div className="flex items-center justify-between pb-6 border-b border-[#141413]/10">
          <div className="flex items-center gap-3">
            <GoldNumber number={5} />
            <GoldMeta>GEOGRAPHIC ANCHOR & DESTINATIONS</GoldMeta>
          </div>
          <span className="text-meta text-[#6C6862]">
            UTTAR PRADESH · INDIA
          </span>
        </div>

        {/* Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Sequential Locations */}
          <div className="lg:col-span-6 space-y-8">
            <div className="font-serif-editorial text-display-lg text-[#141413] tracking-tight leading-[0.92]">
              <span className="block font-light">BORN IN MATHURA.</span>
              <span className="block font-normal italic text-[#141413]/90">BUILT FOR EVERYWHERE.</span>
            </div>

            {/* Sequential Location List */}
            <div className="space-y-3 pt-2 border-t border-[#141413]/10">
              {LOCATIONS.map((loc, idx) => (
                <div
                  key={loc.name}
                  className="flex items-center justify-between py-2 border-b border-[#141413]/5 group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-meta text-[#B89B72] text-[10px]">
                      0{idx + 1}
                    </span>
                    <span className="font-serif-editorial text-2xl sm:text-3xl font-light text-[#141413] group-hover:text-[#B89B72] transition-colors">
                      {loc.name}
                    </span>
                  </div>

                  <span className="font-sans text-[10px] font-semibold tracking-[0.22em] text-[#6C6862] uppercase">
                    {loc.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Large Cinematic Heritage Visual */}
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.4, ease: easeOutEditorial }}
            className="lg:col-span-6 relative h-[50vh] sm:h-[60vh] lg:h-[68vh] overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10 shadow-[0_20px_50px_rgba(20,20,19,0.06)]"
            data-cursor="DESTINATION"
          >
            <img
              src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=85&w=1400&auto=format&fit=crop"
              alt="Mathura Heritage Ghats & Cinematic Architecture"
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 z-10 px-4 py-2 bg-[#141413]/85 backdrop-blur-md text-[#F6F4EE] border border-white/10 rounded-full">
              <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#B89B72] uppercase">
                MATHURA STUDIO & WORLDWIDE DESK
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
