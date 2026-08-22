import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { ImagesExplorer } from '@/components/images/ImagesExplorer';
import { getImages } from '@/lib/content';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Images — The Picture Square | Wedding Photography, Mathura',
  description:
    'Explore the studio’s finest standalone photographs, candid moments, wedding rituals, bridal portraits, and architectural details across Mathura, Vrindavan, Agra, and Rajasthan.',
  alternates: {
    canonical: 'https://thepicturesquare.com/images',
  },
  openGraph: {
    title: 'Images — The Picture Square | Wedding Photography, Mathura',
    description:
      'Curated collection of single frames, unscripted emotions, sacred rituals, and royal portraits.',
    url: 'https://thepicturesquare.com/images',
  },
};

export default async function ImagesPage() {
  const images = await getImages();

  // ImageGallery & BreadcrumbList JSON-LD Schema
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'The Picture Square Curated Image Archive',
      description:
        'Fine art wedding and pre-wedding photography portfolio across Braj and destination celebrations.',
      url: 'https://thepicturesquare.com/images',
      provider: {
        '@type': 'PhotographyBusiness',
        name: 'The Picture Square',
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address.street,
          addressLocality: 'Mathura',
          addressRegion: 'Uttar Pradesh',
          postalCode: '281001',
          addressCountry: 'IN',
        },
      },
      hasPart: images.map((img) => ({
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
          name: 'Images',
          item: 'https://thepicturesquare.com/images',
        },
      ],
    },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-16">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Header */}
      <Shell>
        <div className="space-y-6 text-center max-w-4xl mx-auto pb-4">
          <SectionHead
            as="h1"
            title="IMAGES"
            eyebrow="STANDALONE FRAMES"
            align="center"
          />

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal italic text-fg max-w-3xl mx-auto leading-snug">
            &ldquo;The studio’s finest single frames, uncoupled from sequence and celebrated for light, expression, and architectural form.&rdquo;
          </p>

          <p className="prose-editorial text-fg-dim text-sm max-w-2xl mx-auto">
            From quiet dawn reflections in Mathura temple courtyards to high-spirited royal baraats, these frames distill our visual ethos into singular decisive moments.
          </p>
        </div>
      </Shell>

      {/* 4-Column Progressive Masonry Explorer with Category Filter */}
      <Shell>
        <Suspense fallback={<div className="py-20 text-center text-meta text-accent-text">LOADING CURATED FRAMES...</div>}>
          <ImagesExplorer images={images} />
        </Suspense>
      </Shell>
    </main>
  );
}
