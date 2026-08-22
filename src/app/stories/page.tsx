import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { StoriesExplorer } from '@/components/stories/StoriesExplorer';
import { getStories, getAllTags } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Stories — The Picture Square | Wedding Photography, Mathura',
  description:
    'Documentary multi-day wedding stories, candid photographs, ceremony details, and slow-burn cinema trailers across Rajasthan, Uttar Pradesh, and destination venues.',
  alternates: {
    canonical: 'https://thepicturesquare.com/stories',
  },
  openGraph: {
    title: 'Stories — The Picture Square | Wedding Photography, Mathura',
    description:
      'Explore our complete archive of multi-day wedding chronicles, royal palace ceremonies, and intimate celebrations.',
    url: 'https://thepicturesquare.com/stories',
  },
};

export default async function StoriesPage() {
  const [stories, allTags] = await Promise.all([getStories(), getAllTags()]);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Wedding Stories Archive — The Picture Square',
      description:
        'Multi-day fine-art wedding photography monographs and 4K cinema chronicles.',
      url: 'https://thepicturesquare.com/stories',
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
          name: 'Stories',
          item: 'https://thepicturesquare.com/stories',
        },
      ],
    },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Header Block */}
      <Shell>
        <div className="space-y-6 text-center max-w-4xl mx-auto pb-4">
          <SectionHead
            as="h1"
            title="STORIES"
            eyebrow="ARCHIVE MONOGRAPHS"
            align="center"
          />

          {/* One italic display-face line beneath it */}
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;Multi-day wedding chronicles captured with documentary restraint and fine-art vision.&rdquo;
          </p>
        </div>
      </Shell>

      {/* Stories Explorer & Tag Filter with Suspense Boundary for ?page= searchParams */}
      <Shell>
        <Suspense fallback={<div className="py-20 text-center text-meta text-accent-text">LOADING STORIES ARCHIVE...</div>}>
          <StoriesExplorer stories={stories} allTags={allTags} />
        </Suspense>
      </Shell>
    </main>
  );
}
