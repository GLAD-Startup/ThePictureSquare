import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { PreWeddingsExplorer } from '@/components/pre-weddings/PreWeddingsExplorer';
import { getPreWeddings, getPreWeddingTags } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Pre-Weddings — The Picture Square | Wedding Photography, Mathura',
  description:
    'Editorial pre-wedding sessions captured across Mathura Yamuna ghats, ancient Vrindavan arcades, Agra sandstone corridors, and Rajasthan royal landscapes.',
  alternates: {
    canonical: 'https://thepicturesquare.com/pre-weddings',
  },
  openGraph: {
    title: 'Pre-Weddings — The Picture Square | Wedding Photography, Mathura',
    description:
      'Conceptual visual stories and editorial magazine lookbooks crafted in natural light before the wedding day.',
    url: 'https://thepicturesquare.com/pre-weddings',
  },
};

export default async function PreWeddingsPage() {
  const [preWeddings, allTags] = await Promise.all([
    getPreWeddings(),
    getPreWeddingTags(),
  ]);

  // JSON-LD Structured Data: CollectionPage + BreadcrumbList
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Pre-Wedding Visual Stories & Editorial Lookbooks',
      description:
        'Fine-art pre-wedding photography and destination lookbook sessions by The Picture Square.',
      url: 'https://thepicturesquare.com/pre-weddings',
      provider: {
        '@type': 'PhotographyBusiness',
        name: 'The Picture Square',
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
          name: 'Pre-Weddings',
          item: 'https://thepicturesquare.com/pre-weddings',
        },
      ],
    },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-16">
      {/* JSON-LD Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Page Header Block */}
      <Shell>
        <div className="space-y-6 text-center max-w-4xl mx-auto pb-4">
          <SectionHead
            as="h1"
            title="PRE-WEDDINGS"
            eyebrow="LOOKBOOK SESSIONS"
            align="center"
          />

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;Intimate pre-wedding sessions conceived as quiet editorial lookbooks across the Braj countryside and heritage palace destinations.&rdquo;
          </p>

          <p className="prose-editorial text-fg-dim text-sm max-w-2xl mx-auto">
            A pre-wedding shoot is an unhurried visual study of connection before the rush of wedding days. We photograph in early dawn mist and dusk glow without manufactured choreography.
          </p>
        </div>
      </Shell>

      {/* Pre-Weddings Grid & Tag Filter with Suspense */}
      <Shell>
        <Suspense fallback={<div className="py-20 text-center text-meta text-accent-text">LOADING PRE-WEDDING LOOKBOOKS...</div>}>
          <PreWeddingsExplorer preWeddings={preWeddings} allTags={allTags} />
        </Suspense>
      </Shell>
    </main>
  );
}
