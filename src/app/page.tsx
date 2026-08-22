import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { WelcomeManifesto } from '@/components/home/WelcomeManifesto';
import { FounderQuote } from '@/components/home/FounderQuote';
import { ThreeBeliefs } from '@/components/home/ThreeBeliefs';
import { SelectedStories } from '@/components/home/SelectedStories';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { InstagramSection } from '@/components/home/InstagramSection';
import { FinalCTA } from '@/components/home/FinalCTA';
import { SectionIndexRail } from '@/components/home/SectionIndexRail';
import { Rule } from '@/components/ui/Rule';
import { getGooglePlaceReviews } from '@/lib/reviews';

export const metadata: Metadata = {
  title: 'THE PICTURE SQUARE — Fine Art Wedding Photography & 4K Cinema Studio | Mathura, India',
  description:
    'Documenting the quiet rituals, laughter, and sacred tears of Braj-region and destination celebrations worldwide with documentary restraint.',
  alternates: {
    canonical: 'https://thepicturesquare.com',
  },
  openGraph: {
    title: 'THE PICTURE SQUARE — Fine Art Wedding & Film Studio',
    description:
      'Fine art wedding photography and 4K cinema studio headquartered in Mathura, Uttar Pradesh.',
    url: 'https://thepicturesquare.com',
    images: [
      {
        url: '/images/hero-wedding.jpg',
        width: 1200,
        height: 1600,
        alt: 'The Picture Square Showreel',
      },
    ],
  },
};

export default async function HomePage() {
  const reviewsData = await getGooglePlaceReviews();

  return (
    <main className="relative">
      {/* Fixed Right-Edge Section Index Rail (>= 1280px) */}
      <SectionIndexRail />

      {/* 1. HERO — Full viewport showreel video with dark bottom scrim */}
      <Hero />

      <Rule />

      {/* 2. WELCOME — SectionHead + 4-line Braj/destination manifesto */}
      <WelcomeManifesto />

      <Rule />

      {/* 3. FOUNDER QUOTE — .text-quote pull quote with decorative mark */}
      <FounderQuote />

      <Rule />

      {/* 4. THREE BELIEFS — Alternating 7-col image / 5-col text blocks */}
      <ThreeBeliefs />

      <Rule />

      {/* 5. SELECTED STORIES — SectionHead + 4:5 featured stories cards */}
      <SelectedStories />

      <Rule />

      {/* 6. WHAT WE OFFER — Ported ServicesSection with explicit grid order */}
      <ServicesSection />

      <Rule />

      {/* 7. TESTIMONIALS — Verified Google Reviews carousel & card */}
      <TestimonialSection data={reviewsData} />

      {/* 8. INSTAGRAM — Real server-side cached feed or silent log */}
      <InstagramSection />

      <Rule />

      {/* 9. ENQUIRE — Trust Strip + Expanding Accent Circle CTA + WhatsApp action */}
      <FinalCTA trustData={reviewsData} />
    </main>
  );
}
