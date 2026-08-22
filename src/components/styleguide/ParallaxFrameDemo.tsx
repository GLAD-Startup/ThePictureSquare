'use client';

import React, { useState } from 'react';
import { ParallaxFrame } from '@/components/ui/ParallaxFrame';
import { ToggleLeft, ToggleRight, Eye, Sparkles } from 'lucide-react';

export const ParallaxFrameDemo: React.FC = () => {
  const [forceReducedMotion, setForceReducedMotion] = useState(false);

  return (
    <div className="space-y-12">
      {/* Interactive Control Header */}
      <div className="p-6 rounded-sm bg-bg-sunken border border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-accent-text" />
            <h4 className="font-sans text-meta text-fg font-semibold uppercase tracking-wider">
              &lt;ParallaxFrame&gt; Interactive Laboratory
            </h4>
          </div>
          <p className="text-meta-sm text-fg-dim">
            Fixed frame, vertical photograph drift on scroll, asymmetric focalY biasing, and reduced-motion support.
          </p>
        </div>

        <button
          onClick={() => setForceReducedMotion((prev) => !prev)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-meta-sm font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer ${
            forceReducedMotion
              ? 'bg-accent-text text-fg-inverse border-accent-text'
              : 'bg-bg-raised text-fg border-rule hover:border-accent'
          }`}
          aria-pressed={forceReducedMotion}
          aria-label="Toggle reduced motion simulation"
        >
          {forceReducedMotion ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          <span>
            {forceReducedMotion ? 'Reduced Motion: ACTIVE (0px Travel)' : 'Simulate Reduced Motion'}
          </span>
        </button>
      </div>

      {/* 1. Three Intensities Showcase (Subtle / Default / Strong) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-rule pb-2 font-sans">
          <span className="text-meta text-accent-text font-semibold uppercase">
            1. INTENSITY LEVELS (0.5× SUBTLE · 1.0× DEFAULT · 1.6× STRONG)
          </span>
          <span className="text-meta-sm text-fg-dim">4:5 PORTRAIT RATIO</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Subtle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-meta-sm font-semibold">
              <span className="text-fg uppercase">INTENSITY: SUBTLE</span>
              <span className="text-accent-text">0.5× TRAVEL</span>
            </div>
            <ParallaxFrame
              src="/images/hero-wedding.jpg"
              alt="Bridal portrait subtle parallax demonstration"
              aspect="4/5"
              intensity="subtle"
              focalY={40}
              category="SUBTLE PARALLAX"
              caption="Gentle 0.5× drift"
              cursorText="SUBTLE"
              reducedMotion={forceReducedMotion}
            />
          </div>

          {/* Default */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-meta-sm font-semibold">
              <span className="text-fg uppercase">INTENSITY: DEFAULT</span>
              <span className="text-accent-text">1.0× TRAVEL</span>
            </div>
            <ParallaxFrame
              src="/images/ceremony-vows.jpg"
              alt="Ceremony vows default parallax demonstration"
              aspect="4/5"
              intensity="default"
              focalY={40}
              category="DEFAULT PARALLAX"
              caption="Standard 1.0× drift"
              cursorText="DEFAULT"
              reducedMotion={forceReducedMotion}
            />
          </div>

          {/* Strong */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-meta-sm font-semibold">
              <span className="text-fg uppercase">INTENSITY: STRONG</span>
              <span className="text-accent-text">1.6× TRAVEL</span>
            </div>
            <ParallaxFrame
              src="/images/jewelry-details.jpg"
              alt="Heirloom jewelry strong parallax demonstration"
              aspect="4/5"
              intensity="strong"
              focalY={40}
              category="STRONG PARALLAX"
              caption="Dynamic 1.6× drift"
              cursorText="STRONG"
              reducedMotion={forceReducedMotion}
            />
          </div>
        </div>
      </div>

      {/* 2. Portrait with Asymmetric Biasing (focalY = 35) & Landscape Format (16/9) */}
      <div className="space-y-6 pt-6 border-t border-rule">
        <div className="flex items-center justify-between border-b border-rule pb-2 font-sans">
          <span className="text-meta text-accent-text font-semibold uppercase">
            2. ASYMMETRIC FOCAL BIASING (focalY 35) &amp; WIDE LANDSCAPE (16:9)
          </span>
          <span className="text-meta-sm text-fg-dim">HEADROOM PRESERVATION</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Portrait at focalY = 35 */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-meta-sm font-semibold">
              <span className="text-fg uppercase">PORTRAIT (focalY: 35)</span>
              <span className="text-accent-text">ASYMMETRIC BIAS</span>
            </div>
            <ParallaxFrame
              src="/images/hero-wedding.jpg"
              alt="Asymmetric focal point demonstration"
              aspect="4/5"
              intensity="default"
              focalY={35}
              category="FOCAL BIAS (35%)"
              caption="Preserves subject headroom on scroll"
              cursorText="FOCAL 35"
              reducedMotion={forceReducedMotion}
            />
            <p className="text-xs text-fg-dim font-sans leading-relaxed">
              Biased transform range provides 70% travel above and 130% travel below the focal center, ensuring faces in the upper third never clip against the top edge.
            </p>
          </div>

          {/* Landscape format (16:9) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-meta-sm font-semibold">
              <span className="text-fg uppercase">LANDSCAPE (16:9 CINEMA)</span>
              <span className="text-accent-text">focalY: 50</span>
            </div>
            <ParallaxFrame
              src="/images/sunset-ghats.jpg"
              alt="Landscape cinematic parallax demonstration"
              aspect="16/9"
              intensity="default"
              focalY={50}
              category="16:9 CINEMA FRAME"
              caption="Yamuna Ghats Sunset · Mathura"
              cursorText="CINEMA"
              reducedMotion={forceReducedMotion}
            />
            <p className="text-xs text-fg-dim font-sans leading-relaxed">
              Wide architectural frames with balanced 50/50 vertical drift, 1px inset rule border, and Next.js fill sizing with overscale compensation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxFrameDemo;
