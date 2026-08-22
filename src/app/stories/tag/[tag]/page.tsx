import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { StoriesExplorer } from '@/components/stories/StoriesExplorer';
import { getStories, getAllTags } from '@/lib/content';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const allTags = await getAllTags();
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
    title: `${decodedTag} wedding photography — The Picture Square`,
    description: `Curated ${decodedTag} wedding stories, multi-day celebrations, royal palace ceremonies, and fine-art monographs by The Picture Square.`,
    alternates: {
      canonical: `https://thepicturesquare.com/stories/tag/${tag}`,
    },
  };
}

export default async function StoryTagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const normalizedTag = decodeURIComponent(tag).replace(/-/g, ' ').toLowerCase();

  const [allStories, allTags] = await Promise.all([getStories(), getAllTags()]);

  // Match tag case-insensitively
  const filteredStories = allStories.filter((s) =>
    s.tags?.some((t) => t.toLowerCase() === normalizedTag)
  );

  if (filteredStories.length === 0) {
    notFound();
  }

  // Find exact case of the tag from allTags
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
      name: `${displayTag} Wedding Photography — The Picture Square`,
      description: `Curated ${displayTag} wedding stories and fine-art monographs.`,
      url: `https://thepicturesquare.com/stories/tag/${tag}`,
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
        {
          '@type': 'ListItem',
          position: 3,
          name: displayTag,
          item: `https://thepicturesquare.com/stories/tag/${tag}`,
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
            eyebrow={`TAGGED: ${displayTag.toUpperCase()} · ${filteredStories.length} ${
              filteredStories.length === 1 ? 'STORY' : 'STORIES'
            }`}
            align="center"
          />

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;Curated wedding chronicles and monographs tagged under {displayTag}.&rdquo;
          </p>

          <p className="text-meta text-accent-text tracking-widest uppercase font-semibold">
            {filteredStories.length} ARCHIVE {filteredStories.length === 1 ? 'ENTRY' : 'ENTRIES'}
          </p>
        </div>
      </Shell>

      {/* Stories Explorer & Tag Filter with active tag */}
      <Shell>
        <Suspense fallback={<div className="py-20 text-center text-meta text-accent-text">LOADING STORIES...</div>}>
          <StoriesExplorer
            stories={filteredStories}
            allTags={allTags}
            currentTag={displayTag}
          />
        </Suspense>
      </Shell>
    </main>
  );
}
