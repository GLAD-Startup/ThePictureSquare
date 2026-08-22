import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { SearchInterface } from '@/components/search/SearchInterface';

export const metadata: Metadata = {
  title: 'Search Archive — The Picture Square | Wedding Photography, Mathura',
  description:
    'Search through The Picture Square wedding chronicles, pre-wedding lookbooks, 4K cinema films, and handcrafted photobooks by city, couple, palace, or atmosphere.',
  alternates: {
    canonical: 'https://thepicturesquare.com/search',
  },
  openGraph: {
    title: 'Search Archive — The Picture Square | Wedding Photography, Mathura',
    description:
      'Search through stories, pre-wedding lookbooks, and 4K cinema films across India.',
    url: 'https://thepicturesquare.com/search',
  },
};

export default function SearchPage() {
  const jsonLd = {
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
        name: 'Search',
        item: 'https://thepicturesquare.com/search',
      },
    ],
  };

  return (
    <main className="py-28 sm:py-36 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Shell>
        <div className="space-y-6 text-center max-w-4xl mx-auto pb-4">
          <SectionHead
            as="h1"
            title="SEARCH ARCHIVE"
            eyebrow="STUDIO REPOSITORY"
            align="center"
          />

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;Search through stories, pre-wedding lookbooks, and 4K cinema films across India.&rdquo;
          </p>
        </div>
      </Shell>

      <Shell>
        <Suspense fallback={<div className="py-20 text-center text-meta text-accent-text">LOADING SEARCH...</div>}>
          <SearchInterface />
        </Suspense>
      </Shell>
    </main>
  );
}
