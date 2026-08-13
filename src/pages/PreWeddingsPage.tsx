import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoldMeta } from '../components/ui/GoldAccent';
import { ArrowUpRight } from 'lucide-react';

interface PreWeddingStory {
  id: string;
  number: string;
  title: string;
  location: string;
  desc: string;
  aspect: string;
  src: string;
  span: string;
}

const PRE_WEDDINGS: PreWeddingStory[] = [
  {
    id: 'pw1',
    number: '01',
    title: 'YAMUNA GHATS SUNSET SILENCE',
    location: 'MATHURA · UTTAR PRADESH',
    desc: 'Golden hour reflection across historic river ghats framed by vintage boats and morning mist.',
    aspect: 'aspect-[16/9]',
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=85&w=1600&auto=format&fit=crop',
    span: 'lg:col-span-12',
  },
  {
    id: 'pw2',
    number: '02',
    title: 'HERITAGE COURTYARD PORTRAIT',
    location: 'AMPHITHEATRE · AGRA',
    desc: 'Intimate couple portrait framed by sandstone arches and quiet shadows.',
    aspect: 'aspect-[3/4]',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=85&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-6',
  },
  {
    id: 'pw3',
    number: '03',
    title: 'PALACE SUNSET LOOKBOOK',
    location: 'RAMBAGH · JAIPUR',
    desc: 'High-editorial lookbook session captured in golden sunlight.',
    aspect: 'aspect-[3/4]',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-6',
  },
];

export const PreWeddingsPage: React.FC = () => {
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <div className="pt-28 pb-24 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-16">
      {/* Editorial Page Header */}
      <div className="space-y-6 max-w-4xl border-b border-[#141413]/10 pb-12">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B89B72]" />
          <GoldMeta>CONCEPTUAL VISUAL STORIES</GoldMeta>
        </div>

        <h1 className="font-serif-editorial text-display-lg text-[#141413] font-light leading-none">
          PRE-WEDDINGS
        </h1>

        <p className="font-serif-editorial text-2xl sm:text-3xl font-light italic text-[#6C6862]">
          "Cinematic visual stories across historic ghats, royal palaces, and intimate landscapes."
        </p>

        <p className="font-sans text-xs text-[#6C6862] tracking-widest uppercase pt-2 max-w-xl">
          Concepts, locations, and couple portraits crafted before the wedding day. Designed like editorial magazine lookbooks.
        </p>
      </div>

      {/* Pre-Weddings High-Scale Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {PRE_WEDDINGS.map((story) => (
          <motion.div
            key={story.id}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easeOutEditorial }}
            className={`group relative ${story.span} flex flex-col space-y-4`}
          >
            <div className={`relative w-full ${story.aspect} overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10`}>
              <img
                src={story.src}
                alt={story.title}
                loading="lazy"
                className="w-full h-full object-cover object-center filter brightness-[0.98] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#141413]/80 text-[#B89B72] border border-white/10 rounded-full font-sans text-[10px] font-semibold tracking-widest">
                {story.number}
              </div>
            </div>

            <div className="space-y-2 pt-1 border-b border-[#141413]/10 pb-4">
              <div className="flex items-center justify-between font-sans text-[10px] text-[#B89B72] uppercase tracking-[0.2em] font-semibold">
                <span>{story.location}</span>
                <span>CONCEPT STORY</span>
              </div>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#141413]">
                {story.title}
              </h3>
              <p className="font-sans text-xs text-[#6C6862] leading-relaxed max-w-xl">
                {story.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dual CTA Footer */}
      <div className="pt-16 border-t border-[#141413]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link
          to="/stories"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#141413]/25 text-[#141413] hover:border-[#B89B72] hover:bg-[#141413] hover:text-[#F6F4EE] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400"
        >
          <span>VIEW FEATURED STORIES →</span>
        </Link>

        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#141413] text-[#F6F4EE] hover:bg-[#B89B72] hover:text-[#141413] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400"
        >
          <span>START YOUR STORY →</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default PreWeddingsPage;
