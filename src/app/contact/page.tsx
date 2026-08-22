import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { ContactForm } from '@/components/contact/ContactForm';
import { InstagramStrip } from '@/components/contact/InstagramStrip';
import { SITE_CONFIG } from '@/lib/site-config';
import { MapPin, Mail, Phone, ArrowUpRight, Navigation } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Inquiries — The Picture Square | Wedding Photography, Mathura',
  description:
    'Inquire with The Picture Square. We accept a limited number of destination wedding commissions each year across Mathura, Vrindavan, Agra, Rajasthan, and worldwide.',
  alternates: {
    canonical: 'https://thepicturesquare.com/contact',
  },
  openGraph: {
    title: 'Contact & Inquiries — The Picture Square | Wedding Photography, Mathura',
    description:
      'Begin a conversation with our studio team regarding your upcoming wedding celebration.',
    url: 'https://thepicturesquare.com/contact',
  },
};

export default function ContactPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Contact ${SITE_CONFIG.name}`,
      description: 'Inquire for wedding photography commissions and date reservations.',
      url: 'https://thepicturesquare.com/contact',
      mainEntity: {
        '@type': 'PhotographyBusiness',
        name: SITE_CONFIG.name,
        legalName: SITE_CONFIG.legalName,
        email: SITE_CONFIG.contact.email,
        telephone: SITE_CONFIG.phoneE164,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address.street,
          addressLocality: SITE_CONFIG.address.locality,
          addressRegion: SITE_CONFIG.address.region,
          postalCode: SITE_CONFIG.address.postalCode,
          addressCountry: SITE_CONFIG.address.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SITE_CONFIG.geo.latitude,
          longitude: SITE_CONFIG.geo.longitude,
        },
        sameAs: [
          SITE_CONFIG.googleMapsUrl,
          SITE_CONFIG.social.instagram,
          SITE_CONFIG.social.youtube,
          SITE_CONFIG.social.facebook,
        ],
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
          name: 'Contact',
          item: 'https://thepicturesquare.com/contact',
        },
      ],
    },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-24">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. LETTER FIRST — SectionHead + Four Paragraphs + Founder Signature */}
      <Shell>
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <SectionHead
            as="h1"
            title="CONTACT"
            eyebrow="COMMISSION INQUIRIES"
            align="center"
          />

          {/* Four Short Paragraphs */}
          <div className="max-w-[62ch] mx-auto space-y-6 text-body text-fg font-normal leading-[1.85] text-base sm:text-lg text-center sm:text-left">
            <p>
              We believe the strongest photographs happen when there is mutual trust and shared aesthetic resonance between a couple and their visual team. For this reason, we take on a strictly limited number of commissions each season.
            </p>

            <p className="text-fg-dim">
              When writing to us, please tell us as much as you know about your celebration: the dates, the venues, the sequence of rituals, and the atmosphere you are envisioning for your guests.
            </p>

            <p className="text-fg-dim">
              We especially love hearing the personal story—how you two met, where your families are gathering from, and what parts of the wedding day matter most deeply to you.
            </p>

            <p className="text-fg-dim">
              Every inquiry is read personally by our principal directors. We look forward to connecting with you and exploring how we can preserve your wedding story.
            </p>

            {/* Signed Founder Line */}
            <div className="pt-6 border-t border-rule text-center sm:text-right">
              <p className="font-display text-3xl sm:text-4xl italic text-accent-text font-normal">
                — Deepanshu
              </p>
              <span className="text-meta-sm text-fg-dim uppercase tracking-[0.20em] block mt-1">
                Founder &amp; Principal Visual Director · The Picture Square, Mathura
              </span>
            </div>
          </div>
        </div>
      </Shell>

      {/* 2. STUDIO BLOCK — Three Hairline-Separated Columns */}
      <Shell>
        <div className="space-y-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 sm:p-12 rounded-sm bg-bg-raised border border-rule font-sans text-sm divide-y md:divide-y-0 md:divide-x divide-rule shadow-[0_10px_30px_rgba(20,20,19,0.04)]">
            {/* Col 1: Studio Location */}
            <div className="space-y-3 pb-6 md:pb-0 md:pr-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-accent-text font-semibold uppercase text-meta-sm">
                <MapPin size={15} />
                <span>STUDIO ATELIER</span>
              </div>
              <p className="font-display text-2xl text-fg">
                Mathura, Uttar Pradesh
              </p>
              <p className="text-fg-dim text-xs uppercase leading-relaxed">
                {SITE_CONFIG.address.formatted}
              </p>
              <div className="pt-1">
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent-text hover:text-fg font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>VIEW ON GOOGLE MAPS</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Col 2: Direct Desk & Email */}
            <div className="space-y-3 py-6 md:py-0 md:px-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-accent-text font-semibold uppercase text-meta-sm">
                <Mail size={15} />
                <span>COMMISSION DESK</span>
              </div>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="font-display text-2xl text-fg hover:text-accent-text transition-colors block break-words"
              >
                {SITE_CONFIG.contact.email}
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2 text-fg-dim text-xs uppercase">
                <Phone size={13} className="text-accent-text" />
                <a
                  href={`tel:${SITE_CONFIG.phoneE164}`}
                  className="hover:text-fg transition-colors"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Col 3: Messaging & Social */}
            <div className="space-y-3 pt-6 md:pt-0 md:pl-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-accent-text font-semibold uppercase text-meta-sm">
                <Navigation size={15} />
                <span>SERVICE REGIONS</span>
              </div>
              <p className="font-display text-2xl text-fg">
                Braj &amp; Destinations
              </p>
              <p className="text-fg-dim text-xs uppercase leading-relaxed">
                {SITE_CONFIG.areaServed.join(' · ')}
              </p>
            </div>
          </div>

          {/* Google Maps Interactive Location Card */}
          <div className="overflow-hidden rounded-sm bg-bg-sunken border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.04)]">
            <div className="relative w-full h-[320px] sm:h-[380px]">
              <iframe
                title="The Picture Square Studio Location in Mathura"
                src="https://maps.google.com/maps?q=The+Picture+Square+Shri+Square+Complex+Mathura&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full border-0 filter grayscale-[20%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 z-10 p-3 sm:p-4 bg-bg-raised/95 backdrop-blur-md rounded-sm border border-rule shadow-md max-w-xs font-sans text-xs">
                <span className="text-meta-sm text-accent-text font-semibold uppercase block mb-1">
                  STUDIO HEADQUARTERS
                </span>
                <p className="font-semibold text-fg text-sm">The Picture Square</p>
                <p className="text-fg-dim text-[11px] mt-0.5 leading-snug">
                  Shop No. 229, Shri Square Complex, in front of Shri Radha Puram, Mathura
                </p>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-accent-text hover:text-fg font-semibold uppercase tracking-wider transition-colors text-[11px]"
                >
                  <span>GET DIRECTIONS</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Shell>

      {/* 3. FORM SECOND — 7 Columns Desktop Layout */}
      <Shell>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-meta text-accent-text block uppercase font-semibold">
              COMMISSION INQUIRY FORM
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-fg font-normal">
              RESERVE YOUR CELEBRATION DATES
            </h2>
          </div>

          <Suspense fallback={<div className="py-20 text-center text-meta text-accent-text">LOADING INQUIRY FORM...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </Shell>

      {/* 4. REAL INSTAGRAM STRIP BELOW */}
      <Shell>
        <InstagramStrip />
      </Shell>
    </main>
  );
}
