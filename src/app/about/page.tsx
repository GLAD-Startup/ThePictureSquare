import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { ParallaxFrame } from '@/components/ui/ParallaxFrame';
import { SITE_CONFIG } from '@/lib/site-config';
import { ArrowUpRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About the Studio & Founder — The Picture Square | Wedding Photography, Mathura',
  description:
    'The story of The Picture Square. Founded in Mathura, Uttar Pradesh, documenting sacred rituals, Braj heritage, and destination weddings across India.',
  alternates: {
    canonical: 'https://thepicturesquare.com/about',
  },
  openGraph: {
    title: 'About the Studio & Founder — The Picture Square | Wedding Photography, Mathura',
    description:
      'Fine-art wedding photography and cinema studio rooted in Mathura, crafting timeless printed monographs for generations.',
    url: 'https://thepicturesquare.com/about',
  },
};

export default function AboutPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About The Picture Square',
      description:
        'Fine-art wedding photography studio founded in Mathura, documenting destination weddings across Agra, Rajasthan, and nationwide.',
      mainEntity: {
        '@type': 'PhotographyBusiness',
        name: SITE_CONFIG.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mathura',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://thepicturesquare.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: 'https://thepicturesquare.com/about',
        },
      ],
    },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-24">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Header */}
      <Shell>
        <div className="space-y-6 text-center max-w-4xl mx-auto pb-4">
          <SectionHead
            as="h1"
            title="ABOUT THE STUDIO"
            eyebrow="ORIGIN &amp; PHILOSOPHY"
            align="center"
          />

          <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;We treat wedding photography as historical preservation—quiet, unhurried, and true to the light.&rdquo;
          </p>
        </div>
      </Shell>

      {/* 1. Full-Bleed Team / Founder Portrait with ParallaxFrame (intensity default, focalY 35) */}
      <section className="relative w-full overflow-hidden bg-bg-raised border-y border-rule shadow-[0_10px_30px_rgba(20,20,19,0.06)]">
        <ParallaxFrame
          src="/images/mathura-heritage.jpg"
          alt="The Picture Square Studio Founder and Camera Direction in Mathura"
          width={1600}
          height={1000}
          aspect="responsive-banner"
          intensity="default"
          focalY={35}
          priority
          cursorText="STUDIO"
          className="w-full"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-bg-inverse/70 via-transparent to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-30 space-y-1 text-fg-inverse pointer-events-none">
          <span className="text-meta text-accent block flex items-center gap-1.5 uppercase font-semibold">
            <MapPin size={13} />
            STUDIO HEADQUARTERS · MATHURA, UTTAR PRADESH
          </span>
          <p className="font-display text-2xl sm:text-3xl text-fg-inverse font-normal">
            Rooted in the ancient riverbank light of Braj
          </p>
        </div>
      </section>

      {/* 2. Studio Narrative (Centred Column in First Person) */}
      <section className="py-12 sm:py-16">
        <Shell>
          <div className="max-w-[62ch] mx-auto space-y-8 font-sans">
            <div className="space-y-6 text-fg text-body leading-[1.85] font-normal text-base sm:text-lg">
              <p>
                When a family invites us to photograph their wedding, they are trusting us with their home, their elders, and their most intimate moments among three hundred guests. Long before we think about cameras or lighting, our first priority on the day is simple: to arrive early, stay calm, coordinate effortlessly with your family, and respect the pace of your rituals.
              </p>

              <p className="text-fg-dim">
                Indian weddings are full of emotion, moving schedules, and intricate customs. You do not need photographers who shout orders, block your guests&apos; view during the pheras, or turn sacred moments into a chaotic set. We work quietly alongside your elders, pandit ji, and planners—cooperative at every step so your family feels completely at ease.
              </p>

              <p className="text-fg-dim">
                I started The Picture Square in Mathura to create both fine-art stills and cinematic films that reflect how the celebration actually felt. Across Mathura, Vrindavan, Agra, and destination venues in Rajasthan, our team has built a reputation for delivering breathtaking video quality and timeless photographs without ever intruding on the sacred flow of the day.
              </p>

              <p className="text-fg-dim">
                Every moment—from the quiet morning blessings and spontaneous courtyard laughter to the emotional tears of the vidaai—is documented with patience and care. When you look back at your film and heirloom albums decades from now, we want you to remember not just beautiful frames, but how effortless and reassuring it felt having our team with you.
              </p>
            </div>

            {/* Signed Line from Founder in Display Italic */}
            <div className="pt-8 border-t border-rule text-right">
              <p className="font-display text-3xl sm:text-4xl italic text-accent-text font-normal tracking-wide">
                — Deepanshu
              </p>
              <span className="text-meta-sm text-fg-dim uppercase tracking-[0.20em] block mt-1">
                Founder &amp; Principal Visual Director · The Picture Square, Mathura
              </span>
            </div>
          </div>
        </Shell>
      </section>

      {/* 3. Three Retinted Credential Cards */}
      <section className="py-12 sm:py-16 border-t border-rule bg-bg-sunken/40">
        <Shell>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Annual Cap */}
            <div className="p-8 sm:p-10 rounded-sm bg-bg-raised border border-rule space-y-4 text-center group hover:border-accent transition-colors duration-300 shadow-[0_4px_20px_rgba(20,20,19,0.03)]">
              <span className="font-display text-5xl sm:text-6xl text-accent-text font-normal block group-hover:scale-105 transition-transform duration-300">
                {SITE_CONFIG.stats.annualCap}
              </span>
              <h3 className="text-meta text-fg font-semibold uppercase tracking-widest">
                {SITE_CONFIG.stats.annualCapLabel}
              </h3>
              <p className="text-meta-sm text-fg-dim leading-relaxed">
                {SITE_CONFIG.stats.annualCapSub}
              </p>
            </div>

            {/* Card 2: Regions */}
            <div className="p-8 sm:p-10 rounded-sm bg-bg-raised border border-rule space-y-4 text-center group hover:border-accent transition-colors duration-300 shadow-[0_4px_20px_rgba(20,20,19,0.03)]">
              <span className="font-display text-5xl sm:text-6xl text-accent-text font-normal block group-hover:scale-105 transition-transform duration-300">
                {SITE_CONFIG.stats.regions}
              </span>
              <h3 className="text-meta text-fg font-semibold uppercase tracking-widest">
                {SITE_CONFIG.stats.regionsLabel}
              </h3>
              <p className="text-meta-sm text-fg-dim leading-relaxed">
                {SITE_CONFIG.stats.regionsSub}
              </p>
            </div>

            {/* Card 3: Craft Purity */}
            <div className="p-8 sm:p-10 rounded-sm bg-bg-raised border border-rule space-y-4 text-center group hover:border-accent transition-colors duration-300 shadow-[0_4px_20px_rgba(20,20,19,0.03)]">
              <span className="font-display text-5xl sm:text-6xl text-accent-text font-normal block group-hover:scale-105 transition-transform duration-300">
                {SITE_CONFIG.stats.craftPurity}
              </span>
              <h3 className="text-meta text-fg font-semibold uppercase tracking-widest">
                {SITE_CONFIG.stats.craftPurityLabel}
              </h3>
              <p className="text-meta-sm text-fg-dim leading-relaxed">
                {SITE_CONFIG.stats.craftPuritySub}
              </p>
            </div>
          </div>
        </Shell>
      </section>

      {/* 4. Closing Conversation CTA */}
      <section className="py-20 sm:py-28 border-t border-rule text-center">
        <Shell>
          <div className="space-y-8 max-w-3xl mx-auto">
            <span className="text-meta text-accent-text block font-semibold">
              BEGIN A CONVERSATION
            </span>

            <h3 className="font-display text-4xl sm:text-5xl text-fg font-normal leading-tight">
              TELL US ABOUT YOUR CELEBRATION
            </h3>

            <p className="prose-editorial text-fg-dim mx-auto">
              Whether you are planning a traditional three-day wedding in Mathura or a destination celebration in Rajasthan, we would love to hear your story.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md"
                data-cursor="INQUIRE"
              >
                <span>INQUIRE ABOUT DATES →</span>
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/stories"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-rule hover:border-accent text-fg hover:text-accent-text text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
              >
                <span>EXPLORE STORIES</span>
              </Link>
            </div>
          </div>
        </Shell>
      </section>
    </main>
  );
}
