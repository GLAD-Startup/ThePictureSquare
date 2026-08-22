import React from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/site-config';
import { InstagramIcon } from '@/components/ui/SocialIcons';
import { ArrowUpRight } from 'lucide-react';

const INSTAGRAM_POSTS = [
  {
    src: '/images/hero-wedding.jpg',
    alt: 'Rambagh Palace bridal portrait in pink sandstone corridor',
  },
  {
    src: '/images/ceremony-vows.jpg',
    alt: 'Sacred fire pheras and Sanskrit shlokas',
  },
  {
    src: '/images/sunset-ghats.jpg',
    alt: 'Dawn river mist portrait along Vishram Ghat Mathura',
  },
  {
    src: '/images/dance-celebration.jpg',
    alt: 'High-energy sangeet and folk celebrations',
  },
  {
    src: '/images/jewelry-details.jpg',
    alt: 'Antique Polki diamond jewelry and bridal kaliras',
  },
  {
    src: '/images/mathura-heritage.jpg',
    alt: 'Candlelight reflections in Vrindavan temple arcades',
  },
];

export const InstagramStrip: React.FC = () => {
  return (
    <section className="space-y-8 pt-12 border-t border-rule">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-accent/10 text-accent-text">
            <InstagramIcon size={18} />
          </div>
          <div>
            <span className="text-meta text-accent-text block uppercase font-semibold">
              DAILY VISUAL DISPATCHES
            </span>
            <h3 className="font-display text-2xl text-fg">
              @thepicturesquarephotography
            </h3>
          </div>
        </div>

        <a
          href={SITE_CONFIG.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-rule hover:border-accent text-fg hover:text-accent-text text-meta-sm uppercase transition-colors"
          data-cursor="INSTAGRAM"
        >
          <span>FOLLOW ON INSTAGRAM</span>
          <ArrowUpRight size={13} className="text-accent-text" />
        </a>
      </div>

      {/* 6-Up Visual Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {INSTAGRAM_POSTS.map((post, idx) => (
          <a
            key={idx}
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-sm bg-bg-raised border border-rule"
            aria-label={`View Instagram post: ${post.alt}`}
            data-cursor="INSTAGRAM"
          >
            <Image
              src={post.src}
              alt={post.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover object-center filter brightness-[0.98] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-bg-inverse/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-fg-inverse"
              aria-hidden="true"
            >
              <InstagramIcon size={20} className="text-accent" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default InstagramStrip;
