import { z } from 'zod';

const FORBIDDEN_GENERIC_ALTS = ['wedding photo', 'photo', 'image', 'picture', 'wedding image', 'thumbnail'];

export const GalleryImageSchema = z.object({
  src: z.string().min(1, 'Image src is required'),
  width: z.number().positive('Width must be positive'),
  height: z.number().positive('Height must be positive'),
  alt: z
    .string()
    .min(5, 'Descriptive, human-readable alt text is required (minimum 5 characters)')
    .refine(
      (val) => !FORBIDDEN_GENERIC_ALTS.includes(val.trim().toLowerCase()),
      {
        message:
          'Generic placeholder alt text (e.g. "wedding photo", "image") is forbidden. Provide specific descriptive text.',
      }
    ),
  blurDataURL: z.string().optional(),
});

export const SingleImageSchema = GalleryImageSchema.extend({
  id: z.string().min(1),
  category: z.enum(['PORTRAITS', 'CEREMONIES', 'CANDID', 'DETAILS', 'CELEBRATIONS']),
  location: z.string().optional(),
});

export const VendorCreditSchema = z.object({
  role: z.string().min(1),
  name: z.string().min(1),
  url: z.string().url().optional(),
});

export const ChapterEventSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  images: z.array(GalleryImageSchema).min(1, 'Chapter must have at least one image'),
});

export const StorySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  couple: z.string().min(1),
  location: z.string().min(1),
  date: z.string().min(1),
  displayDate: z.string().min(1),
  excerpt: z.string().min(1),
  cover: GalleryImageSchema,
  banner: GalleryImageSchema,
  body: z.array(z.string()).min(1),
  track: z
    .object({
      title: z.string(),
      artist: z.string(),
    })
    .optional(),
  events: z.array(ChapterEventSchema).min(1, 'Story must have at least one chapter event'),
  credits: z.array(VendorCreditSchema).default([]),
  filmUrl: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const PreWeddingSchema = z.object({
  slug: z.string().min(1),
  couple: z.string().min(1),
  location: z.string().min(1),
  date: z.string().min(1),
  displayDate: z.string().min(1),
  excerpt: z.string().min(1),
  cover: GalleryImageSchema,
  banner: GalleryImageSchema,
  body: z.array(z.string()).min(1),
  images: z.array(GalleryImageSchema).min(1, 'Pre-wedding must have at least one image'),
  filmUrl: z.string().optional(),
  credits: z.array(VendorCreditSchema).default([]),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
});

export const FilmSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['instacut', 'trailer', 'compilation']),
  couple: z.string().min(1),
  location: z.string().min(1),
  runtime: z.string().min(1),
  provider: z.enum(['youtube', 'vimeo']),
  videoId: z.string().min(1),
  poster: GalleryImageSchema,
  storySlug: z.string().optional(),
});

export const PhotobookSchema = z.object({
  slug: z.string().min(1),
  couple: z.string().min(1),
  date: z.string().min(1),
  pageCount: z.number().positive(),
  binding: z.string().min(1),
  size: z.string().min(1),
  paper: z.string().optional(),
  description: z.string().optional(),
  cover: GalleryImageSchema,
  spreads: z.array(
    z.object({
      caption: z.string().optional(),
      image: GalleryImageSchema,
    })
  ),
});

export const TrackSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  artists: z.array(z.string()).min(1),
  audioUrl: z.string().min(1),
  artwork: GalleryImageSchema,
  durationSec: z.number().positive(),
  downloadable: z.boolean().default(false),
});

export const PlannerSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['PLANNERS', 'DÉCOR', 'VENUES', 'MAKEUP', 'OUTFITS', 'CATERING']),
  city: z.string().min(1),
  url: z.string().url().optional(),
  instagram: z.string().optional(),
  logo: z.string().optional(),
});

export const FaqItemSchema = z.object({
  id: z.string().min(1),
  section: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
});

/**
 * Validate records with strict errors
 */
export function validateRecord<T>(schema: z.ZodSchema<T>, data: unknown, collectionName: string, id: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const formattedError = JSON.stringify(result.error.format(), null, 2);
    throw new Error(
      `\n❌ [CONTENT LAYER BUILD ERROR] Malformed record in '${collectionName}' (ID: ${id}):\n${formattedError}\n`
    );
  }
  return result.data;
}
