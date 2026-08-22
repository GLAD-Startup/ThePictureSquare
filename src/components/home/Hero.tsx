'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const [canLoadVideo, setCanLoadVideo] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if viewport is >= 768px
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Check save-data
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    const isSaveData = nav.connection?.saveData === true;

    if (isDesktop && !prefersReducedMotion && !isSaveData) {
      // Defer video initialization until after the LCP poster paints
      const timer = setTimeout(() => {
        setCanLoadVideo(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToNext = () => {
    const welcomeSec = document.getElementById('welcome');
    if (welcomeSec) {
      welcomeSec.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-bg-inverse select-none"
    >
      {/* 1. LCP Primary Poster Image (Eager, Priority, fetchPriority High) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-wedding.jpg"
          alt="The Picture Square Showreel Poster"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          onLoad={() => setPosterLoaded(true)}
          className="object-cover object-center filter brightness-[0.90] contrast-[1.02]"
        />
      </div>

      {/* 2. Desktop Video Layer (Deferred after poster, preload="none", no video below 768px or under save-data) */}
      {canLoadVideo && posterLoaded ? (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/hero-wedding.jpg"
            className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.02]"
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>
        </div>
      ) : null}

      {/* 3. 40% Ink Overlay */}
      <div
        className="absolute inset-0 bg-bg-inverse/40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle vignette gradient towards edges */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-bg-inverse/30 via-transparent to-bg-inverse/70 pointer-events-none"
        aria-hidden="true"
      />

      {/* 4. Centre-Bottom: SCROLL in .text-meta over 1px 40px vertical pulsing rule */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center justify-center gap-3">
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-3 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none rounded-sm p-2 cursor-pointer"
          aria-label="Scroll to welcome manifesto section"
          data-cursor="SCROLL"
        >
          <span className="text-meta text-fg-inverse/80 group-hover:text-accent tracking-[0.26em] transition-colors">
            SCROLL
          </span>

          {/* 1px 40px vertical pulsing rule */}
          <motion.div
            animate={{
              opacity: [0.35, 0.9, 0.35],
              scaleY: [0.85, 1.05, 0.85],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-[1px] h-[40px] bg-fg-inverse/60 group-hover:bg-accent transition-colors origin-top"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
};

export default Hero;
