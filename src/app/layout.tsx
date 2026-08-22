import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import LenisProvider from "@/components/providers/lenis-provider";
import { Navbar } from "@/components/layout/Navbar";
import { GlobalFooter } from "@/components/layout/GlobalFooter";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

/* ----------------------------------------------------------------
   FONTS — loaded via next/font, exposed as CSS variables on <html>
   ---------------------------------------------------------------- */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

/* ----------------------------------------------------------------
   GLOBAL METADATA — per-page metadata overrides via page exports
   ---------------------------------------------------------------- */
export const metadata: Metadata = {
  title: {
    default:
      "THE PICTURE SQUARE — Editorial Wedding & Film Studio | Mathura, India",
    template: "%s | THE PICTURE SQUARE",
  },
  description:
    "Editorial wedding photography and 4K cinema studio in Mathura, Uttar Pradesh, documenting royal palace and destination celebrations across India.",
  metadataBase: new URL("https://thepicturesquare.com"),
  alternates: {
    canonical: "https://thepicturesquare.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "THE PICTURE SQUARE",
    images: [{ url: "/images/hero-wedding.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE PICTURE SQUARE — Editorial Wedding & Film Studio",
    description:
      "Editorial wedding photography and 4K cinema studio in Mathura, Uttar Pradesh.",
    images: ["/images/hero-wedding.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

/* ----------------------------------------------------------------
   ROOT LAYOUT & LOCALBUSINESS JSON-LD
   ---------------------------------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootJsonLd = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    image: "https://thepicturesquare.com/images/hero-wedding.jpg",
    logo: "https://thepicturesquare.com/images/logo.png",
    url: "https://thepicturesquare.com",
    telephone: SITE_CONFIG.phoneE164,
    email: SITE_CONFIG.contact.email,
    priceRange: "₹₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.locality,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    areaServed: SITE_CONFIG.areaServed.map((city) => ({
      "@type": "AdministrativeArea",
      name: city,
    })),
    sameAs: [
      SITE_CONFIG.googleMapsUrl,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.facebook,
    ],
  };

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <head>
        <meta name="theme-color" content="#F6F4EE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg antialiased overflow-x-hidden font-sans relative">
        {/* Accessible Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-accent-text focus:text-fg-inverse focus:font-semibold focus:text-meta focus:rounded-sm focus:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-text"
        >
          Skip to main content
        </a>

        <LenisProvider>
          {/* Film Grain Texture Overlay — z-index 40 */}
          <div className="film-grain" aria-hidden="true" />

          {/* Magnetic Contextual Custom Cursor */}
          <CustomCursor />

          {/* Global Editorial Navbar */}
          <Navbar />

          {/* Page content */}
          <div id="main-content" tabIndex={-1} className="min-h-[80vh] outline-none">
            {children}
          </div>

          {/* Global Shell Footer */}
          <GlobalFooter />

          {/* Privacy Consent Banner */}
          <ConsentBanner />
        </LenisProvider>
      </body>
    </html>
  );
}
