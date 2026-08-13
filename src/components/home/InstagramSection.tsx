import React from 'react';
import { motion } from 'framer-motion';
import { GoldNumber, GoldMeta } from '../ui/GoldAccent';
import { ArrowUpRight } from 'lucide-react';

interface InstagramPost {
  id: string;
  src: string;
  alt: string;
  aspect: string;
  likes: string;
  tag: string;
  span: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    src: '/images/hero-wedding.jpg',
    alt: 'The Picture Square Instagram — Bridal Portrait',
    aspect: 'aspect-[3/4]',
    likes: 'INSTAGRAM · @THEPICTURESQUAREPHOTOGRAPHY',
    tag: 'BRIDE · MATHURA',
    span: 'lg:col-span-4',
  },
  {
    id: 'post-2',
    src: '/images/ceremony-vows.jpg',
    alt: 'The Picture Square Instagram — Wedding Ceremony Ritual',
    aspect: 'aspect-[4/5]',
    likes: 'INSTAGRAM · @THEPICTURESQUAREPHOTOGRAPHY',
    tag: 'CEREMONY · AGRA',
    span: 'lg:col-span-4',
  },
  {
    id: 'post-3',
    src: '/images/jewelry-details.jpg',
    alt: 'The Picture Square Instagram — Heirloom Jewelry Detail',
    aspect: 'aspect-[3/4]',
    likes: 'INSTAGRAM · @THEPICTURESQUAREPHOTOGRAPHY',
    tag: 'DETAILS · JAIPUR',
    span: 'lg:col-span-4',
  },
  {
    id: 'post-4',
    src: '/images/sunset-ghats.jpg',
    alt: 'The Picture Square Instagram — Sunset Couple Portrait',
    aspect: 'aspect-[16/9]',
    likes: 'INSTAGRAM · @THEPICTURESQUAREPHOTOGRAPHY',
    tag: 'COUPLE · YAMUNA GHATS',
    span: 'lg:col-span-7',
  },
  {
    id: 'post-5',
    src: '/images/dance-celebration.jpg',
    alt: 'The Picture Square Instagram — Celebration & Joy',
    aspect: 'aspect-[4/3]',
    likes: 'INSTAGRAM · @THEPICTURESQUAREPHOTOGRAPHY',
    tag: 'CELEBRATION · DELHI',
    span: 'lg:col-span-5',
  },
];

export const InstagramSection: React.FC = () => {
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-[#141413]/10 space-y-12">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#141413]/10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <GoldNumber number={8} />
            <GoldMeta>SOCIAL ARCHIVE</GoldMeta>
          </div>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#141413] font-light flex items-center gap-4">
            FROM OUR LENS →
          </h2>
        </div>

        <div className="space-y-1 text-right sm:text-right">
          <span className="text-meta text-[#B89B72]">INSTAGRAM ARCHIVE</span>
          <p className="font-sans text-xs font-semibold tracking-[0.22em] text-[#141413] uppercase">
            @thepicturesquarephotography
          </p>
        </div>
      </div>

      {/* Curated Asymmetric Image Wall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {INSTAGRAM_POSTS.map((post) => (
          <motion.a
            key={post.id}
            href="https://www.instagram.com/thepicturesquarephotography/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easeOutEditorial }}
            className={`group relative ${post.span} overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10 block`}
            data-cursor="INSTAGRAM"
          >
            <div className={`relative w-full ${post.aspect} overflow-hidden`}>
              <img
                src={post.src}
                alt={post.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center filter brightness-[0.98] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />

              {/* Hover Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Hover Metadata Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-[#F6F4EE]">
                <span className="font-sans text-[10px] font-semibold tracking-[0.22em] text-[#B89B72] uppercase">
                  {post.tag}
                </span>
                <ArrowUpRight size={16} className="text-[#B89B72]" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Discreet Bottom Link */}
      <div className="pt-4 text-center">
        <a
          href="https://www.instagram.com/thepicturesquarephotography/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#141413]/25 text-[#141413] hover:border-[#B89B72] hover:bg-[#141413] hover:text-[#F6F4EE] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400 group"
          data-cursor="INSTAGRAM"
        >
          <span>FOLLOW @thepicturesquarephotography →</span>
        </a>
      </div>
    </section>
  );
};
