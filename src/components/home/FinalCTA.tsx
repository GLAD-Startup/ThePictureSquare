'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { TrustStrip } from '@/components/ui/TrustStrip';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { scrollReveal } from '@/lib/motion';
import { SITE_CONFIG } from '@/lib/site-config';
import { GooglePlaceReviewsData } from '@/lib/reviews';

interface FinalCTAProps {
  trustData?: Partial<GooglePlaceReviewsData> & {
    reviewCount?: number;
  };
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ trustData }) => {
  return (
    <section id="enquire" className="relative w-full py-24 sm:py-32 lg:py-40 space-y-16">
      <Shell>
        <div className="space-y-16">
          {/* SectionHead Recurring Device */}
          <SectionHead title="COMMISSION &amp; INQUIRIES" eyebrow="ENQUIRE" />

          {/* Dramatic Headline in Instrument Serif */}
          <div className="py-4 space-y-10 max-w-5xl">
            {/* Trust Strip Above Headline */}
            <div className="text-left">
              <TrustStrip
                rating={trustData?.rating || 4.9}
                userRatingCount={trustData?.userRatingCount ?? trustData?.reviewCount ?? 33}
                googleMapsUrl={trustData?.googleMapsUrl || SITE_CONFIG.googleMapsUrl}
              />
            </div>

            <motion.div
              {...scrollReveal}
              className="font-display text-hero text-fg tracking-tight leading-[0.90] select-none"
            >
              <span className="block font-normal">LET&apos;S MAKE</span>
              <span className="block font-normal italic text-fg/90">SOMETHING</span>
              <span className="block font-normal">WORTH</span>
              <span className="block font-normal text-fg">REMEMBERING.</span>
            </motion.div>

            {/* Action Links: BEGIN A CONVERSATION + WHATSAPP */}
            <motion.div
              {...scrollReveal}
              className="flex flex-col sm:flex-row sm:items-center gap-8 pt-4"
            >
              {/* 1. BEGIN A CONVERSATION with Expanding Accent Circle */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-5 py-3 rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
                data-cursor="INQUIRE"
              >
                {/* Expanding Accent Circle */}
                <span
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-accent bg-transparent flex items-center justify-center group-hover:bg-accent-text group-hover:border-accent-text group-hover:scale-105 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-sm"
                  aria-hidden="true"
                >
                  <ArrowUpRight size={22} className="text-accent-text group-hover:text-fg-inverse transition-colors" />
                </span>

                {/* Text Link */}
                <div className="flex flex-col text-left">
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-fg tracking-wide group-hover:text-accent-text transition-colors duration-300">
                    BEGIN A CONVERSATION →
                  </span>
                  <span className="text-meta-sm text-fg-dim uppercase mt-0.5 font-medium">
                    INQUIRE FOR WEDDING &amp; DESTINATION DATES
                  </span>
                </div>

                {/* Hover Line Expansion */}
                <span
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ease-[cubic-bezier(0.23,1,0.32,1)]"
                  aria-hidden="true"
                />
              </Link>

              {/* 2. WHATSAPP Direct Action Link */}
              <a
                href={
                  SITE_CONFIG.phoneE164
                    ? `https://wa.me/${SITE_CONFIG.phoneE164.replace(/[^0-9]/g, '')}`
                    : '/contact'
                }
                target={SITE_CONFIG.phoneE164 ? '_blank' : undefined}
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-rule font-sans text-meta text-fg hover:border-accent hover:text-accent-text transition-all uppercase self-start sm:self-center focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-sm"
                data-cursor="WHATSAPP"
              >
                <MessageCircle size={16} className="text-accent-text" />
                <span>WHATSAPP DIRECT</span>
              </a>
            </motion.div>
          </div>
        </div>
      </Shell>
    </section>
  );
};

export default FinalCTA;
