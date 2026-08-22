import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { PreWeddingsExplorer } from '@/components/pre-weddings/PreWeddingsExplorer';
import { getPreWeddings, getPreWeddingTags } from '@/lib/content';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const allTags = await getPreWeddingTags();
  return allTags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag)
    .replace(/-/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${decodedTag} pre-wedding photography — The Picture Square`,
    description: `Browse fine-art ${decodedTag} pre-wedding lookbook sessions, destination dawn portraits, and conceptual shoots by The Picture Square.`,
    alternates: {
      canonical: `https://thepicturesquare.com/pre-weddings/tag/${tag}`,
    },
  };
}

export default async function PreWeddingTagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const normalizedTag = decodeURIComponent(tag).replace(/-/g, ' ').toLowerCase();

  const [allPreWeddings, allTags] = await Promise.all([
    getPreWeddings(),
    getPreWeddingTags(),
  ]);

  const filteredItems = allPreWeddings.filter((pw) =>
    pw.tags?.some((t) => t.toLowerCase() === normalizedTag)
  );

  if (filteredItems.length === 0) {
    notFound();
  }

  const displayTag =
    allTags.find((t) => t.toLowerCase() === normalizedTag) ||
    normalizedTag
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${displayTag} Pre-Wedding Photography — The Picture Square`,
      description: `Curated ${displayTag} pre-wedding lookbooks and destination portraits.`,
      url: `https://thepicturesquare.com/pre-weddings/tag/${tag}`,
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
        {
          '@type': 'ListItem',
          position: 3,
          name: displayTag,
          item: `https://thepicturesquare.com/pre-weddings/tag/${tag}`,
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
            title="PRE-WEDDINGS"
            eyebrow={`TAGGED: ${displayTag.toUpperCase()} · ${filteredItems.length} ${
              filteredItems.length === 1 ? 'LOOKBOOK' : 'LOOKBOOKS'
            }`}
            align="center"
          />

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;Curated pre-wedding lookbooks and destination sessions tagged under {displayTag}.&rdquo;
          </p>

          <p className="text-meta text-accent-text tracking-widest uppercase font-semibold">
            {filteredItems.length} ARCHIVE {filteredItems.length === 1 ? 'LOOKBOOK' : 'LOOKBOOKS'}
          </p>
        </div>
      </Shell>

      {/* Pre-Weddings Explorer & Tag Filter with active tag */}
      <Shell>
        <Suspense fallback={<div className="py-20 text-center text-meta text-accent-text">LOADING PRE-WEDDINGS...</div>}>
          <PreWeddingsExplorer
            preWeddings={filteredItems}
            allTags={allTags}
            currentTag={displayTag}
          />
        </Suspense>
      </Shell>
    </main>
  );
}
