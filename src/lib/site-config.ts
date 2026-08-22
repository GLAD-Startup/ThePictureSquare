/**
 * Site-wide configuration and metadata constants.
 * Single source of truth for business NAP (Name, Address, Phone), branding,
 * Google Business Profile data, social handles, and navigation.
 *
 * NOTE: Use "The Picture Square" exactly everywhere for NAP consistency.
 */

export interface NavItem {
  name: string;
  path: string;
}

export const SITE_CONFIG = {
  name: 'The Picture Square',
  legalName: 'The Picture Square',
  category: 'Wedding photographer',
  wordmark: 'THE PICTURE SQUARE',
  tagline: 'EDITORIAL WEDDING & FILM STUDIO',
  cityTag: 'MATHURA, IN',

  address: {
    street: 'Shop No. 229, Shri Square Complex, in front of Shri Radha Puram',
    locality: 'Mathura',
    region: 'Uttar Pradesh',
    postalCode: '281001',
    country: 'IN',
    formatted:
      'Shop No. 229, Shri Square Complex, in front of Shri Radha Puram, Mathura, Uttar Pradesh 281001, India',
    line1: 'Shop No. 229, Shri Square Complex, in front of Shri Radha Puram',
    city: 'Mathura',
    state: 'Uttar Pradesh',
  },

  phoneDisplay: '+91 99581 26122',
  phoneE164: '+919958126122',

  // Google Business Profile & Maps identifiers
  googleCid: '0xf63f101f60651b9',
  googlePlaceId: 'ChIJyVpA8B88DTkRuVFGYAEPYw8', // Resolved via Google Places for The Picture Square Mathura
  googleMapsUrl: 'https://maps.google.com/?cid=0xf63f101f60651b9',
  googleReviewUrl: 'https://maps.google.com/?cid=0xf63f101f60651b9',

  // Geographic coordinates for Mathura studio location (Radha Puram corridor)
  geo: {
    latitude: 27.5091,
    longitude: 77.6478,
  },

  areaServed: [
    'Mathura',
    'Vrindavan',
    'Agra',
    'Delhi NCR',
    'Jaipur',
    'Udaipur',
  ],

  // TODO Constants - Awaiting client confirmation (tracked in TODO.md)
  // 1. TODO: Confirm official direct email address with client
  TODO_CONFIRM_STUDIO_EMAIL: 'inquiries@thepicturesquare.com',
  // 2. TODO: Confirm whether +91 99581 26122 is WhatsApp-enabled
  TODO_CONFIRM_WHATSAPP_ENABLED: true,
  // 3. TODO: Confirm full weekly opening hours schedule (Google listing shows only 'Closes 9 pm')
  TODO_CONFIRM_WEEKLY_OPENING_HOURS: null,

  contact: {
    email: 'inquiries@thepicturesquare.com', // TODO: Client to confirm official studio inbox
    phone: '+919958126122',
    phoneDisplay: '+91 99581 26122',
  },

  domain: 'https://thepicturesquare.com',
  domainDisplay: 'WWW.THEPICTURESQUARE.COM',

  social: {
    instagram: 'https://www.instagram.com/thepicturesquarephotography/',
    youtube: 'https://www.youtube.com/@thepicturesquare', // TODO: Verify channel URL
    facebook: 'https://www.facebook.com/thepicturesquare', // TODO: Verify page URL
  },

  stats: {
    annualCap: '25', // TODO: Client to confirm annual commission cap
    annualCapLabel: 'COMMISSIONS / YEAR',
    annualCapSub: 'STRICTLY LIMITED TO PRESERVE MONOGRAPH ARTISTRY',

    regions: '15+', // TODO: Client to verify destination region count
    regionsLabel: 'HERITAGE REGIONS',
    regionsSub: 'SPECIALIZING IN BRAJ, AGRA & RAJASTHAN DESTINATIONS',

    craftPurity: '100%',
    craftPurityLabel: 'IN-HOUSE CRAFT',
    craftPuritySub: 'ZERO OUTSOURCED EDITING OR ASSOCIATE CREWS',
  },

  founder: {
    name: 'Deepanshu',
    title: 'Founder & Principal Visual Director',
    city: 'Mathura, Uttar Pradesh',
  },
};

/**
 * Header utility navigation links.
 */
export const HEADER_NAV_LINKS: NavItem[] = [
  { name: 'STORIES', path: '/stories' },
  { name: 'PHOTOBOOKS', path: '/photobooks' },
  { name: 'IMAGES', path: '/images' },
  { name: 'FILMS', path: '/films' },
  { name: 'PRE-WEDDINGS', path: '/pre-weddings' },
  { name: 'SERVICES', path: '/services' },
  { name: 'ABOUT', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'CONTACT', path: '/contact' },
];

export const FOOTER_PAGES_LINKS: NavItem[] = [
  { name: 'STORIES', path: '/stories' },
  { name: 'IMAGES', path: '/images' },
  { name: 'PRE-WEDDINGS', path: '/pre-weddings' },
  { name: 'FILMS', path: '/films' },
  { name: 'PHOTOBOOKS', path: '/photobooks' },
  { name: 'REVIEWS', path: '/reviews' },
  { name: 'PLANNERS', path: '/planners' },
  { name: 'SERVICES', path: '/services' },
  { name: 'ABOUT', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'CONTACT', path: '/contact' },
];
