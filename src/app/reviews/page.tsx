import type { Metadata } from 'next';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { StarRating } from '@/components/ui/StarRating';
import { GoogleGlyph } from '@/components/ui/GoogleGlyph';
import { Rule } from '@/components/ui/Rule';
import { getGooglePlaceReviews } from '@/lib/reviews';
import { SITE_CONFIG } from '@/lib/site-config';
import { ArrowUpRight, Star, ExternalLink, MessageSquarePlus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Reviews & Google Feedback — The Picture Square | Wedding Photography, Mathura',
  description:
    'Read verified client testimonials and 5-star Google reviews for The Picture Square. Editorial wedding photography and 4K cinema commissions across India.',
  alternates: {
    canonical: 'https://thepicturesquare.com/reviews',
  },
  openGraph: {
    title: 'Client Reviews & Google Feedback — The Picture Square',
    description:
      'Verified Google reviews and client feedback for wedding photography and 4K film commissions.',
    url: 'https://thepicturesquare.com/reviews',
  },
};

export default async function ReviewsPage() {
  const reviewsData = await getGooglePlaceReviews();
  const { rating, userRatingCount, googleReviewUrl, googleMapsUrl, reviews } = reviewsData;

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
        name: 'Reviews',
        item: 'https://thepicturesquare.com/reviews',
      },
    ],
  };

  return (
    <main className="py-28 sm:py-36 space-y-24">
      {/* Breadcrumbs JSON-LD only (No aggregateRating on third-party reviews per Google guidelines) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Header Section */}
      <Shell>
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <SectionHead
            as="h1"
            title="CLIENT REVIEWS"
            eyebrow="VERIFIED GOOGLE FEEDBACK"
            align="center"
          />

          <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;Honest reflections from families whose sacred celebrations and wedding stories we have preserved.&rdquo;
          </p>
        </div>
      </Shell>

      {/* 2. Rating Summary & "WRITE A REVIEW" CTA Block */}
      <Shell>
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-sm bg-bg-sunken border border-rule shadow-[0_4px_20px_rgba(20,20,19,0.03)] space-y-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            {/* Left: Score & Star Rating */}
            <div className="space-y-3">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <GoogleGlyph size={28} />
                <span className="font-sans text-xs font-bold tracking-widest text-accent-text uppercase">
                  GOOGLE RATING &amp; REVIEWS
                </span>
              </div>

              <div className="flex items-baseline justify-center sm:justify-start gap-4">
                <span className="font-display text-5xl sm:text-6xl text-fg font-normal">
                  {rating.toFixed(1)}
                </span>
                <div className="space-y-1">
                  <StarRating rating={rating} size={18} />
                  <p className="text-meta-sm text-fg-dim font-medium">
                    Based on {userRatingCount} verified Google reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.20em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md cursor-pointer"
                data-cursor="REVIEW"
              >
                <MessageSquarePlus size={16} />
                <span>WRITE A REVIEW</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-rule hover:border-accent bg-bg-raised text-fg hover:text-accent-text text-meta font-semibold uppercase tracking-[0.20em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer"
              >
                <span>OPEN MAPS</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </Shell>

      {/* 3. Vertical List of Reviews with Hairline Separators */}
      <Shell>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex items-center justify-between border-b border-rule pb-4 font-sans">
            <span className="text-meta text-accent-text font-semibold uppercase">
              PUBLISHED REVIEWS ({reviews.length})
            </span>
            <span className="text-meta-sm text-fg-dim">
              SORTED CHRONOLOGICALLY VIA GOOGLE PLACES
            </span>
          </div>

          <div className="space-y-12">
            {reviews.map((review, idx) => (
              <div key={review.id} className="space-y-6">
                <div className="p-8 sm:p-10 rounded-sm bg-bg-raised border border-rule shadow-[0_4px_20px_rgba(20,20,19,0.02)] space-y-6 group hover:border-accent transition-colors duration-300">
                  {/* Top Bar: Stars + Source */}
                  <div className="flex items-center justify-between">
                    <StarRating rating={review.rating} size={15} />

                    <div className="flex items-center gap-2 text-meta-sm text-fg-dim">
                      <GoogleGlyph size={14} />
                      <span className="font-semibold">Google Review</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-body text-fg font-normal leading-[1.8] text-base sm:text-lg">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Reviewer Meta */}
                  <div className="pt-4 border-t border-rule/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-bg-sunken border border-rule flex items-center justify-center font-display text-lg text-accent-text font-normal">
                        {review.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-sans text-meta text-fg font-semibold uppercase tracking-wider">
                            {review.authorName}
                          </h3>
                          {review.isLocalGuide && (
                            <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent-text text-[10px] font-bold tracking-widest uppercase">
                              LOCAL GUIDE
                            </span>
                          )}
                        </div>
                        <span className="text-meta-sm text-fg-dim block">
                          {review.relativeTime.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-meta-sm text-accent-text hover:text-fg font-semibold uppercase tracking-wider inline-flex items-center gap-1 self-start sm:self-center transition-colors"
                    >
                      <span>VIEW ON GOOGLE</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>

                {idx < reviews.length - 1 && <Rule />}
              </div>
            ))}
          </div>
        </div>
      </Shell>

      {/* 4. Bottom Conversation Call to Action */}
      <Shell>
        <div className="py-16 border-t border-rule text-center max-w-3xl mx-auto space-y-6">
          <span className="text-meta text-accent-text block font-semibold uppercase">
            PLANNING YOUR WEDDING?
          </span>

          <h3 className="font-display text-4xl sm:text-5xl text-fg font-normal">
            EXPERIENCE OUR COMMISSIONS FIRSTHAND
          </h3>

          <p className="prose-editorial text-fg-dim mx-auto">
            Explore our published monographs or begin a conversation with our studio desk in Mathura.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-sans">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md"
              data-cursor="INQUIRE"
            >
              <span>INQUIRE ABOUT DATES →</span>
              <ArrowUpRight size={16} />
            </Link>

            <Link
              href="/stories"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-rule hover:border-accent text-fg hover:text-accent-text text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
            >
              <span>EXPLORE STORIES</span>
            </Link>
          </div>
        </div>
      </Shell>
    </main>
  );
}
