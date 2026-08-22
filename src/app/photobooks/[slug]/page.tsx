import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';
import { ParallaxFrame } from '@/components/ui/ParallaxFrame';
import { ArrowLeft, ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';
import { getPhotobooks, getPhotobook } from '@/lib/content';
import { StoryShareButton } from '@/components/stories/StoryShareButton';

interface PhotobookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const books = await getPhotobooks();
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PhotobookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getPhotobook(slug);

  if (!book) {
    return {
      title: 'Photobook Not Found — The Picture Square | Wedding Photography, Mathura',
    };
  }

  const title = `${book.couple} Heirloom Monograph — The Picture Square | Wedding Photography, Mathura`;
  const canonicalUrl = `https://thepicturesquare.com/photobooks/${book.slug}`;

  return {
    title,
    description: `A masterwork physical wedding monograph for ${book.couple}. ${book.pageCount} pages bound in ${book.binding} (${book.size}).`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: `Physical fine-art heirloom monograph bound in ${book.binding}.`,
      url: canonicalUrl,
      images: [
        {
          url: book.cover.src,
          width: book.cover.width,
          height: book.cover.height,
          alt: book.cover.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Physical fine-art heirloom monograph bound in ${book.binding}.`,
      images: [book.cover.src],
    },
  };
}

export default async function PhotobookDetailPage({ params }: PhotobookPageProps) {
  const { slug } = await params;
  const book = await getPhotobook(slug);

  if (!book) {
    notFound();
  }

  const paperType = book.paper || 'Museum-Grade Archival Cotton Rag 310gsm';

  // Product + BreadcrumbList JSON-LD
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${book.couple} Handcrafted Wedding Monograph`,
      description: `Bespoke fine-art physical wedding photobook bound in ${book.binding}. ${book.pageCount} pages, trim size ${book.size}, printed on ${paperType}.`,
      image: `https://thepicturesquare.com${book.cover.src}`,
      brand: {
        '@type': 'Brand',
        name: 'The Picture Square Heirloom Print Division',
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'PhotographyBusiness',
          name: 'The Picture Square',
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
          name: 'Photobooks',
          item: 'https://thepicturesquare.com/photobooks',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: book.couple,
          item: `https://thepicturesquare.com/photobooks/${book.slug}`,
        },
      ],
    },
  ];

  return (
    <article className="relative min-h-screen bg-bg text-fg">
      {/* Product JSON-LD Schema */}
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
              href="/photobooks"
              className="inline-flex items-center gap-2 text-meta text-fg hover:text-accent-text uppercase transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
            >
              <ArrowLeft size={14} />
              <span>ALL PHOTOBOOKS</span>
            </Link>

            <div className="hidden sm:block">
              <StoryShareButton title={`${book.couple} Heirloom Monograph`} couple={book.couple} />
            </div>

            <div className="flex items-center gap-3 text-meta text-fg-dim">
              <span className="text-accent-text font-semibold uppercase">{book.couple}</span>
              <span aria-hidden="true" className="text-fg-faint">•</span>
              <span className="hidden md:inline uppercase">{book.size}</span>
            </div>
          </div>
        </Shell>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. HEADER — Couple name in .text-hero & Spec Line in .text-meta */}
      {/* ------------------------------------------------------------- */}
      <header className="py-20 sm:py-28 lg:py-36 text-center">
        <Shell>
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-meta text-accent-text flex items-center justify-center gap-2 uppercase tracking-widest font-semibold">
              <BookOpen size={14} />
              HANDCRAFTED HEIRLOOM MONOGRAPH
            </span>

            <h1 className="text-hero text-fg font-normal leading-[0.92]">
              {book.couple}
            </h1>

            {/* Spec Line: Page count, binding, trim size, paper in .text-meta */}
            <div className="pt-3 max-w-3xl mx-auto border-t border-rule/80">
              <p className="text-meta text-accent-text tracking-widest uppercase font-semibold leading-relaxed">
                {book.pageCount} PAGES · {book.binding} · {book.size} · {paperType}
              </p>
            </div>
          </div>
        </Shell>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 3. PHYSICAL COVER OBJECT SHOWCASE                             */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 sm:py-16 bg-bg-sunken border-y border-rule">
        <Shell>
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <div className="relative w-full max-w-2xl mx-auto aspect-[4/5] overflow-hidden rounded-sm bg-bg-raised border border-accent/40 shadow-[0_10px_30px_rgba(20,20,19,0.08)] group">
              <Image
                src={book.cover.src}
                alt={book.cover.alt}
                width={book.cover.width}
                height={book.cover.height}
                priority
                className="w-full h-full object-cover filter brightness-[0.98] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-bg-inverse/60 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="absolute bottom-6 left-6 right-6 text-left text-fg-inverse">
                <span className="text-meta-sm text-accent block mb-1 font-semibold">
                  PHYSICAL OBJECT ARCHIVE
                </span>
                <h3 className="font-display text-2xl text-fg-inverse font-normal">
                  {book.binding}
                </h3>
              </div>
            </div>

            {book.description && (
              <p className="text-body text-fg-dim max-w-2xl mx-auto leading-relaxed">
                {book.description}
              </p>
            )}
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. SPREADS RENDERED AS FULL-WIDTH 2:1 IMAGES IN SEQUENCE      */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 sm:py-32 space-y-32">
        <Shell>
          <div className="space-y-32">
            {book.spreads.map((spread, idx) => (
              <div key={idx} className="space-y-6">
                {/* Hairline Caption Naming the Event */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-rule pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-meta text-accent-text font-semibold">
                      SPREAD {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span aria-hidden="true" className="text-fg-faint">•</span>
                    <span className="text-meta text-fg font-medium uppercase tracking-wider">
                      {spread.caption || `Chapter Sequence ${idx + 1}`}
                    </span>
                  </div>

                  <span className="text-meta-sm text-fg-dim">
                    LAY-FLAT 2:1 PANORAMIC DOUBLE-PAGE SPREAD
                  </span>
                </div>

                {/* 2:1 Full-Width Parallax Spread (Subtle Intensity) */}
                <div className="relative w-full overflow-hidden rounded-none shadow-[0_10px_30px_rgba(20,20,19,0.04)]">
                  <ParallaxFrame
                    src={spread.image.src}
                    alt={spread.image.alt || spread.caption || `Photobook Spread ${idx + 1}`}
                    width={spread.image.width || 2400}
                    height={spread.image.height || 1200}
                    aspect="2/1"
                    intensity="subtle"
                    focalY={50}
                    cursorText="SPREAD"
                    className="w-full"
                  />

                  {/* Center Spread Gutter Simulation Line (Subtle) */}
                  <div
                    className="absolute inset-y-0 left-1/2 w-[1px] bg-fg/15 shadow-[0_0_8px_rgba(20,20,19,0.2)] pointer-events-none z-20"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. CTA TO ENQUIRE ABOUT ALBUMS SPECIFICALLY                   */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 sm:py-32 border-t border-rule bg-bg-sunken/40 text-center">
        <Shell>
          <div className="space-y-8 max-w-3xl mx-auto">
            <span className="text-meta text-accent-text flex items-center justify-center gap-2 uppercase tracking-widest font-semibold">
              <Sparkles size={14} />
              HEIRLOOM PRINT COMMISSIONS
            </span>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-fg font-normal leading-tight">
              COMMISSION A HANDCRAFTED MONOGRAPH
            </h2>

            <p className="prose-editorial text-fg-dim mx-auto">
              Every album is custom-curated, printed with museum-grade archival pigments on 310gsm cotton rag, and hand-bound in Italy or Varanasi. Inquire to review cover swatches, leather samples, and embossing options.
            </p>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md"
                data-cursor="INQUIRE"
              >
                <span>INQUIRE ABOUT ALBUM COMMISSIONS →</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Shell>
      </section>
    </article>
  );
}
