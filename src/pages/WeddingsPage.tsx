import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoldMeta } from '../components/ui/GoldAccent';
import { ArrowUpRight } from 'lucide-react';

interface WeddingItem {
  id: string;
  number: string;
  title: string;
  category: string;
  location: string;
  aspect: string;
  src: string;
  span: string;
}

const WEDDING_GALLERY: WeddingItem[] = [
  {
    id: 'w1',
    number: '01',
    title: 'THE ADORNED LEHENGA',
    category: 'PORTRAITS',
    location: 'ROYAL PALACE · MATHURA',
    aspect: 'aspect-[3/4]',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1400&auto=format&fit=crop',
    span: 'lg:col-span-7',
  },
  {
    id: 'w2',
    number: '02',
    title: 'THE SACRED FLAME',
    category: 'CEREMONIES',
    location: 'TAJ HERITAGE · AGRA',
    aspect: 'aspect-[4/3]',
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=85&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-5',
  },
  {
    id: 'w3',
    number: '03',
    title: 'UNFILTERED EMOTION & LAUGHTER',
    category: 'CANDID',
    location: 'COURTYARD · DELHI NCR',
    aspect: 'aspect-[16/8]',
    src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=85&w=1800&auto=format&fit=crop',
    span: 'lg:col-span-12',
  },
  {
    id: 'w4',
    number: '04',
    title: 'ROYAL BARAAT & CELEBRATION',
    category: 'CELEBRATIONS',
    location: 'RAMBAGH PALACE · JAIPUR',
    aspect: 'aspect-[4/5]',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=85&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-6',
  },
  {
    id: 'w5',
    number: '05',
    title: 'TRADITIONAL BLESSINGS',
    category: 'TRADITIONAL',
    location: 'TEMPLE COURTYARD · MATHURA',
    aspect: 'aspect-[4/5]',
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=85&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-6',
  },
];

const CATEGORIES = ['ALL', 'CANDID', 'TRADITIONAL', 'PORTRAITS', 'CEREMONIES', 'CELEBRATIONS'];

export const WeddingsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  const filteredItems = activeFilter === 'ALL'
    ? WEDDING_GALLERY
    : WEDDING_GALLERY.filter((item) => item.category === activeFilter);

  return (
    <div className="pt-28 pb-24 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-16">
      {/* Editorial Page Header */}
      <div className="space-y-6 max-w-4xl border-b border-[#141413]/10 pb-12">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B89B72]" />
          <GoldMeta>PORTFOLIO ARCHIVE</GoldMeta>
        </div>

        <h1 className="font-serif-editorial text-display-lg text-[#141413] font-light leading-none">
          WEDDINGS
        </h1>

        <p className="font-serif-editorial text-2xl sm:text-3xl font-light italic text-[#6C6862]">
          "The moments, the people, the chaos, the quiet."
        </p>

        <p className="font-sans text-xs text-[#6C6862] tracking-widest uppercase pt-2 max-w-xl">
          Documenting sacred vows, grand rituals, and unguarded tears with high-contrast editorial restraint across Mathura, Agra, Jaipur, and worldwide destinations.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 font-sans pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 text-[10px] font-semibold tracking-[0.22em] uppercase rounded-full transition-all duration-300 ${
              activeFilter === cat
                ? 'bg-[#141413] text-[#F6F4EE]'
                : 'text-[#6C6862] hover:text-[#141413] border border-[#141413]/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Large Portfolio Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easeOutEditorial }}
            className={`group relative ${item.span} flex flex-col space-y-4`}
          >
            <div className={`relative w-full ${item.aspect} overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10`}>
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center filter brightness-[0.98] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#141413]/80 text-[#B89B72] border border-white/10 rounded-full font-sans text-[10px] font-semibold tracking-widest">
                {item.number}
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1 border-b border-[#141413]/10 pb-3 font-sans">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.22em] text-[#B89B72] uppercase block">
                  {item.category}
                </span>
                <h3 className="font-serif-editorial text-2xl text-[#141413]">
                  {item.title}
                </h3>
              </div>
              <span className="text-[10px] font-medium tracking-[0.2em] text-[#6C6862] uppercase">
                {item.location}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Page Closing CTA */}
      <div className="pt-16 border-t border-[#141413]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-meta text-[#B89B72]">READY TO BEGIN?</span>
          <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#141413] font-light">
            RESERVE YOUR WEDDING DATE
          </h3>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#141413] text-[#F6F4EE] hover:bg-[#B89B72] hover:text-[#141413] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400 group"
        >
          <span>START YOUR STORY →</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default WeddingsPage;
