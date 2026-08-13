import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoldMeta } from '../components/ui/GoldAccent';
import { Play, ArrowUpRight, Film, Volume2 } from 'lucide-react';

interface FilmItem {
  id: string;
  number: string;
  title: string;
  couple: string;
  location: string;
  duration: string;
  audioScore: string;
  aspect: string;
  src: string;
  span: string;
}

const FILMS: FilmItem[] = [
  {
    id: 'film-1',
    number: '01',
    title: 'THE PALACE CHRONICLE',
    couple: 'ANANYA & ROHAN',
    location: 'JAIPUR · 14.02.26',
    duration: '18 MINS · 4K CINEMA',
    audioScore: 'BESPOKE ACOUSTIC & AMBIENT SCORING',
    aspect: 'aspect-[16/9]',
    src: '/images/hero-wedding.jpg',
    span: 'lg:col-span-12',
  },
  {
    id: 'film-2',
    number: '02',
    title: 'SACRED YAMUNA RITUALS',
    couple: 'PRIYA & KARAN',
    location: 'AGRA & MATHURA',
    duration: '12 MINS · 4K CINEMA',
    audioScore: 'CLASSICAL INSTRUMENTAL & NATURAL SOUND',
    aspect: 'aspect-[16/9]',
    src: '/images/ceremony-vows.jpg',
    span: 'lg:col-span-6',
  },
  {
    id: 'film-3',
    number: '03',
    title: 'ROYAL LAKESIDE CELEBRATION',
    couple: 'MEERA & ADITYA',
    location: 'UDAIPUR DESTINATION',
    duration: '15 MINS · 4K CINEMA',
    audioScore: 'ORCHESTRAL SOUNDSCAPE & VOCALS',
    aspect: 'aspect-[16/9]',
    src: '/images/jewelry-details.jpg',
    span: 'lg:col-span-6',
  },
];

export const FilmsPage: React.FC = () => {
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <div className="pt-28 pb-24 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-16">
      {/* Editorial Page Header */}
      <div className="space-y-6 max-w-4xl border-b border-[#141413]/10 pb-12">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B89B72]" />
          <GoldMeta>FINE ART CINEMATOGRAPHY DIVISION</GoldMeta>
        </div>

        <h1 className="font-serif-editorial text-display-lg text-[#141413] font-light leading-none">
          FILMS
        </h1>

        <p className="font-serif-editorial text-2xl sm:text-3xl font-light italic text-[#6C6862]">
          "Slow-burn 4K wedding films scored with bespoke soundscapes that capture kinetic motion and real sound."
        </p>

        <p className="font-sans text-xs text-[#6C6862] tracking-widest uppercase pt-2 max-w-xl">
          Documentary motion pictures crafted with 4K cinema optics, drone aerials, and licensed custom audio scoring.
        </p>
      </div>

      {/* Cinematic Film Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {FILMS.map((film) => (
          <motion.div
            key={film.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easeOutEditorial }}
            className={`group relative ${film.span} flex flex-col space-y-4`}
          >
            {/* Film Poster Frame */}
            <div className={`relative w-full ${film.aspect} overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10`}>
              <img
                src={film.src}
                alt={film.title}
                loading="lazy"
                className="w-full h-full object-cover object-center filter brightness-[0.96] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/70 via-[#141413]/20 to-transparent" />

              {/* Top Bar Badges */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between font-sans text-[10px] text-[#F6F4EE]">
                <div className="flex items-center gap-2 px-3 py-1 bg-[#141413]/80 rounded-full border border-white/10">
                  <Film size={12} className="text-[#B89B72]" />
                  <span className="font-semibold tracking-widest text-[#B89B72]">{film.number}</span>
                </div>

                <div className="px-3 py-1 bg-[#141413]/80 rounded-full border border-white/10 tracking-widest uppercase text-[#D5CFC3]">
                  {film.duration}
                </div>
              </div>

              {/* Play Trigger Center */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#141413]/80 backdrop-blur-md border border-[#B89B72]/50 text-[#F6F4EE] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#B89B72] group-hover:text-[#141413] transition-all duration-400">
                  <Play size={24} className="ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Bottom Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 font-sans text-xs text-[#F6F4EE] flex items-center justify-between">
                <span className="font-semibold tracking-widest uppercase">{film.couple}</span>
                <span className="text-[10px] tracking-wider text-[#D5CFC3] uppercase">{film.location}</span>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="space-y-1 pt-1 border-b border-[#141413]/10 pb-3">
              <h3 className="font-serif-editorial text-2xl text-[#141413]">
                {film.title}
              </h3>
              <div className="flex items-center gap-2 font-sans text-[10px] text-[#6C6862] tracking-wider uppercase">
                <Volume2 size={12} className="text-[#B89B72]" />
                <span>{film.audioScore}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Page Closing CTA */}
      <div className="pt-16 border-t border-[#141413]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-meta text-[#B89B72]">CINEMATOGRAPHY COMMISSIONS</span>
          <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#141413] font-light">
            COMMISSION A 4K WEDDING FILM
          </h3>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#141413] text-[#F6F4EE] hover:bg-[#B89B72] hover:text-[#141413] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400 group"
        >
          <span>ENQUIRE ABOUT FILMS →</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default FilmsPage;
