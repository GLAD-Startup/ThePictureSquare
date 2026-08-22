import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { getPlanners, Planner, PlannerCategory } from '@/lib/content';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Planners & Partners — The Picture Square | Wedding Photography, Mathura',
  description:
    'A curated directory of destination wedding planners, scenographers, makeup artists, couturiers, and heritage palace venues The Picture Square works alongside.',
  alternates: {
    canonical: 'https://thepicturesquare.com/planners',
  },
  openGraph: {
    title: 'Planners & Partners — The Picture Square | Wedding Photography, Mathura',
    description:
      'Curated directory of genuine wedding industry collaborators and recommended heritage venues.',
    url: 'https://thepicturesquare.com/planners',
  },
};

const CATEGORY_DEFINITIONS: {
  id: PlannerCategory;
  title: string;
  eyebrow: string;
  desc: string;
}[] = [
  {
    id: 'PLANNERS',
    title: 'WEDDING PLANNERS & PRODUCERS',
    eyebrow: 'LOGISTICS & PRODUCTION',
    desc: 'Production teams that run complex multi-day timelines with precision, allowing authentic moments to unfold naturally.',
  },
  {
    id: 'DÉCOR',
    title: 'DÉCOR & SPATIAL DESIGN',
    eyebrow: 'SCENOGRAPHY & FLORALS',
    desc: 'Visionaries transforming heritage courtyards and mandap structures through organic floral craft and evocative lighting.',
  },
  {
    id: 'VENUES',
    title: 'HERITAGE PALACES & ESTATES',
    eyebrow: 'DESTINATION LOCATIONS',
    desc: 'Architectural marvels across Mathura, Vrindavan, Agra, and Rajasthan offering unmatched natural light and historic grandeur.',
  },
  {
    id: 'MAKEUP',
    title: 'BRIDAL HAIR & MAKEUP',
    eyebrow: 'BEAUTY & STYLING',
    desc: 'Artists skilled in camera-ready, natural skin textures that look luminous both in person and on 4K sensor prints.',
  },
  {
    id: 'OUTFITS',
    title: 'COUTURE & BRIDALWEAR',
    eyebrow: 'HEIRLOOM TEXTILES',
    desc: 'Couturiers and heritage handloom ateliers whose fabrics move with elegance under natural and ambient light.',
  },
  {
    id: 'CATERING',
    title: 'CULINARY CURATORS',
    eyebrow: 'GASTRONOMY & BANQUETS',
    desc: 'Bespoke banqueting teams curating royal thalis, regional Indian delicacies, and exquisite celebratory dinners.',
  },
];

export default async function PlannersPage() {
  const planners = await getPlanners();

  // ItemList & BreadcrumbList JSON-LD Structured Data
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Recommended Wedding Planners & Industry Partners',
      description:
        'Curated vendor directory of verified planners, decorators, venues, and stylists.',
      url: 'https://thepicturesquare.com/planners',
      itemListElement: planners.map((p, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: p.name,
        description: `${p.category} based in ${p.city}`,
        url: p.url || `https://thepicturesquare.com/planners#${p.category.toLowerCase()}`,
      })),
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
          name: 'Planners & Partners',
          item: 'https://thepicturesquare.com/planners',
        },
      ],
    },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-24">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Header Block */}
      <Shell>
        <div className="space-y-6 text-center max-w-4xl mx-auto pb-4">
          <SectionHead
            as="h1"
            title="PLANNERS & PARTNERS"
            eyebrow="COMMENDED DIRECTORY"
            align="center"
          />

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;A directory of planners, designers, and artisans we have genuinely worked alongside in the field.&rdquo;
          </p>

          <p className="prose-editorial text-fg-dim text-sm max-w-2xl mx-auto">
            These are teams whose craft, professionalism, and calm composure elevate every celebration. Listed purely out of shared artistic respect, at zero promotional fee or affiliate cost to them.
          </p>
        </div>
      </Shell>

      {/* Quick Jump Category Bar */}
      <Shell>
        <nav
          aria-label="Partner Categories"
          className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-rule scrollbar-none justify-center select-none"
        >
          {CATEGORY_DEFINITIONS.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id.toLowerCase()}`}
              className="px-4 py-1.5 rounded-full border border-rule hover:border-accent text-fg-dim hover:text-fg text-meta-sm uppercase transition-all duration-300 shrink-0 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
            >
              {cat.id}
            </a>
          ))}
        </nav>
      </Shell>

      {/* Grouped Categories */}
      <Shell>
        <div className="space-y-32">
          {CATEGORY_DEFINITIONS.map((category) => {
            const vendorsInCat = planners.filter((v: Planner) => v.category === category.id);
            if (vendorsInCat.length === 0) return null;

            return (
              <section
                key={category.id}
                id={category.id.toLowerCase()}
                className="space-y-12 scroll-mt-28"
              >
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-rule pb-6">
                  <div className="space-y-2 max-w-2xl">
                    <span className="text-meta text-accent-text uppercase tracking-widest font-semibold">
                      {category.eyebrow}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl text-fg font-normal">
                      {category.title}
                    </h2>
                    <p className="text-body text-fg-dim text-sm">
                      {category.desc}
                    </p>
                  </div>

                  <span className="text-meta-sm text-fg-faint uppercase shrink-0">
                    {vendorsInCat.length} RECOMMENDATION{vendorsInCat.length > 1 ? 'S' : ''}
                  </span>
                </div>

                {/* Vendors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {vendorsInCat.map((vendor, idx) => {
                    const CardWrapper = vendor.url ? 'a' : 'div';
                    const linkProps = vendor.url
                      ? {
                          href: vendor.url,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          'aria-label': `Visit ${vendor.name} (${vendor.city})`,
                          'data-cursor': 'OUTBOUND',
                        }
                      : {};

                    return (
                      <CardWrapper
                        key={idx}
                        {...linkProps}
                        className="group p-6 sm:p-8 rounded-sm bg-bg-raised border border-rule hover:border-accent transition-all duration-400 flex flex-col justify-between space-y-6 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-[0_4px_20px_rgba(20,20,19,0.03)]"
                      >
                        <div className="space-y-4">
                          {/* Logo where supplied, name-only where not — never fabricate logos */}
                          {vendor.logo && (
                            <div className="w-12 h-12 relative overflow-hidden rounded-full border border-rule">
                              <Image
                                src={vendor.logo}
                                alt={`${vendor.name} logo`}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                          )}

                          <div className="space-y-1">
                            <span className="text-meta-sm text-accent-text block font-semibold">
                              {vendor.category}
                            </span>
                            <h3 className="font-display text-2xl sm:text-3xl text-fg font-normal group-hover:text-accent-text transition-colors duration-300">
                              {vendor.name}
                            </h3>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-rule/60 flex items-center justify-between font-sans">
                          <span className="text-meta-sm text-fg-dim uppercase tracking-wider">
                            {vendor.city}
                          </span>

                          {vendor.url ? (
                            <span className="inline-flex items-center gap-1 text-meta-sm text-fg group-hover:text-accent-text transition-colors font-medium">
                              <span>VISIT</span>
                              <ExternalLink size={12} className="text-accent-text" />
                            </span>
                          ) : (
                            <span className="text-meta-sm text-fg-faint">PARTNER</span>
                          )}
                        </div>
                      </CardWrapper>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </Shell>

      {/* Directory Disclaimer & Collaboration CTA */}
      <Shell>
        <div className="p-8 sm:p-12 rounded-sm bg-bg-raised border border-rule flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_10px_30px_rgba(20,20,19,0.04)]">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="text-meta text-accent-text block font-semibold">COLLABORATIONS</span>
            <h3 className="font-display text-3xl text-fg font-normal">
              ARE YOU A PLANNER OR DESIGNER?
            </h3>
            <p className="text-body text-fg-dim text-sm leading-relaxed">
              We love connecting with new production teams and luxury venues across India. Reach out directly to discuss upcoming dates, timeline coordination, or portfolio exchanges.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 shrink-0 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md"
            data-cursor="CONNECT"
          >
            <span>CONNECT WITH US →</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Shell>
    </main>
  );
}
