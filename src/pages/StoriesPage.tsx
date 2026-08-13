import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoldMeta } from '../components/ui/GoldAccent';
import { ArrowUpRight } from 'lucide-react';

export interface StorySummary {
  slug: string;
  number: string;
  couple: string;
  title: string;
  location: string;
  date: string;
  summary: string;
  coverImage: string;
}

export const STORIES_DATA: StorySummary[] = [
  {
    slug: 'a-r',
    number: '01',
    couple: 'ANANYA & ROHAN',
    title: 'PALACE SUNSET & HEIRLOOM JEWELRY',
    location: 'JAIPUR · RAJASTHAN',
    date: '14.02.26',
    summary: 'A three-day palace celebration framed by golden hour light and family heirlooms across Rambagh Palace.',
    coverImage: '/images/hero-wedding.jpg',
  },
  {
    slug: 'p-k',
    number: '02',
    couple: 'PRIYA & KARAN',
    title: 'SACRED VOWS BY THE HERITAGE GHATS',
    location: 'AGRA & MATHURA · UTTAR PRADESH',
    date: '28.11.25',
    summary: 'A traditional celebration grounded in family heritage, sacred rituals, and candid candlelit moments.',
    coverImage: '/images/ceremony-vows.jpg',
  },
  {
    slug: 'm-a',
    number: '03',
    couple: 'MEERA & ADITYA',
    title: 'ROYAL LAKESIDE DESTINATION CHRONICLE',
    location: 'UDAIPUR · RAJASTHAN',
    date: '05.01.26',
    summary: 'An intimate multi-day destination wedding overlooking quiet waters and vintage architecture.',
    coverImage: '/images/sunset-ghats.jpg',
  },
];

export const StoriesPage: React.FC = () => {
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <div className="pt-28 pb-24 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-16">
      {/* Editorial Page Header */}
      <div className="space-y-6 max-w-4xl border-b border-[#141413]/10 pb-12">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B89B72]" />
          <GoldMeta>EDITORIAL CASE STUDY INDEX</GoldMeta>
        </div>

        <h1 className="font-serif-editorial text-display-lg text-[#141413] font-light leading-none">
          FEATURED STORIES
        </h1>

        <p className="font-serif-editorial text-2xl sm:text-3xl font-light italic text-[#6C6862]">
          "Multi-day wedding chronicles captured with documentary restraint and fine-art vision."
        </p>

        <p className="font-sans text-xs text-[#6C6862] tracking-widest uppercase pt-2 max-w-xl">
          Explore complete editorial case studies containing couple introductions, wedding details, curated print sequences, and 4K film previews.
        </p>
      </div>

      {/* Stories Case Studies List */}
      <div className="space-y-16">
        {STORIES_DATA.map((story) => (
          <motion.div
            key={story.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easeOutEditorial }}
            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-[#141413]/10 pt-10"
          >
            {/* Story Cover Photo */}
            <Link
              to={`/stories/${story.slug}`}
              className="lg:col-span-7 relative h-[45vh] sm:h-[55vh] overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10 block"
            >
              <img
                src={story.coverImage}
                alt={story.title}
                loading="lazy"
                className="w-full h-full object-cover object-center filter brightness-[0.98] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#141413]/80 text-[#B89B72] border border-white/10 rounded-full font-sans text-[10px] font-semibold tracking-widest">
                {story.number}
              </div>
            </Link>

            {/* Story Narrative & Link */}
            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="space-y-2">
                <span className="text-meta text-[#B89B72] text-[10px]">
                  {story.location} · {story.date}
                </span>
                <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#141413] group-hover:text-[#B89B72] transition-colors">
                  {story.couple}
                </h2>
                <p className="font-serif-editorial text-xl font-light italic text-[#6C6862]">
                  "{story.title}"
                </p>
              </div>

              <p className="font-sans text-xs text-[#6C6862] leading-relaxed max-w-md">
                {story.summary}
              </p>

              <Link
                to={`/stories/${story.slug}`}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#141413] text-[#F6F4EE] group-hover:bg-[#B89B72] group-hover:text-[#141413] font-sans text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-400"
              >
                <span>VIEW FULL STORY →</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
