import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GoldNumber, GoldMeta } from '../ui/GoldAccent';
import { ArrowUpRight, Check } from 'lucide-react';

interface ServicePanel {
  id: string;
  number: string;
  title: string;
  tags: string;
  description: string;
  locationTag: string;
  deliverables: string[];
  src: string;
  alt: string;
  layout: 'left-image' | 'right-image' | 'full-width';
}

const SERVICES: ServicePanel[] = [
  {
    id: 'weddings',
    number: '01',
    title: 'WEDDINGS',
    tags: 'Candid · Traditional · Editorial',
    description: 'Documenting sacred vows, grand rituals, and unguarded tears with high-contrast editorial restraint.',
    locationTag: 'MATHURA · AGRA · RAJASTHAN',
    deliverables: ['Full Day Dual-Team Still Coverage', 'Signature Heirloom Leather Album', 'Private High-Res Digital Gallery', 'Pre-Wedding Portrait Session'],
    src: '/images/hero-wedding.jpg',
    alt: 'Luxury Editorial Indian Wedding Photography',
    layout: 'right-image',
  },
  {
    id: 'pre-weddings',
    number: '02',
    title: 'PRE-WEDDINGS',
    tags: 'Concepts · Locations · Couples',
    description: 'Cinematic visual stories created across historic ghats, royal palaces, and intimate landscapes.',
    locationTag: 'YAMUNA GHATS · TAJ HERITAGE',
    deliverables: ['2-Day Concept Location Shoot', 'Custom Fine-Art Lookbook Print', 'Styling & Heritage Direction', 'Same-Day Teaser Reel'],
    src: '/images/jewelry-details.jpg',
    alt: 'Pre-Wedding Visual Story Photography',
    layout: 'left-image',
  },
  {
    id: 'cinematography',
    number: '03',
    title: 'CINEMATOGRAPHY',
    tags: 'Wedding Films · Highlights · Stories',
    description: 'Slow-burn 4K wedding films scored with bespoke soundscapes that capture kinetic motion and real sound.',
    locationTag: '4K CINEMA · BESPOKE AUDIO',
    deliverables: ['4K Cinema Feature Length Film', 'Cinematic Trailer & Teaser', 'Bespoke Audio Soundscape Scoring', 'Licensed Drone Aerial Reels'],
    src: '/images/ceremony-vows.jpg',
    alt: 'Cinematic Wedding Film & Motion Picture',
    layout: 'right-image',
  },
  {
    id: 'the-complete-story',
    number: '04',
    title: 'THE COMPLETE STORY',
    tags: 'Photography · Films · Albums · Drone',
    description: 'Our signature full-coverage suite. Handcrafted heirloom leather albums, raw stills, and aerial imagery.',
    locationTag: 'WORLDWIDE COVERAGE',
    deliverables: ['Complete Multi-Day Stills & Cinema', 'Master Heirloom Leather Album Set', 'RAW Archive Storage Hard Drive', 'Lead Photographer Personal Direction'],
    src: '/images/sunset-ghats.jpg',
    alt: 'Full Coverage Heirloom Photography & Film Suite',
    layout: 'full-width',
  },
];

export const ServicesSection: React.FC = () => {
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-[#141413]/10 space-y-20">
      {/* ------------------------------------------------------------- */}
      {/* SECTION INTRODUCTION — LARGE HEADING                          */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center gap-3">
          <GoldNumber number={3} />
          <GoldMeta>SERVICES & CURATED CAPABILITIES</GoldMeta>
        </div>

        <div className="font-serif-editorial text-display-lg text-[#141413] tracking-tight leading-[0.9] select-none">
          <div className="overflow-hidden pb-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.2, ease: easeOutEditorial }}
              className="block font-light"
            >
              STORIES WE
            </motion.span>
          </div>

          <div className="overflow-hidden pb-2">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.2, delay: 0.2, ease: easeOutEditorial }}
              className="block font-normal italic text-[#141413]/90"
            >
              GET TO KEEP.
            </motion.span>
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-[#6C6862] tracking-widest uppercase max-w-md">
          FOUR DISTINCT EDITORIAL CHAPTERS TAILORED FOR CONTEMPORARY INDIAN WEDDINGS & DESTINATION CELEBRATIONS.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* EDITORIAL SERVICE PANELS — NO CARDS                          */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-20">
        {SERVICES.map((service, idx) => (
          <ServicePanelItem
            key={service.id}
            service={service}
            index={idx}
            easeOut={easeOutEditorial}
          />
        ))}
      </div>
    </section>
  );
};

interface ServicePanelItemProps {
  service: ServicePanel;
  index: number;
  easeOut: readonly [number, number, number, number];
}

const ServicePanelItem: React.FC<ServicePanelItemProps> = ({ service, easeOut }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div
      ref={panelRef}
      id={service.id}
      className="group relative border-t border-[#141413]/10 pt-10 lg:pt-14 space-y-6"
      data-cursor="VIEW STORY →"
    >
      {/* Asymmetric Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 font-sans border-b border-[#141413]/5 pb-4">
        <div className="flex items-baseline gap-4">
          <span className="text-meta text-[#B89B72] text-[11px] font-semibold">
            {service.number}
          </span>
          <motion.h3
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#141413] tracking-wide transition-transform duration-500 group-hover:translate-x-3 group-hover:text-[#B89B72]"
          >
            {service.title}
          </motion.h3>
        </div>

        <div className="flex items-center gap-6 text-meta text-[10px] text-[#6C6862]">
          <span className="text-[#B89B72] font-semibold tracking-[0.22em]">
            {service.tags}
          </span>
          <span className="hidden md:inline text-[#141413]/20">•</span>
          <span className="hidden md:inline font-medium tracking-[0.2em]">
            {service.locationTag}
          </span>
        </div>
      </div>

      {/* Main Panel Composition */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center ${
          service.layout === 'left-image' ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Large Background/Foreground Photography Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: easeOut }}
          className={`relative overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10 shadow-[0_20px_50px_rgba(20,20,19,0.05)] ${
            service.layout === 'full-width'
              ? 'lg:col-span-12 h-[52vh] sm:h-[62vh]'
              : 'lg:col-span-7 h-[46vh] sm:h-[54vh]'
          }`}
        >
          <motion.div style={{ y: parallaxY }} className="relative w-full h-[120%] -top-[10%]">
            <img
              src={service.src}
              alt={service.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
            />
          </motion.div>

          {/* Understated Dark Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Hover View Story Action Pill */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#141413]/85 backdrop-blur-md text-[#F6F4EE] border border-[#B89B72]/40 opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:translate-y-0 translate-y-2 pointer-events-none shadow-xl">
            <span className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-[#F6F4EE]">
              VIEW SERVICE DETAILS
            </span>
            <ArrowUpRight size={14} className="text-[#B89B72]" />
          </div>
        </motion.div>

        {/* Narrative Side Text & Key Deliverables List */}
        {service.layout !== 'full-width' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
            className="lg:col-span-5 space-y-6 lg:px-4 bg-[#ECE8DF]/30 p-8 rounded-sm border border-[#141413]/10"
          >
            <p className="font-serif-editorial text-2xl lg:text-3xl font-light text-[#141413] leading-snug">
              "{service.description}"
            </p>

            <div className="space-y-3 pt-2 border-t border-[#141413]/10">
              <span className="text-meta text-[#B89B72] text-[10px]">
                KEY DELIVERABLES & ARCHIVES
              </span>
              <ul className="space-y-2 font-sans text-xs text-[#141413]/85">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <Check size={14} className="text-[#B89B72]" />
                    <span className="tracking-wide font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
