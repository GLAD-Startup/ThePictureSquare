import type { Metadata } from 'next';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { FilmsExplorer } from '@/components/films/FilmsExplorer';
import { getFilms } from '@/lib/content';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Films — The Picture Square | Wedding Photography, Mathura',
  description:
    'Documentary motion pictures, slow-burn 4K wedding trailers, vertical instacuts, and cinematic showreels scored with custom audio composition.',
  alternates: {
    canonical: 'https://thepicturesquare.com/films',
  },
  openGraph: {
    title: 'Films — The Picture Square | Wedding Photography, Mathura',
    description:
      'Explore slow-burn wedding trailers, vertical instacuts, and cinema compilations by The Picture Square.',
    url: 'https://thepicturesquare.com/films',
  },
};

export default async function FilmsPage() {
  const films = await getFilms();

  // JSON-LD Structured Data: CollectionPage with VideoObject + BreadcrumbList
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: '4K Cinema Films, Trailers & Instacuts — The Picture Square',
      description:
        'Fine-art wedding cinematography and 4K documentary films by The Picture Square.',
      url: 'https://thepicturesquare.com/films',
      hasPart: films.map((f) => ({
        '@type': 'VideoObject',
        name: `${f.couple} — 4K Wedding ${f.kind.toUpperCase()}`,
        description: `4K wedding cinema film for ${f.couple} in ${f.location}.`,
        thumbnailUrl: `https://thepicturesquare.com${f.poster.src}`,
        uploadDate: '2026-01-01',
        duration: f.runtime,
        contentUrl:
          f.provider === 'youtube'
            ? `https://www.youtube.com/watch?v=${f.videoId}`
            : `https://vimeo.com/${f.videoId}`,
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
          name: 'Films',
          item: 'https://thepicturesquare.com/films',
        },
      ],
    },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-24">
      {/* JSON-LD Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Header */}
      <Shell>
        <div className="space-y-6 text-center max-w-4xl mx-auto pb-4">
          <SectionHead
            as="h1"
            title="FILMS"
            eyebrow="FINE ART CINEMA DIVISION"
            align="center"
          />

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;Slow-burn 4K motion pictures scored with licensed acoustic compositions and real ambient sound.&rdquo;
          </p>

          <p className="prose-editorial text-fg-dim text-sm max-w-2xl mx-auto">
            We shoot with 4K cinema prime optics, low-profile gimbal rigs, and dedicated audio capture units to record kinetic movement and vows with documentary intimacy.
          </p>
        </div>
      </Shell>

      {/* Films Explorer Component */}
      <Shell>
        <FilmsExplorer films={films} />
      </Shell>

      {/* Closing CTA */}
      <Shell>
        <div className="pt-16 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-meta text-accent-text block font-semibold">
              DESIRE A CINEMATIC COMMISSION?
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-fg font-normal">
              TELL US ABOUT YOUR EVENT TIMELINES
            </h3>
          </div>

          <Link
            href="/contact?suite=cinematography"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shrink-0 shadow-md"
            data-cursor="INQUIRE"
          >
            <span>INQUIRE FOR CINEMA →</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Shell>
    </main>
  );
}
