import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { getPhotobooks } from '@/lib/content';
import { ArrowUpRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Photobooks — The Picture Square | Wedding Photography, Mathura',
  description:
    'Explore our bespoke heirloom wedding monographs, handcrafted Italian leather lay-flat albums, and fine-art cotton rag photobooks designed to last generations.',
  alternates: {
    canonical: 'https://thepicturesquare.com/photobooks',
  },
  openGraph: {
    title: 'Photobooks — The Picture Square | Wedding Photography, Mathura',
    description:
      'Physical fine-art monographs designed to outlive hard drives, clouds, and generations.',
    url: 'https://thepicturesquare.com/photobooks',
  },
};

export default async function PhotobooksPage() {
  const books = await getPhotobooks();

  // JSON-LD Structured Data: CollectionPage + BreadcrumbList
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Handcrafted Wedding Monographs & Photobooks',
      description:
        'Archival Italian leather wedding albums and handcrafted lay-flat monographs.',
      url: 'https://thepicturesquare.com/photobooks',
      provider: {
        '@type': 'PhotographyBusiness',
        name: 'The Picture Square',
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

      {/* Header Block */}
      <Shell>
        <div className="space-y-6 text-center max-w-4xl mx-auto pb-4">
          <SectionHead
            as="h1"
            title="PHOTOBOOKS"
            eyebrow="HEIRLOOM PRINT DIVISION"
            align="center"
          />

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;Physical monographs designed to outlive hard drives, clouds, and generations.&rdquo;
          </p>

          <p className="prose-editorial text-fg-dim text-sm max-w-2xl mx-auto">
            Every commissioned wedding includes our signature bespoke heirloom album. Hand-bound in Italian leather or raw Varanasi silk, individually curated, and printed with museum-grade archival pigments.
          </p>
        </div>
      </Shell>

      {/* Photobook Entries Grid */}
      <Shell>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {books.map((book, idx) => (
            <div key={book.slug} className="group flex flex-col">
              {/* EXACTLY ONE <a> WRAPPING THE CARD */}
              <Link
                href={`/photobooks/${book.slug}`}
                className="block focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none rounded-sm"
                aria-label={`View handcrafted photobook: ${book.couple}`}
                data-cursor="VIEW MONOGRAPH"
              >
                {/* Physical Cover Container */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-bg-raised border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.06)]">
                  <Image
                    src={book.cover.src}
                    alt={book.cover.alt}
                    width={book.cover.width}
                    height={book.cover.height}
                    priority={idx === 0}
                    className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-bg-inverse/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Spec Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3.5 py-1 bg-bg-raised/90 backdrop-blur-md rounded-full border border-rule font-sans text-meta-sm">
                    <span className="text-accent-text font-semibold">
                      {book.pageCount} PAGES · {book.size}
                    </span>
                  </div>
                </div>

                {/* Details below Card */}
                <div className="space-y-2 pt-4 border-b border-rule pb-4">
                  <div className="flex items-center justify-between text-meta text-accent-text">
                    <span>{book.binding}</span>
                    <span>{book.date}</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl text-fg font-normal leading-tight group-hover:text-accent-text transition-colors duration-300">
                    {book.couple}
                  </h2>

                  {book.description && (
                    <p className="text-body text-fg-dim text-sm line-clamp-2 leading-relaxed">
                      {book.description}
                    </p>
                  )}

                  <div className="pt-2">
                    <span className="relative inline-flex items-center gap-1.5 text-meta text-fg group-hover:text-accent-text transition-colors">
                      <span>VIEW MONOGRAPH</span>
                      <ArrowUpRight size={13} className="text-accent-text" />
                      <span
                        className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ease-[cubic-bezier(0.23,1,0.32,1)]"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Shell>

      {/* Album Specs Apparatus */}
      <Shell>
        <div className="p-8 sm:p-12 rounded-sm bg-bg-raised border border-rule space-y-8 shadow-[0_10px_30px_rgba(20,20,19,0.04)]">
          <SectionHead title="ARCHIVAL CRAFT" eyebrow="PRINT SPECIFICATIONS" align="left" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans text-[13px]">
            <div className="space-y-2 p-5 bg-bg-sunken rounded-sm border border-rule">
              <div className="flex items-center gap-2 text-accent-text font-semibold uppercase tracking-wider">
                <BookOpen size={14} />
                <span>SEAMLESS LAY-FLAT BINDING</span>
              </div>
              <p className="text-fg-dim leading-relaxed">
                Engineered with flush panoramic spreads allowing expansive double-page photographs without center gutter interruptions.
              </p>
            </div>

            <div className="space-y-2 p-5 bg-bg-sunken rounded-sm border border-rule">
              <div className="flex items-center gap-2 text-accent-text font-semibold uppercase tracking-wider">
                <BookOpen size={14} />
                <span>MUSEUM-GRADE COTTON PAPER</span>
              </div>
              <p className="text-fg-dim leading-relaxed">
                Heavyweight 310gsm archival matte cotton rag paper engineered for 100+ year color permanence without fading.
              </p>
            </div>

            <div className="space-y-2 p-5 bg-bg-sunken rounded-sm border border-rule">
              <div className="flex items-center gap-2 text-accent-text font-semibold uppercase tracking-wider">
                <BookOpen size={14} />
                <span>ITALIAN LEATHER &amp; RAW SILK</span>
              </div>
              <p className="text-fg-dim leading-relaxed">
                Vegetable-tanned full-grain Italian leathers and handloom Varanasi raw silk covers debossed with custom 24k gold foil.
              </p>
            </div>
          </div>
        </div>
      </Shell>

      {/* Page Closing CTA */}
      <Shell>
        <div className="pt-16 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-meta text-accent-text">HEIRLOOM COMMISSIONS</span>
            <h3 className="font-display text-3xl sm:text-4xl text-fg font-normal">
              COMMISSION A BESPOKE PHOTOBOOK
            </h3>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md"
            data-cursor="INQUIRE"
          >
            <span>INQUIRE ABOUT ALBUMS →</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Shell>
    </main>
  );
}
