'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shell } from '@/components/layout/Shell';
import { Rule } from '@/components/ui/Rule';
import { ParallaxFrame } from '@/components/ui/ParallaxFrame';
import { scrollReveal } from '@/lib/motion';

interface BeliefItem {
  id: string;
  question: string;
  paragraph: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    tag: string;
  };
  imagePosition: 'left' | 'right';
}

const BELIEFS: BeliefItem[] = [
  {
    id: 'what-we-love',
    question: 'WHAT WE LOVE',
    paragraph:
      'We love unscripted chaos—the spontaneous laughter across a crowded courtyard, morning mist over river ghats, trembling hands before the garland exchange, and the silence that falls right before the sacred vows.',
    image: {
      src: '/images/hero-wedding.jpg',
      alt: 'Candid wedding portrait in palace courtyard',
      width: 1600,
      height: 1100,
      tag: 'CANDID EMOTION ARCHIVE',
    },
    imagePosition: 'left',
  },
  {
    id: 'what-we-believe',
    question: 'WHAT WE BELIEVE',
    paragraph:
      'We believe the photographs worth keeping are rarely the ones you pose for. Great wedding photography requires quiet observation, deep respect for family customs, and the patience to let real moments unfold without interference.',
    image: {
      src: '/images/ceremony-vows.jpg',
      alt: 'Sacred wedding phere ritual vows',
      width: 1600,
      height: 1100,
      tag: 'SACRED VOWS & RITUALS',
    },
    imagePosition: 'right',
  },
  {
    id: 'what-we-do',
    question: 'WHAT WE DO',
    paragraph:
      'We craft both fine-art stills and slow-burn 4K documentary films with equal devotion. Rather than treating video as an afterthought, we deploy dedicated cinema crews, live acoustic sound capture, and bespoke color grading alongside our physical monographs.',
    image: {
      src: '/images/sunset-ghats.jpg',
      alt: 'Sunset ghats pre-wedding couple portrait',
      width: 1600,
      height: 1100,
      tag: 'STILLS & 4K CINEMA MASTERWORKS',
    },
    imagePosition: 'left',
  },
];

export const ThreeBeliefs: React.FC = () => {
  return (
    <section id="three-beliefs" className="relative w-full py-24 sm:py-32 lg:py-36 space-y-28">
      <Shell>
        <div className="space-y-28">
          {BELIEFS.map((belief) => {
            const isLeftImage = belief.imagePosition === 'left';

            return (
              <div
                key={belief.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* ParallaxFrame Image Frame (7-col) with 1px Inset Border & Subtle Ring */}
                <div
                  className={`relative overflow-hidden rounded-none bg-bg-sunken shadow-[0_10px_30px_rgba(20,20,19,0.04)] ${
                    isLeftImage ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
                  }`}
                >
                  <ParallaxFrame
                    src={belief.image.src}
                    alt={belief.image.alt}
                    width={belief.image.width}
                    height={belief.image.height}
                    aspect="16/9"
                    intensity="default"
                    focalY={40}
                    cursorText="PORTFOLIO"
                    className="w-full"
                  />

                  {/* Badge */}
                  <div className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 bg-bg-raised/90 backdrop-blur-md text-fg border border-rule rounded-full pointer-events-none">
                    <span className="text-meta-sm text-accent-text tracking-widest font-semibold">
                      {belief.image.tag}
                    </span>
                  </div>
                </div>

                {/* Text Content (5-col): Eyebrow question + Hairline + .text-body + Hairline */}
                <motion.div
                  {...scrollReveal}
                  className={`space-y-6 ${
                    isLeftImage ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
                  }`}
                >
                  {/* Eyebrow question in .text-meta */}
                  <span className="text-meta text-accent-text block font-semibold">
                    {belief.question}
                  </span>

                  {/* Hairline */}
                  <Rule />

                  {/* One .text-body paragraph */}
                  <p className="text-body text-fg leading-[1.8] font-sans">
                    {belief.paragraph}
                  </p>

                  {/* Hairline */}
                  <Rule />
                </motion.div>
              </div>
            );
          })}
        </div>
      </Shell>
    </section>
  );
};

export default ThreeBeliefs;
