import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';
import { Rule } from '@/components/ui/Rule';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import {
  getStories,
  getStory,
  getAdjacentStories,
  getTracks,
  getPreWeddingForCouple,
} from '@/lib/content';
import { StoryShareButton } from '@/components/stories/StoryShareButton';
import { StoryInlineAudio } from '@/components/stories/StoryInlineAudio';
import { StoryFilmFacade } from '@/components/stories/StoryFilmFacade';
import { StoryChapterRail } from '@/components/stories/StoryChapterRail';
import { StoryChaptersSection } from '@/components/stories/StoryChaptersSection';
import { ParallaxFrame } from '@/components/ui/ParallaxFrame';

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) {
    return {
      title: 'Story Not Found — The Picture Square | Wedding Photography, Mathura',
    };
  }

  const title = `${story.title} — ${story.couple}, ${story.location} | The Picture Square`;
  const canonicalUrl = `https://thepicturesquare.com/stories/${story.slug}`;

  return {
    title,
    description: story.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: story.excerpt,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: story.banner.src,
          width: story.banner.width,
          height: story.banner.height,
          alt: story.banner.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: story.excerpt,
      images: [story.banner.src],
    },
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const [story, { prev, next }, allTracks] = await Promise.all([
    getStory(slug),
    getAdjacentStories(slug),
    getTracks(),
  ]);

  if (!story) {
    notFound();
  }

  // Cross-link to Pre-Wedding lookbook if available for this couple
  const matchingPreWedding = await getPreWeddingForCouple(story.couple);

  // Find matching audio track if available in tracks.json
  const matchedTrack = story.track
    ? allTracks.find(
        (t) =>
          t.title.toLowerCase().includes(story.track!.title.toLowerCase()) ||
          story.track!.title.toLowerCase().includes(t.title.toLowerCase())
      ) || null
    : null;

  // Flatten all event images for ImageGallery schema
  const allImages = story.events.flatMap((e) => e.images);

  // JSON-LD Structured Data: Article + ImageGallery + BreadcrumbList
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${story.couple} — ${story.title}`,
      description: story.excerpt,
      image: `https://thepicturesquare.com${story.banner.src}`,
      datePublished: story.date,
      dateModified: story.date,
      author: {
        '@type': 'Organization',
        name: 'The Picture Square',
        url: 'https://thepicturesquare.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Picture Square',
        url: 'https://thepicturesquare.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://thepicturesquare.com/icon',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://thepicturesquare.com/stories/${story.slug}`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: `${story.couple} Wedding Photography Archive`,
      description: story.excerpt,
      hasPart: allImages.map((img) => ({
        '@type': 'ImageObject',
        contentUrl: `https://thepicturesquare.com${img.src}`,
        caption: img.alt,
        name: img.alt,
        width: img.width,
        height: img.height,
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
          name: 'Stories',
          item: 'https://thepicturesquare.com/stories',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: story.couple,
          item: `https://thepicturesquare.com/stories/${story.slug}`,
        },
      ],
    },
  ];

  return (
    <article className="relative min-h-screen bg-bg text-fg">
      {/* JSON-LD Script Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. BACK BAR — Sticky 56px, bg-bg, bottom hairline             */}
      {/* ------------------------------------------------------------- */}
      <div className="sticky top-0 z-40 h-14 bg-bg/95 backdrop-blur-md border-b border-rule flex items-center">
        <Shell>
          <div className="flex items-center justify-between font-sans">
            {/* Left: ← ALL STORIES */}
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-meta text-fg hover:text-accent-text uppercase transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
            >
              <ArrowLeft size={14} />
              <span>ALL STORIES</span>
            </Link>

            {/* Center / Right: Story Share Button */}
            <div className="hidden sm:block">
              <StoryShareButton title={story.title} couple={story.couple} />
            </div>

            {/* Right: Story Number and Location in .text-meta */}
            <div className="flex items-center gap-3 text-meta text-fg-dim">
              <span className="text-accent-text font-semibold uppercase">
                {story.couple}
              </span>
              <span aria-hidden="true" className="text-fg-faint">•</span>
              <span className="hidden md:inline uppercase">{story.location}</span>
            </div>
          </div>
        </Shell>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 7. CHAPTER RAIL — Fixed Left Rail on >=1280px                 */}
      {/* ------------------------------------------------------------- */}
      <StoryChapterRail events={story.events} />

      {/* ------------------------------------------------------------- */}
      {/* 2. TITLE BLOCK — Centred, heavy padding                       */}
      {/* ------------------------------------------------------------- */}
      <header className="py-20 sm:py-28 lg:py-36 text-center">
        <Shell>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Title in .text-hero */}
            <h1 className="text-hero text-fg font-normal leading-[0.92]">
              {story.title}
            </h1>

            {/* Couple Name */}
            <h2 className="font-display text-3xl sm:text-4xl text-accent-text font-normal italic tracking-wide">
              {story.couple}
            </h2>

            {/* "{displayDate} · {location}" in .text-meta */}
            <div className="pt-2">
              <span className="text-meta text-fg-dim uppercase tracking-[0.22em]">
                {story.displayDate} · {story.location}
              </span>
            </div>
          </div>
        </Shell>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 3. BANNER — Full-bleed ParallaxFrame (16:9 desktop, 4:5 mobile) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full overflow-hidden bg-bg-raised border-y border-rule shadow-[0_10px_30px_rgba(20,20,19,0.06)]">
        <ParallaxFrame
          src={story.banner.src}
          alt={story.banner.alt}
          width={story.banner.width}
          height={story.banner.height}
          priority
          intensity="strong"
          aspect="responsive-banner"
          focalY={40}
          cursorText="STORY"
          className="w-full"
        />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. NARRATIVE — Body paragraphs in .text-body, max-w-[62ch]    */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-28">
        <Shell>
          <div className="max-w-[62ch] mx-auto space-y-8 font-sans">
            {story.body.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-body text-fg leading-[1.8] font-normal"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* CROSS-LINK TO MATCHING PRE-WEDDING LOOKBOOK                   */}
      {/* ------------------------------------------------------------- */}
      {matchingPreWedding && (
        <section className="py-6">
          <Shell>
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-sm bg-bg-raised border border-accent/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-meta-sm text-accent-text flex items-center gap-1.5 uppercase font-semibold">
                  <Sparkles size={13} />
                  PRE-WEDDING LOOKBOOK AVAILABLE
                </span>
                <p className="font-display text-2xl text-fg">
                  Explore {story.couple}&apos;s editorial pre-wedding lookbook in {matchingPreWedding.location}
                </p>
              </div>

              <Link
                href={`/pre-weddings/${matchingPreWedding.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta uppercase transition-all font-semibold shrink-0"
              >
                <span>VIEW PRE-WEDDING</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </Shell>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. TRACK — Inline Soundtrack Audio Credit & Player            */}
      {/* ------------------------------------------------------------- */}
      {story.track && (
        <section className="py-4">
          <Shell>
            <StoryInlineAudio
              trackInfo={story.track}
              matchedTrack={matchedTrack}
            />
          </Shell>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. CHAPTERS — Ordered events with MasonryGallery & Lightbox   */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24">
        <Shell>
          <StoryChaptersSection events={story.events} />
        </Shell>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. FILM — 16:9 Facade (poster + play) loading iframe on click */}
      {/* ------------------------------------------------------------- */}
      {story.filmUrl && (
        <section className="py-16 sm:py-24">
          <Shell>
            <div className="space-y-6 text-center max-w-4xl mx-auto">
              <span className="text-meta text-accent-text block">
                CINEMATOGRAPHY REEL
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-fg font-normal">
                THE 4K MOTION PICTURE
              </h3>
            </div>
            <StoryFilmFacade
              filmUrl={story.filmUrl}
              poster={story.banner}
              couple={story.couple}
            />
          </Shell>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 9. CREDITS — Hairline + CREDITS in .text-meta + 2-col DL       */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24">
        <Shell>
          <div className="space-y-10 max-w-4xl mx-auto">
            <Rule />

            <div className="space-y-6">
              <span className="text-meta text-accent-text block uppercase">
                COMMISSION CREDITS &amp; VENDORS
              </span>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 font-sans text-[13px]">
                {story.credits.map((credit, idx) => (
                  <div
                    key={idx}
                    className="flex items-baseline justify-between py-2 border-b border-rule/50"
                  >
                    <dt className="font-semibold text-fg-dim uppercase tracking-wider">
                      {credit.role}
                    </dt>
                    <dd className="font-medium text-fg tracking-wide">
                      {credit.url ? (
                        <a
                          href={credit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent-text transition-colors inline-flex items-center gap-1"
                        >
                          <span>{credit.name}</span>
                          <ArrowUpRight size={11} className="text-accent-text" />
                        </a>
                      ) : (
                        <span>{credit.name}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. TAGS — Story tags linking to /stories/tag/{tag}            */}
      {/* ------------------------------------------------------------- */}
      {story.tags && story.tags.length > 0 && (
        <section className="py-6">
          <Shell>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
              <span className="text-meta-sm text-accent-text uppercase mr-2 font-semibold">
                TAGS:
              </span>
              {story.tags.map((tag) => {
                const tagUrl = `/stories/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`;
                return (
                  <Link
                    key={tag}
                    href={tagUrl}
                    className="px-4 py-1.5 rounded-full border border-rule hover:border-accent text-fg-dim hover:text-fg text-meta-sm uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>
          </Shell>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 11. PREV / NEXT — Two half-width blocks with hover fade        */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-28 border-t border-rule mt-16">
        <Shell>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* PREVIOUS STORY */}
            {prev ? (
              <Link
                href={`/stories/${prev.slug}`}
                className="group relative h-[38vh] sm:h-[45vh] overflow-hidden rounded-sm bg-bg-sunken border border-rule flex flex-col justify-end p-8 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-[0_10px_30px_rgba(20,20,19,0.04)]"
                data-cursor="PREV STORY"
              >
                <Image
                  src={prev.cover.src}
                  alt={prev.cover.alt}
                  width={prev.cover.width}
                  height={prev.cover.height}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] filter brightness-[0.98] contrast-[1.02]"
                />

                {/* 1px Inset Border & Subtle Ring */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
                  aria-hidden="true"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg-raised/95 via-bg-raised/50 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-2 text-fg">
                  <span className="text-meta text-accent-text block font-semibold">
                    ← PREVIOUS STORY
                  </span>
                  <h4 className="text-display-md text-fg font-normal group-hover:text-accent-text transition-colors">
                    {prev.couple}
                  </h4>
                  <span className="text-meta-sm text-fg-dim block">
                    {prev.location}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="h-[38vh] sm:h-[45vh] rounded-sm bg-bg-sunken border border-rule/50 flex flex-col justify-center items-center text-center p-8">
                <span className="text-meta text-accent-text block mb-2 font-semibold">
                  ARCHIVE BEGINNING
                </span>
                <span className="text-meta-sm text-fg-dim">
                  THIS IS THE FIRST STORY IN THE ARCHIVE
                </span>
              </div>
            )}

            {/* NEXT STORY */}
            {next ? (
              <Link
                href={`/stories/${next.slug}`}
                className="group relative h-[38vh] sm:h-[45vh] overflow-hidden rounded-sm bg-bg-sunken border border-rule flex flex-col justify-end p-8 text-right focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-[0_10px_30px_rgba(20,20,19,0.04)]"
                data-cursor="NEXT STORY"
              >
                <Image
                  src={next.cover.src}
                  alt={next.cover.alt}
                  width={next.cover.width}
                  height={next.cover.height}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] filter brightness-[0.98] contrast-[1.02]"
                />

                {/* 1px Inset Border & Subtle Ring */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
                  aria-hidden="true"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg-raised/95 via-bg-raised/50 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-2 text-fg">
                  <span className="text-meta text-accent-text block font-semibold">
                    NEXT STORY →
                  </span>
                  <h4 className="text-display-md text-fg font-normal group-hover:text-accent-text transition-colors">
                    {next.couple}
                  </h4>
                  <span className="text-meta-sm text-fg-dim block">
                    {next.location}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="h-[38vh] sm:h-[45vh] rounded-sm bg-bg-sunken border border-rule/50 flex flex-col justify-center items-center text-center p-8">
                <span className="text-meta text-accent-text block mb-2 font-semibold">
                  ARCHIVE CONCLUSION
                </span>
                <span className="text-meta-sm text-fg-dim">
                  THIS IS THE LATEST STORY IN THE ARCHIVE
                </span>
              </div>
            )}
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 12. CTA TO /contact                                           */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 sm:py-32 border-t border-rule text-center bg-bg-sunken/40">
        <Shell>
          <div className="space-y-8 max-w-3xl mx-auto">
            <span className="text-meta text-accent-text block font-semibold">
              BEGIN A CONVERSATION
            </span>

            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-fg font-normal leading-tight">
              COMMISSION YOUR WEDDING STORY
            </h3>

            <p className="prose-editorial text-fg-dim mx-auto">
              We accept a limited number of commissions each year for celebrations in Mathura, Rajasthan, and worldwide. Inquire early to secure your wedding dates.
            </p>

            <div className="pt-4">
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
      </section>
    </article>
  );
}
