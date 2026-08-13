import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { GoldMeta } from '../ui/GoldAccent';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.88,
      behavior: 'smooth',
    });
  };

  // Easing curve from Emil Kowalski framework
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen pt-28 pb-10 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto flex flex-col justify-between overflow-hidden"
    >
      {/* ------------------------------------------------------------- */}
      {/* MAIN ASYMMETRIC EDITORIAL GRID                                */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* LEFT COLUMN: EXTREMELY LARGE EDITORIAL HEADLINE              */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="lg:col-span-7 z-20 space-y-8 min-w-0"
        >
          {/* Metadata Category Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOutEditorial }}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#B89B72]" />
            <GoldMeta className="text-[#B89B72] font-medium">
              LUXURY EDITORIAL STUDIO
            </GoldMeta>
          </motion.div>

          {/* Headline Lines: WE / PHOTOGRAPH / THE FEELING. */}
          <div className="font-serif-editorial text-hero text-[#141413] tracking-tight leading-[0.88] select-none max-w-full">
            {/* Line 1: WE */}
            <div className="overflow-hidden pb-1">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: easeOutEditorial }}
                className="block font-light"
              >
                WE
              </motion.span>
            </div>

            {/* Line 2: PHOTOGRAPH (Guaranteed fully visible, never clipped) */}
            <div className="overflow-hidden pb-1 pr-2">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.45, ease: easeOutEditorial }}
                className="block font-normal italic tracking-normal text-[#141413]/95 whitespace-nowrap"
              >
                PHOTOGRAPH
              </motion.span>
            </div>

            {/* Line 3: THE FEELING. */}
            <div className="overflow-hidden pb-2">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: easeOutEditorial }}
                className="block font-light text-[#141413]"
              >
                THE FEELING.
              </motion.span>
            </div>
          </div>

          {/* Supporting Information Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: easeOutEditorial }}
            className="pt-4 border-t border-[#141413]/10 max-w-md space-y-2"
          >
            <p className="font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.22em] text-[#141413] uppercase">
              WEDDING & DESTINATION PHOTOGRAPHY
            </p>
            <p className="font-sans text-[11px] sm:text-[12px] font-medium tracking-[0.25em] text-[#6C6862] uppercase flex items-center gap-2">
              <span>MATHURA</span>
              <span className="text-[#B89B72]">•</span>
              <span>AGRA</span>
              <span className="text-[#B89B72]">•</span>
              <span>INDIA</span>
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: EXPANDED FULL-HEIGHT PHOTOGRAPHY HERO CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.25, ease: easeOutEditorial }}
          className="lg:col-span-5 relative w-full h-[52vh] sm:h-[62vh] lg:h-[78vh] overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10 shadow-[0_20px_50px_rgba(20,20,19,0.08)]"
          data-cursor="PORTFOLIO"
        >
          {/* Parallax Container */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative w-full h-[120%] -top-[10%]"
          >
            {/* Cinematic High-Editorial Photography */}
            <img
              src="/images/hero-wedding.jpg"
              alt="The Picture Square Photography — Cinematic Indian Wedding Story"
              loading="eager"
              className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.02]"
            />

            {/* Subtle Editorial Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Minimal Floating Frame Badge */}
          <Link
            to="/stories/a-r"
            className="absolute bottom-5 left-5 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#141413]/85 backdrop-blur-md text-[#F6F4EE] border border-white/10 hover:border-[#B89B72] transition-colors"
          >
            <Sparkles size={12} className="text-[#B89B72]" />
            <span className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-[#D5CFC3]">
              FEATURED STORY →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM MARGIN ROW: SCROLL INDICATOR                           */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.05, ease: easeOutEditorial }}
        className="pt-6 border-t border-[#141413]/10 flex items-center justify-between text-[#6C6862]"
      >
        <div className="flex items-center gap-4 text-meta text-[10px]">
          <span className="text-[#B89B72]">EST. 2000</span>
          <span className="hidden sm:inline text-[#141413]/30">•</span>
          <span className="hidden sm:inline">FINE ART WEDDING CINEMATOGRAPHY</span>
        </div>

        {/* Tiny Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="group flex items-center gap-2.5 text-meta text-[10px] text-[#141413] hover:text-[#B89B72] transition-colors focus:outline-none"
          data-cursor="DOWN"
        >
          <span className="tracking-[0.25em] uppercase">SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="p-1 rounded-full border border-[#141413]/20 group-hover:border-[#B89B72]"
          >
            <ArrowDown size={12} className="text-[#B89B72]" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};
