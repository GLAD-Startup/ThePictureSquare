'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { scrollReveal } from '@/lib/motion';

export const WelcomeManifesto: React.FC = () => {
  return (
    <section id="welcome" className="relative w-full py-20 sm:py-28 lg:py-32">
      <Shell>
        <div className="space-y-12">
          {/* Real visible <h1> for homepage */}
          <SectionHead
            as="h1"
            title="WELCOME"
            eyebrow="FINE ART WEDDING &amp; FILM STUDIO · MATHURA"
          />

          {/* 4-Line Manifesto in Instrument Serif Italic, max-w 56ch */}
          <motion.div
            {...scrollReveal}
            className="max-w-[56ch] mx-auto text-center font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] italic text-fg leading-[1.3] sm:leading-[1.25] tracking-tight space-y-1 sm:space-y-2 select-none"
          >
            <p className="block">Born on the quiet banks of the Yamuna,</p>
            <p className="block">we preserve the rituals, laughter, and sacred tears</p>
            <p className="block">of weddings across the ancient Braj countryside</p>
            <p className="block">and historic destinations worldwide.</p>
          </motion.div>
        </div>
      </Shell>
    </section>
  );
};

export default WelcomeManifesto;
