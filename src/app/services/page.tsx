import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { ParallaxFrame } from '@/components/ui/ParallaxFrame';
import { ServicesComparisonTable } from '@/components/services/ServicesComparisonTable';
import { TrustStrip } from '@/components/ui/TrustStrip';
import { getGooglePlaceReviews } from '@/lib/reviews';
import { ArrowUpRight, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services & Commission Suites — The Picture Square | Wedding Photography, Mathura',
  description:
    'Explore our four bespoke commission suites: Fine-Art Wedding Stills, Editorial Pre-Wedding Lookbooks, 4K Documentary Cinematography, and The Complete Story.',
  alternates: {
    canonical: 'https://thepicturesquare.com/services',
  },
  openGraph: {
    title: 'Services & Commission Suites — The Picture Square | Wedding Photography, Mathura',
    description:
      'Detailed overview of our multi-day wedding photography, 4K cinematography, and heirloom monograph suites.',
    url: 'https://thepicturesquare.com/services',
  },
};

const SERVICE_PANELS = [
  {
    id: 'weddings',
    title: 'WEDDINGS',
    subtitle: 'MULTI-DAY FINE-ART STILLS COMMISSION',
    image: '/images/hero-wedding.jpg',
    description:
      'Complete photographic documentation of multi-day wedding celebrations. We focus on unscripted emotion, sacred ritual intricacies, and generational interactions—with punctual, polite, and completely cooperative crew conduct that respects your family and guests.',
    deliverables: [
      { label: 'Coverage', value: '2 to 4 Days of Multi-Event Celebrations' },
      { label: 'Crew & Conduct', value: '2–3 Punctual, Respectful Principal Photographers (Zero Disruption)' },
      { label: 'Coordination', value: 'Seamless Quiet Coordination with Family Elders, Pandit Ji & Planners' },
      { label: 'Archive', value: '600–900 High-Resolution Hand-Color-Graded JPEGs' },
      { label: 'Timeline', value: 'Preview Set in 7 Days · Full Gallery in 6–8 Weeks' },
      { label: 'Physical', value: '1 × Handcrafted Lay-Flat Heirloom Album (80 Pages)' },
    ],
  },
  {
    id: 'cinematography',
    title: 'CINEMATOGRAPHY',
    subtitle: '4K DOCUMENTARY MOTION PICTURES',
    image: '/images/ceremony-vows.jpg',
    description:
      'Documentary cinema that records the kinetic pulse, vocal blessings, and ambient atmosphere of your wedding days. Renowned for cinematic video quality, flawless editing, and dedicated multi-track audio capture of sacred mantras and emotional vows.',
    deliverables: [
      { label: 'Coverage', value: '2 to 4 Days (Full Event Motion Coverage)' },
      { label: 'Crew', value: '2–3 Dedicated 4K Cinema Camera Operators + Sound Technician' },
      { label: 'Video Quality', value: 'Master 4K Ultra HD Films · Flawless Cinematic Color & Audio Grade' },
      { label: 'Films', value: '1 × 4K Highlight Trailer (3–5 min) + 1 × Feature Film (20–40 min)' },
      { label: 'Social', value: 'Multiple 9:16 Vertical Instacuts for Fast Mobile Sharing' },
      { label: 'Timeline', value: '60s Teaser in 72h · Master Cuts in 8–10 Weeks' },
    ],
  },
  {
    id: 'pre-weddings',
    title: 'PRE-WEDDINGS',
    subtitle: 'EDITORIAL CONCEPT LOOKBOOKS',
    image: '/images/sunset-ghats.jpg',
    description:
      'Conceived as high-fashion magazine lookbooks rather than staged poses. We photograph during dawn and dusk light along the Yamuna riverfronts in Mathura and Vrindavan, Mughal sandstone corridors in Agra, or Rajasthan desert dunes.',
    deliverables: [
      { label: 'Coverage', value: '1 Day (Dawn & Dusk Sessions)' },
      { label: 'Crew', value: '1 Lead Visual Director + 1 Assistant' },
      { label: 'Archive', value: '100–150 Color-Corrected High-Resolution Stills' },
      { label: 'Motion', value: '1 × 60-Second 4K Cinema Teaser Reel' },
      { label: 'Timeline', value: '15 Curated Frames in 48h · Full Edit in 3–4 Weeks' },
      { label: 'Format', value: 'Private Digital Archive & Print-Ready Web Link' },
    ],
  },
  {
    id: 'complete-story',
    title: 'THE COMPLETE STORY',
    subtitle: 'ALL-INCLUSIVE MASTER DIRECTION SUITE',
    image: '/images/dance-celebration.jpg',
    description:
      'Our flagship bespoke commission providing seamless stills and cinema integration under unified artistic direction. Both photo and film teams work in quiet, synchronized harmony without ever crowding the mandap or getting in the way of your guests.',
    deliverables: [
      { label: 'Coverage', value: '3 to 5 Days (Complete Wedding Chronicle)' },
      { label: 'Crew Harmony', value: 'Unified Stills & Cinema Team Working in Quiet Synchrony (No Crowding)' },
      { label: 'Coordination', value: 'Dedicated On-Site Coordination with Family Itinerary & Ritual Flow' },
      { label: 'Stills & Cinema', value: '900–1400 Master Edited Stills + Full 4K Motion Suite' },
      { label: 'Albums', value: '1 × Grand Leather Monograph (100 Pages) + 2 × Parent Albums' },
      { label: 'Archival', value: 'Encrypted Master SSD containing full RAW digital files' },
    ],
  },
];

export default async function ServicesPage() {
  const reviewsData = await getGooglePlaceReviews();
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Wedding Photography & Cinema Commission Suites',
      description:
        'Bespoke fine-art wedding stills, 4K documentary cinematography, and heirloom monograph suites.',
      provider: {
        '@type': 'PhotographyBusiness',
        name: 'The Picture Square',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Commission Suites',
        itemListElement: SERVICE_PANELS.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.description,
          },
        })),
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
          name: 'Services',
          item: 'https://thepicturesquare.com/services',
        },
      ],
    },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Header */}
      <Shell>
        <div className="space-y-6 text-center max-w-4xl mx-auto pb-4">
          <SectionHead
            as="h1"
            title="WHAT WE OFFER"
            eyebrow="COMMISSION SUITES"
            align="center"
          />

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;Four focused offerings crafted for families seeking quiet generational artistry.&rdquo;
          </p>

          <p className="prose-editorial text-fg-dim text-sm max-w-2xl mx-auto">
            Whether you require fine-art stills, 4K documentary cinematography, or our complete unified monograph suite, every commission is executed with direct founder direction.
          </p>
        </div>
      </Shell>

      {/* 1. Four Alternating Panels */}
      <Shell>
        <div className="space-y-32">
          {SERVICE_PANELS.map((panel, idx) => (
            <section
              key={panel.id}
              id={panel.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center scroll-mt-28"
            >
              {/* 7-Col ParallaxFrame (Alternating) with Subtle Intensity */}
              <div
                className={`lg:col-span-7 relative w-full overflow-hidden rounded-none shadow-[0_10px_30px_rgba(20,20,19,0.04)] ${
                  idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <ParallaxFrame
                  src={panel.image}
                  alt={panel.title}
                  aspect="3/2"
                  intensity="subtle"
                  focalY={40}
                  cursorText="SUITE"
                  className="w-full"
                />

                <div className="absolute top-4 left-4 z-20 px-3.5 py-1 bg-bg-raised/90 backdrop-blur-md rounded-full border border-rule font-sans text-meta-sm pointer-events-none">
                  <span className="text-accent-text font-semibold uppercase">
                    SUITE 0{idx + 1}
                  </span>
                </div>
              </div>

              {/* 5-Col Text Content & Deliverables List */}
              <div
                className={`lg:col-span-5 space-y-6 flex flex-col justify-between ${
                  idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-meta text-accent-text block uppercase font-semibold">
                    {panel.subtitle}
                  </span>
                  <h2 className="text-display-md text-fg font-normal leading-tight">
                    {panel.title}
                  </h2>
                  <p className="text-body text-fg-dim text-sm sm:text-base leading-relaxed pt-2">
                    {panel.description}
                  </p>
                </div>

                {/* Hairline-Separated Deliverables List in .text-body */}
                <div className="space-y-2.5 pt-4 border-t border-rule font-sans text-[13px]">
                  <span className="text-meta-sm text-fg uppercase font-semibold tracking-wider block mb-2">
                    KEY DELIVERABLES &amp; TIMELINES:
                  </span>
                  {panel.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-baseline justify-between py-1.5 border-b border-rule/50 gap-4"
                    >
                      <span className="text-fg-dim uppercase font-medium tracking-wide text-xs">
                        {item.label}
                      </span>
                      <span className="text-fg font-medium text-right text-xs">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/contact?suite=${panel.id}`}
                    className="inline-flex items-center gap-2 text-meta text-fg hover:text-accent-text uppercase font-semibold transition-colors"
                  >
                    <span>INQUIRE FOR {panel.title}</span>
                    <ArrowUpRight size={14} className="text-accent-text" />
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>
      </Shell>

      {/* 2. Side-by-Side Comparison Table on Desktop / Stacked Cards on Mobile */}
      <Shell>
        <div className="space-y-12 pt-8">
          <SectionHead
            title="SUITE COMPARISON"
            eyebrow="SIDE-BY-SIDE SPECIFICATIONS"
            align="center"
          />

          <ServicesComparisonTable />
        </div>
      </Shell>

      {/* 3. Pricing Policy Notice & FAQ Cross-Link Banner */}
      <Shell>
        <div className="space-y-8">
          {/* Pricing Policy Box */}
          <div className="p-8 sm:p-10 rounded-sm bg-bg-raised border border-rule text-center max-w-3xl mx-auto space-y-4 shadow-[0_10px_30px_rgba(20,20,19,0.04)]">
            <span className="text-meta text-accent-text block uppercase font-semibold">
              BESPOKE QUOTATIONS
            </span>
            <p className="font-display text-2xl sm:text-3xl text-fg font-normal">
              Every wedding is quoted individually based on dates, locations, and multi-day itinerary.
            </p>
            <p className="text-body text-fg-dim text-sm max-w-xl mx-auto">
              We do not post fixed packages because no two Indian weddings have the same venue lighting, concurrent rituals, or guest scale. We provide an itemized proposal following your initial consultation.
            </p>
          </div>

          {/* FAQ Cross-Link Banner */}
          <div className="p-6 sm:p-8 rounded-sm bg-bg-raised border border-accent/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="p-3 rounded-full bg-accent/10 text-accent-text shrink-0 hidden sm:block">
                <HelpCircle size={24} />
              </div>
              <div className="space-y-1">
                <span className="text-meta-sm text-accent-text block font-semibold uppercase">
                  HAVE QUESTIONS ABOUT LOGISTICS OR RIGHTS?
                </span>
                <p className="font-display text-2xl text-fg">
                  Explore our detailed Commission FAQ &amp; Logistics Guide
                </p>
              </div>
            </div>

            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta uppercase font-semibold transition-all shrink-0"
            >
              <span>VIEW COMMISSION FAQ</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </Shell>

      {/* 4. Page Closing CTA with Trust Strip */}
      <Shell>
        <div className="py-16 border-t border-rule text-center max-w-3xl mx-auto space-y-6">
          <TrustStrip
            rating={reviewsData.rating}
            reviewCount={reviewsData.userRatingCount}
            googleMapsUrl={reviewsData.googleMapsUrl}
          />

          <span className="text-meta text-accent-text block font-semibold">
            READY TO COMMISSION YOUR DATE?
          </span>

          <h3 className="font-display text-4xl sm:text-5xl text-fg font-normal">
            CHECK STUDIO DATE AVAILABILITY
          </h3>

          <p className="prose-editorial text-fg-dim mx-auto">
            We accept a maximum of 25 commissions per year. Inquire early with your wedding dates and venue details to hold your reservation.
          </p>

          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md"
              data-cursor="INQUIRE"
            >
              <span>BEGIN A CONVERSATION →</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </Shell>
    </main>
  );
}
