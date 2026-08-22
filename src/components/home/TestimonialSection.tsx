'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { StarRating } from '@/components/ui/StarRating';
import { GoogleGlyph } from '@/components/ui/GoogleGlyph';
import { GoldDivider } from '@/components/ui/GoldAccent';
import { ease } from '@/lib/motion';
import { Review, GooglePlaceReviewsData } from '@/lib/reviews';
import { ArrowUpRight } from 'lucide-react';

interface TestimonialSectionProps {
  data?: GooglePlaceReviewsData;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ data }) => {
  const reviews: Review[] = data?.reviews && data.reviews.length > 0 ? data.reviews : [];
  const rating = data?.rating || 4.9;
  const userRatingCount = data?.userRatingCount || 33;
  const googleMapsUrl = data?.googleMapsUrl || 'https://maps.google.com/?cid=0xf63f101f60651b9';

  const [activeIndex, setActiveIndex] = useState(0);

  // If for any unforeseen reason no reviews exist, safe fallback guarantee
  if (reviews.length === 0) {
    return null;
  }

  const current = reviews[activeIndex] || reviews[0];

  return (
    <section id="testimonials" className="relative w-full py-24 sm:py-32 lg:py-36 space-y-16">
      <Shell>
        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Section Header */}
          <SectionHead
            title="WORDS FROM OUR COUPLES"
            eyebrow={`GOOGLE REVIEWS · ${rating.toFixed(1)} ★ (${userRatingCount} REVIEWS)`}
          />

          {/* Pagination Controls */}
          {reviews.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2.5 font-sans pb-2">
              {reviews.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-1.5 rounded-full text-meta-sm font-semibold uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer ${
                    activeIndex === idx
                      ? 'bg-fg text-fg-inverse shadow-sm'
                      : 'text-fg-dim hover:text-fg border border-rule hover:border-accent'
                  }`}
                  aria-label={`Show review by ${item.authorName}`}
                >
                  0{idx + 1} · {item.authorName.split(' ')[0]}
                </button>
              ))}
            </div>
          )}

          {/* Quote Card on --bg-sunken with --rule border */}
          <div className="relative py-12 lg:py-16 px-8 sm:px-14 bg-bg-sunken border border-rule rounded-sm space-y-10 min-h-[300px] flex flex-col justify-between shadow-[0_4px_20px_rgba(20,20,19,0.03)]">
            <div
              className="absolute top-4 left-6 font-display text-8xl text-accent/20 select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Stars Row */}
            <div className="flex items-center justify-between z-10">
              <StarRating rating={current.rating} size={16} />

              {/* Attribution with Google Glyph */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-raised border border-rule text-meta-sm text-fg hover:text-accent-text hover:border-accent transition-colors"
                aria-label={`Verified Google Review by ${current.authorName}`}
              >
                <GoogleGlyph size={14} />
                <span className="font-semibold">via Google</span>
              </a>
            </div>

            {/* Quote Content in Instrument Serif Italic */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: ease.smooth }}
                className="relative z-10 font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-normal italic text-fg leading-[1.3] max-w-4xl"
              >
                &ldquo;{current.text}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            <GoldDivider subtle />

            {/* Reviewer Meta & Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + '-meta'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h4 className="font-sans text-meta text-fg font-semibold tracking-wider uppercase">
                      {current.authorName}
                    </h4>
                    {current.isLocalGuide && (
                      <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent-text text-[10px] font-bold tracking-widest uppercase">
                        LOCAL GUIDE
                      </span>
                    )}
                  </div>
                  <p className="text-meta-sm text-fg-dim">
                    {current.relativeTime.toUpperCase()}
                  </p>
                </div>

                <div>
                  <Link
                    href="/reviews"
                    className="inline-flex items-center gap-1.5 text-meta text-accent-text hover:text-fg font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>ALL GOOGLE REVIEWS ({userRatingCount})</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Shell>
    </section>
  );
};

export default TestimonialSection;
