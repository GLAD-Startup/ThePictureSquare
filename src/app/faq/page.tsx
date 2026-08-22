import type { Metadata } from 'next';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { FaqSection } from '@/components/faq/FaqSection';
import { getFaq, FaqItem } from '@/lib/content';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — The Picture Square | Wedding Photography, Mathura',
  description:
    'Comprehensive commission guide covering destination coverage, crew sizes, deliverables, 4K film timelines, heirloom photobooks, and copyright usage.',
  alternates: {
    canonical: 'https://thepicturesquare.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions — The Picture Square | Wedding Photography, Mathura',
    description:
      'Everything you need to know about commissioning our studio for your wedding celebration.',
    url: 'https://thepicturesquare.com/faq',
  },
};

const SECTION_ORDER = [
  'BEFORE YOU BOOK',
  'ON THE DAY',
  'DELIVERABLES',
  'AFTER THE WEDDING',
  'RIGHTS AND USAGE',
];

export default async function FaqPage() {
  const allFaqs = await getFaq();

  // Group FAQs by ordered sections
  const groupedSections: { title: string; items: FaqItem[] }[] = SECTION_ORDER.map(
    (sectionTitle) => ({
      title: sectionTitle,
      items: allFaqs.filter(
        (item) => item.section.toUpperCase() === sectionTitle.toUpperCase()
      ),
    })
  ).filter((s) => s.items.length > 0);

  // FAQPage & BreadcrumbList JSON-LD Structured Data
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
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
          name: 'FAQ',
          item: 'https://thepicturesquare.com/faq',
        },
      ],
    },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-24">
      {/* FAQPage JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Header */}
      <Shell>
        <div className="space-y-6 text-center max-w-4xl mx-auto pb-4">
          <SectionHead
            as="h1"
            title="FREQUENTLY ASKED QUESTIONS"
            eyebrow="COMMISSION GUIDE &amp; LOGISTICS"
            align="center"
          />

          {/* One Italic Display Line */}
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;Clear answers on our dates, coverage, crew sizes, deliverables, and artistic process before commissioning our studio.&rdquo;
          </p>

          <p className="prose-editorial text-fg-dim text-sm max-w-2xl mx-auto">
            We believe in total transparency. If you have a question specific to your multi-day itinerary or destination venue not covered here, our studio desk is available to assist.
          </p>
        </div>
      </Shell>

      {/* Grouped Accordions */}
      <Shell>
        <FaqSection sections={groupedSections} />
      </Shell>

      {/* Closing CTA */}
      <Shell>
        <div className="pt-16 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-meta text-accent-text block font-semibold">HAVE A SPECIFIC QUESTION?</span>
            <h3 className="font-display text-3xl sm:text-4xl text-fg font-normal">
              SPEAK DIRECTLY WITH OUR TEAM
            </h3>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shrink-0 shadow-md"
            data-cursor="INQUIRE"
          >
            <span>SEND AN ENQUIRY →</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Shell>
    </main>
  );
}
