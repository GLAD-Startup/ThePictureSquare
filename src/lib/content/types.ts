/**
 * Typed Content Layer Definitions
 * The Picture Square
 */

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
};

export type SingleImage = GalleryImage & {
  id: string;
  category: 'PORTRAITS' | 'CEREMONIES' | 'CANDID' | 'DETAILS' | 'CELEBRATIONS';
  location?: string;
};

export type VendorCredit = {
  role: string;
  name: string;
  url?: string;
};

export type ChapterEvent = {
  id: string;
  label: string;
  images: GalleryImage[];
};

export type Story = {
  slug: string;
  title: string;
  couple: string;
  location: string;
  date: string;
  displayDate: string;
  excerpt: string;
  cover: GalleryImage;
  banner: GalleryImage;
  body: string[];
  track?: {
    title: string;
    artist: string;
  };
  events: ChapterEvent[]; // ordered — drives the chapter rail
  credits: VendorCredit[];
  filmUrl?: string;
  tags: string[];
  featured: boolean;
  published: boolean;
};

export type PreWedding = {
  slug: string;
  couple: string;
  location: string;
  date: string;
  displayDate: string;
  excerpt: string;
  cover: GalleryImage;
  banner: GalleryImage;
  body: string[];
  images: GalleryImage[]; // single flat gallery, no chapters
  filmUrl?: string;
  credits: VendorCredit[];
  tags: string[];
  published: boolean;
};

export type Film = {
  id: string;
  kind: 'instacut' | 'trailer' | 'compilation';
  couple: string;
  location: string;
  runtime: string;
  provider: 'youtube' | 'vimeo';
  videoId: string;
  poster: GalleryImage;
  storySlug?: string;
};

export type Photobook = {
  slug: string;
  couple: string;
  date: string;
  pageCount: number;
  binding: string;
  size: string;
  paper?: string;
  description?: string;
  cover: GalleryImage;
  spreads: {
    caption?: string;
    image: GalleryImage;
  }[];
};

export type Track = {
  id: string;
  title: string;
  artists: string[];
  audioUrl: string;
  artwork: GalleryImage;
  durationSec: number;
  downloadable: boolean;
};

export type PlannerCategory =
  | 'PLANNERS'
  | 'DÉCOR'
  | 'VENUES'
  | 'MAKEUP'
  | 'OUTFITS'
  | 'CATERING';

export type Planner = {
  name: string;
  category: PlannerCategory;
  city: string;
  url?: string;
  instagram?: string;
  logo?: string;
};

export type FaqItem = {
  id: string;
  section: string;
  question: string;
  answer: string;
};
