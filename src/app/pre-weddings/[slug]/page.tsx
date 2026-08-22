import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';
import { Rule } from '@/components/ui/Rule';
import { SectionHead } from '@/components/ui/SectionHead';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import {
  getPreWeddings,
  getPreWedding,
  getAdjacentPreWeddings,
  getStoryForCouple,
} from '@/lib/content';
import { StoryShareButton } from '@/components/stories/StoryShareButton';
import { StoryFilmFacade } from '@/components/stories/StoryFilmFacade';
import { PreWeddingFlatGallery } from '@/components/pre-weddings/PreWeddingFlatGallery';
import { ParallaxFrame } from '@/components/ui/ParallaxFrame';

interface PreWeddingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const preWeddings = await getPreWeddings();
  return preWeddings.map((pw) => ({ slug: pw.slug }));
}

export async function generateMetadata({ params }: PreWeddingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPreWedding(slug);

  if (!item) {
    return {
      title: 'Pre-Wedding Session Not Found — The Picture Square | Wedding Photography, Mathura',
    };
  }

  const title = `${item.couple} Pre-Wedding Lookbook — ${item.location} | The Picture Square`;
  const canonicalUrl = `https://thepicturesquare.com/pre-weddings/${item.slug}`;

  return {
    title,
    description: item.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: item.excerpt,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: item.banner.src,
          width: item.banner.width,
          height: item.banner.height,
          alt: item.banner.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: item.excerpt,
      images: [item.banner.src],
    },
  };
}

export default async function PreWeddingDetailPage({ params }: PreWeddingPageProps) {
  const { slug } = await params;
  const [item, { prev, next }] = await Promise.all([
    getPreWedding(slug),
    getAdjacentPreWeddings(slug),
  ]);

  if (!item) {
    notFound();
  }

  // Cross-link to Wedding Story if available
  const matchingStory = await getStoryForCouple(item.couple);

  // JSON-LD Structured Data: Article + ImageGallery + BreadcrumbList
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${item.couple} Pre-Wedding Lookbook`,
      description: item.excerpt,
      image: `https://thepicturesquare.com${item.banner.src}`,
      datePublished: item.date,
      dateModified: item.date,
      author: {
        '@type': 'PhotographyBusiness',
        name: 'The Picture Square',
        url: 'https://thepicturesquare.com',
      },
      publisher: {
        '@type': 'PhotographyBusiness',
        name: 'The Picture Square',
        url: 'https://thepicturesquare.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://thepicturesquare.com/icon',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://thepicturesquare.com/pre-weddings/${item.slug}`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: `${item.couple} Pre-Wedding Lookbook Stills`,
      description: item.excerpt,
      hasPart: item.images.map((img) => ({
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
          name: 'Pre-Weddings',
          item: 'https://thepicturesquare.com/pre-weddings',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: item.couple,
          item: `https://thepicturesquare.com/pre-weddings/${item.slug}`,
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
            <Link
              href="/pre-weddings"
              className="inline-flex items-center gap-2 text-meta text-fg hover:text-accent-text uppercase transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
            >
              <ArrowLeft size={14} />
              <span>ALL PRE-WEDDINGS</span>
            </Link>

            <div className="hidden sm:block">
              <StoryShareButton title={`${item.couple} Pre-Wedding Lookbook`} couple={item.couple} />
            </div>

            <div className="flex items-center gap-3 text-meta text-fg-dim">
              <span className="text-accent-text font-semibold uppercase">{item.couple}</span>
              <span aria-hidden="true" className="text-fg-faint">•</span>
              <span className="hidden md:inline uppercase">{item.location}</span>
            </div>
          </div>
        </Shell>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. TITLE BLOCK — Centred, couple name in .text-hero           */}
      {/* ------------------------------------------------------------- */}
      <header className="py-20 sm:py-28 lg:py-36 text-center">
        <Shell>
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-hero text-fg font-normal leading-[0.92]">
              {item.couple}
            </h1>

            <div className="pt-2">
              <span className="text-meta text-accent-text uppercase tracking-[0.22em] font-semibold">
                {item.displayDate} · {item.location}
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
          src={item.banner.src}
          alt={item.banner.alt}
          width={item.banner.width}
          height={item.banner.height}
          priority
          intensity="strong"
          aspect="responsive-banner"
          focalY={40}
          cursorText="LOOKBOOK"
          className="w-full"
        />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. NARRATIVE — One or two paragraphs in max-w-[62ch]          */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-28">
        <Shell>
          <div className="max-w-[62ch] mx-auto space-y-6 font-sans text-center sm:text-left">
            <p className="text-body text-fg leading-[1.8] font-normal">
              {item.excerpt}
            </p>
            {item.body.map((para, idx) => (
              <p key={idx} className="text-body text-fg-dim leading-[1.8] font-normal">
                {para}
              </p>
            ))}
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* CROSS-LINK TO MATCHING WEDDING STORY                          */}
      {/* ------------------------------------------------------------- */}
      {matchingStory && (
        <section className="py-6">
          <Shell>
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-sm bg-bg-raised border border-accent/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-meta-sm text-accent-text flex items-center gap-1.5 uppercase font-semibold">
                  <Sparkles size={13} />
                  MATCHING WEDDING STORY AVAILABLE
                </span>
                <p className="font-display text-2xl text-fg">
                  Explore {item.couple}&apos;s full multi-day wedding in {matchingStory.location}
                </p>
              </div>

              <Link
                href={`/stories/${matchingStory.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta uppercase transition-all font-semibold shrink-0"
              >
                <span>VIEW WEDDING STORY</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </Shell>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. SINGLE FLAT MASONRY GALLERY (NO CHAPTER RAIL)               */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24">
        <Shell>
          <div className="space-y-12">
            <SectionHead
              title="THE SESSION ARCHIVE"
              eyebrow={`${item.images.length} CURATED STILLS`}
              align="center"
            />
            <PreWeddingFlatGallery images={item.images} />
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. OPTIONAL FILM FACADE                                       */}
      {/* ------------------------------------------------------------- */}
      {item.filmUrl && (
        <section className="py-16 sm:py-24">
          <Shell>
            <div className="space-y-6 text-center max-w-4xl mx-auto">
              <span className="text-meta text-accent-text block">
                MOTION PICTURE LOOKBOOK
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-fg font-normal">
                4K PRE-WEDDING CINEMA TEASER
              </h3>
            </div>
            <StoryFilmFacade
              filmUrl={item.filmUrl}
              poster={item.banner}
              couple={item.couple}
            />
          </Shell>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 7. CREDITS BLOCK                                              */}
      {/* ------------------------------------------------------------- */}
      {item.credits && item.credits.length > 0 && (
        <section className="py-16 sm:py-24">
          <Shell>
            <div className="space-y-10 max-w-4xl mx-auto">
              <Rule />

              <div className="space-y-6">
                <span className="text-meta text-accent-text block uppercase font-semibold">
                  SESSION CREDITS &amp; DIRECTION
                </span>

                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 font-sans text-[13px]">
                  {item.credits.map((credit, idx) => (
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
      )}

      {/* ------------------------------------------------------------- */}
      {/* 8. TAGS                                                       */}
      {/* ------------------------------------------------------------- */}
      {item.tags && item.tags.length > 0 && (
        <section className="py-6">
          <Shell>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
              <span className="text-meta-sm text-accent-text uppercase mr-2 font-semibold">
                TAGS:
              </span>
              {item.tags.map((tag) => {
                const tagUrl = `/pre-weddings/tag/${encodeURIComponent(
                  tag.toLowerCase().replace(/\s+/g, '-')
                )}`;
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
      {/* 9. PREV / NEXT SESSIONS                                       */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-28 border-t border-rule mt-16">
        <Shell>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {prev ? (
              <Link
                href={`/pre-weddings/${prev.slug}`}
                className="group relative h-[38vh] sm:h-[45vh] overflow-hidden rounded-sm bg-bg-sunken border border-rule flex flex-col justify-end p-8 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-[0_10px_30px_rgba(20,20,19,0.04)]"
                data-cursor="PREV"
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
                    ← PREVIOUS SESSION
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
                  FIRST PRE-WEDDING SESSION IN ARCHIVE
                </span>
              </div>
            )}

            {next ? (
              <Link
                href={`/pre-weddings/${next.slug}`}
                className="group relative h-[38vh] sm:h-[45vh] overflow-hidden rounded-sm bg-bg-sunken border border-rule flex flex-col justify-end p-8 text-right focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-[0_10px_30px_rgba(20,20,19,0.04)]"
                data-cursor="NEXT"
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
                    NEXT SESSION →
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
                  LATEST PRE-WEDDING SESSION IN ARCHIVE
                </span>
              </div>
            )}
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. CTA TO /contact                                           */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 sm:py-32 border-t border-rule text-center bg-bg-sunken/40">
        <Shell>
          <div className="space-y-8 max-w-3xl mx-auto">
            <span className="text-meta text-accent-text block font-semibold">
              RESERVE A SESSION
            </span>

            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-fg font-normal leading-tight">
              BOOK YOUR PRE-WEDDING LOOKBOOK
            </h3>

            <p className="prose-editorial text-fg-dim mx-auto">
              We shoot dawn and dusk pre-wedding sessions across Mathura river ghats, Agra heritage monuments, and Rajasthan destinations. Inquire with our studio team.
            </p>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md"
                data-cursor="INQUIRE"
              >
                <span>INQUIRE ABOUT SESSIONS →</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Shell>
      </section>
    </article>
  );
}
