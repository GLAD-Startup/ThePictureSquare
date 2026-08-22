'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ease } from '@/lib/motion';

export type ParallaxIntensity = 'subtle' | 'default' | 'strong';

export interface ParallaxFrameProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspect?: string; // e.g. "4/5", "3/4", "16/9", "3/2", "1/1"
  travel?: string; // CSS travel string e.g. "clamp(28px, 5vh, 64px)"
  focalY?: number; // 0-100 vertical focal point percentage
  intensity?: ParallaxIntensity;
  reveal?: boolean; // Curtain reveal mask
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
  category?: string;
  cursorText?: string;
  reducedMotion?: boolean;
}

// Module-level mounted instance tracking to enforce rule (max 6 per route)
let mountedParallaxCount = 0;

export const ParallaxFrame: React.FC<ParallaxFrameProps> = ({
  src,
  alt,
  width = 1200,
  height = 1500,
  aspect = '4/5',
  travel = 'clamp(28px, 5vh, 64px)',
  focalY: propFocalY,
  intensity = 'default',
  reveal = true,
  priority = false,
  sizes,
  className = '',
  caption,
  category,
  cursorText = 'VIEW',
  reducedMotion: propReducedMotion,
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(800);

  const systemReducedMotion = useReducedMotion();
  const isReducedMotion = propReducedMotion !== undefined ? propReducedMotion : !!systemReducedMotion;

  // Default portrait-orientation images to focalY 40 unless told otherwise
  const isPortrait = useMemo(() => {
    if (aspect === '4/5' || aspect === '3/4' || aspect === '2/3' || aspect === '9/16') {
      return true;
    }
    return false;
  }, [aspect]);

  const focalY = propFocalY !== undefined ? propFocalY : isPortrait ? 40 : 50;

  // Track viewport size & mobile breakpoint (<1024px)
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 1024);
        setViewportHeight(window.innerHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Performance: IntersectionObserver with rootMargin 15% to gate will-change and active transforms
  useEffect(() => {
    const el = frameRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '15%' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Instance count check (Max 6 mounted instances on a route)
  useEffect(() => {
    mountedParallaxCount++;
    if (
      process.env.NODE_ENV !== 'production' &&
      mountedParallaxCount > 6
    ) {
      console.warn(
        `[ParallaxFrame] Rule violation: More than 6 ParallaxFrame instances mounted on this route (current: ${mountedParallaxCount}). Keep max 6 for scroll performance.`
      );
    }

    return () => {
      mountedParallaxCount = Math.max(0, mountedParallaxCount - 1);
    };
  }, []);

  // Compute intensity multipliers
  const intensityMultiplier = useMemo(() => {
    switch (intensity) {
      case 'subtle':
        return 0.5;
      case 'strong':
        return 1.6;
      case 'default':
      default:
        return 1.0;
    }
  }, [intensity]);

  // Compute numeric pixel travel for Framer Motion useTransform
  // clamp(28px, 5vh, 64px) -> numeric approximation * intensityMultiplier * (mobile ? 0.5 : 1)
  const baseTravelPx = useMemo(() => {
    const fiveVh = viewportHeight * 0.05;
    const clamped = Math.min(64, Math.max(28, fiveVh));
    const mobileFactor = isMobile ? 0.5 : 1.0;
    return clamped * intensityMultiplier * mobileFactor;
  }, [viewportHeight, intensityMultiplier, isMobile]);

  // Compute CSS travel variable string (accounting for intensity and mobile halving)
  const cssTravelVar = useMemo(() => {
    const mult = intensityMultiplier * (isMobile ? 0.5 : 1.0);
    if (mult === 1.0) return travel;
    return `calc(${travel} * ${mult})`;
  }, [travel, intensityMultiplier, isMobile]);

  // Asymmetric transform biasing:
  // focalY of 35 gives more travel below the subject than above it, so the face never leaves the frame.
  const [yMin, yMax] = useMemo(() => {
    const norm = Math.max(1, Math.min(99, focalY));
    const min = -baseTravelPx * (norm / 50);
    const max = baseTravelPx * ((100 - norm) / 50);
    return [min, max];
  }, [baseTravelPx, focalY]);

  // useScroll without layoutEffect to prevent App Router hydration warnings
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
    layoutEffect: false,
  } as any);

  const transformY = useTransform(scrollYProgress, [0, 1], [yMin, yMax]);

  // Sizing calculation accounting for 2x travel overscale
  const computedSizes =
    sizes ||
    `(max-width: 640px) 100vw, (max-width: 1024px) 70vw, (max-width: 1536px) 50vw, 600px`;

  // Aspect ratio class or style
  const aspectClass =
    aspect === 'responsive-banner'
      ? 'aspect-[4/5] sm:aspect-[16/9]'
      : aspect === '4/5'
      ? 'aspect-[4/5]'
      : aspect === '3/4'
      ? 'aspect-[3/4]'
      : aspect === '16/9'
      ? 'aspect-[16/9]'
      : aspect === '3/2'
      ? 'aspect-[3/2]'
      : aspect === '2/1'
      ? 'aspect-[2/1]'
      : aspect === '1/1'
      ? 'aspect-square'
      : aspect.includes('aspect')
      ? aspect
      : '';

  const aspectStyle = !aspectClass ? { aspectRatio: aspect } : undefined;

  return (
    <figure
      ref={frameRef}
      className={`group relative overflow-hidden rounded-none bg-bg-sunken select-none ${className}`}
      style={
        {
          '--travel': isReducedMotion ? '0px' : cssTravelVar,
        } as React.CSSProperties
      }
      data-cursor={cursorText}
    >
      {/* 
        LAYER 1: <div className="frame">
        Position relative, overflow hidden, aspect-ratio from props, 1px inset --rule border, border-radius 0.
        Owns the ImageReveal curtain mask if reveal is on.
      */}
      <motion.div
        initial={reveal && !isReducedMotion ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={
          isReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.9, ease: ease.outEditorial }
        }
        className={`relative w-full ${aspectClass} overflow-hidden rounded-none bg-bg-sunken`}
        style={aspectStyle}
      >
        {/* 
          LAYER 2: <motion.div className="drift">
          Absolutely positioned, inset-x-0, top: calc(-1 * var(--travel)), height: calc(100% + (2 * var(--travel))).
          Owns ONLY the parallax y transform.
        */}
        <motion.div
          className="absolute inset-x-0 w-full"
          style={{
            top: isReducedMotion ? '0' : 'calc(-1 * var(--travel))',
            height: isReducedMotion ? '100%' : 'calc(100% + (2 * var(--travel)))',
            y: isReducedMotion ? 0 : isInView ? transformY : 0,
            willChange: isInView && !isReducedMotion ? 'transform' : 'auto',
          }}
        >
          {/* 
            LAYER 3: <Image />
            Next/image fill, object-cover.
            Owns ONLY the hover scale and focal point position.
          */}
          <Image
            src={src}
            alt={alt}
            fill
            sizes={computedSizes}
            priority={priority}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] filter brightness-[0.98] contrast-[1.02]"
            style={{
              objectPosition: `50% ${focalY}%`,
            }}
          />
        </motion.div>

        {/* 1px Inset Border & Subtle Ring (Keeps high-key/light ground framed as an object) */}
        <div
          className="absolute inset-0 pointer-events-none rounded-none border border-rule ring-1 ring-inset ring-black/[0.04] z-10"
          aria-hidden="true"
        />
      </motion.div>

      {/* Optional Editorial Subtitle / Caption */}
      {(caption || category) && (
        <figcaption className="mt-3.5 flex items-center justify-between font-sans text-fg-dim">
          {category && (
            <span className="text-meta text-accent-text tracking-[0.20em] font-semibold">
              {category}
            </span>
          )}
          {caption && (
            <span className="text-[13px] font-normal italic font-display text-fg">
              {caption}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default ParallaxFrame;
