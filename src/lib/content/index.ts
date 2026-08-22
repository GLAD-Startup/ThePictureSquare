import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  Story,
  PreWedding,
  Film,
  Photobook,
  Track,
  Planner,
  PlannerCategory,
  FaqItem,
  SingleImage,
  GalleryImage,
} from './types';
import {
  StorySchema,
  PreWeddingSchema,
  FilmSchema,
  PhotobookSchema,
  TrackSchema,
  PlannerSchema,
  FaqItemSchema,
  SingleImageSchema,
  validateRecord,
} from './schemas';
import { sanityClient, isSanityConfigured } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';

// Re-export all types
export * from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// Helper to convert Sanity image object to GalleryImage
function mapSanityImage(img: any, fallbackAlt: string = ''): GalleryImage {
  if (!img) {
    return {
      src: '/images/hero-wedding.jpg',
      width: 1200,
      height: 800,
      alt: fallbackAlt || 'The Picture Square Photograph',
    };
  }

  const src = img.asset?.url || (img._type === 'image' ? urlForImage(img).url() : img.src) || '/images/hero-wedding.jpg';
  const width = img.asset?.metadata?.dimensions?.width || img.width || 1200;
  const height = img.asset?.metadata?.dimensions?.height || img.height || 800;
  const alt = img.alt || fallbackAlt || 'The Picture Square Wedding Photograph';

  return {
    src,
    width,
    height,
    alt,
    blurDataURL: img.asset?.metadata?.lqip || img.blurDataURL,
  };
}

/* ------------------------------------------------------------------
 * 1. STORIES
 * ------------------------------------------------------------------ */

export async function getStories(): Promise<Story[]> {
  // 1. Fetch from Sanity CMS if configured
  if (isSanityConfigured) {
    try {
      const query = `*[_type == "story" && published == true] | order(date desc) {
        "slug": slug.current,
        title,
        couple,
        location,
        date,
        displayDate,
        excerpt,
        cover,
        banner,
        body,
        track,
        events[] {
          id,
          label,
          images[]
        },
        credits[] {
          role,
          name,
          url
        },
        filmUrl,
        tags,
        featured,
        published
      }`;
      const sanityStories = await sanityClient.fetch(query);
      if (sanityStories && sanityStories.length > 0) {
        return sanityStories.map((s: any) => ({
          ...s,
          cover: mapSanityImage(s.cover, `${s.couple} Wedding Cover`),
          banner: mapSanityImage(s.banner, `${s.couple} Wedding Banner`),
          events: (s.events || []).map((ev: any) => ({
            id: ev.id,
            label: ev.label,
            images: (ev.images || []).map((img: any) => mapSanityImage(img)),
          })),
        }));
      }
    } catch (err) {
      console.warn('⚠️ Sanity fetch failed, falling back to local files:', err);
    }
  }

  // 2. Local MDX Fallback
  const dirPath = path.join(CONTENT_DIR, 'stories');
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const stories = files.map((filename) => {
    const filePath = path.join(dirPath, filename);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent);

    const bodyParagraphs = content
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const rawStory = {
      ...data,
      body: data.body && Array.isArray(data.body) ? data.body : bodyParagraphs,
    };

    return validateRecord(StorySchema, rawStory, 'stories', data.slug || filename);
  });

  return stories
    .filter((s) => s.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getStory(slug: string): Promise<Story | null> {
  const allStories = await getStories();
  return allStories.find((s) => s.slug === slug) || null;
}

export async function getFeaturedStories(): Promise<Story[]> {
  const stories = await getStories();
  const featured = stories.filter((s) => s.featured);
  return featured.length > 0 ? featured : stories.slice(0, 3);
}

export async function getAdjacentStories(
  currentSlug: string
): Promise<{ prev: Story | null; next: Story | null }> {
  const stories = await getStories();
  const index = stories.findIndex((s) => s.slug === currentSlug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = index > 0 ? stories[index - 1] : null;
  const next = index < stories.length - 1 ? stories[index + 1] : null;

  return { prev, next };
}

export async function getAllTags(): Promise<string[]> {
  const stories = await getStories();
  const tagSet = new Set<string>();

  stories.forEach((story) => {
    story.tags?.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

/* ------------------------------------------------------------------
 * 2. PRE-WEDDINGS
 * ------------------------------------------------------------------ */

export async function getPreWeddings(): Promise<PreWedding[]> {
  if (isSanityConfigured) {
    try {
      const query = `*[_type == "preWedding" && published == true] | order(date desc) {
        "slug": slug.current,
        couple,
        location,
        date,
        displayDate,
        excerpt,
        cover,
        banner,
        body,
        images[],
        filmUrl,
        credits,
        tags,
        published
      }`;
      const sanityPreWeddings = await sanityClient.fetch(query);
      if (sanityPreWeddings && sanityPreWeddings.length > 0) {
        return sanityPreWeddings.map((pw: any) => ({
          ...pw,
          cover: mapSanityImage(pw.cover, `${pw.couple} Pre-Wedding Cover`),
          banner: mapSanityImage(pw.banner, `${pw.couple} Pre-Wedding Banner`),
          images: (pw.images || []).map((img: any) => mapSanityImage(img)),
        }));
      }
    } catch (err) {
      console.warn('⚠️ Sanity preWedding fetch failed, falling back to local files:', err);
    }
  }

  const dirPath = path.join(CONTENT_DIR, 'pre-weddings');
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const items = files.map((filename) => {
    const filePath = path.join(dirPath, filename);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent);

    const bodyParagraphs = content
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const raw = {
      ...data,
      body: data.body && Array.isArray(data.body) ? data.body : bodyParagraphs,
    };

    return validateRecord(PreWeddingSchema, raw, 'pre-weddings', data.slug || filename);
  });

  return items
    .filter((pw) => pw.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPreWedding(slug: string): Promise<PreWedding | null> {
  const all = await getPreWeddings();
  return all.find((pw) => pw.slug === slug) || null;
}

export async function getAdjacentPreWeddings(
  currentSlug: string
): Promise<{ prev: PreWedding | null; next: PreWedding | null }> {
  const items = await getPreWeddings();
  const index = items.findIndex((pw) => pw.slug === currentSlug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = index > 0 ? items[index - 1] : null;
  const next = index < items.length - 1 ? items[index + 1] : null;

  return { prev, next };
}

export async function getPreWeddingTags(): Promise<string[]> {
  const items = await getPreWeddings();
  const tagSet = new Set<string>();

  items.forEach((item) => {
    item.tags?.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export async function getPreWeddingForCouple(coupleName: string): Promise<PreWedding | null> {
  const items = await getPreWeddings();
  const cleanName = coupleName.toLowerCase().replace(/[^a-z]/g, '');
  return (
    items.find((pw) => {
      const pwClean = pw.couple.toLowerCase().replace(/[^a-z]/g, '');
      return pwClean.includes(cleanName) || cleanName.includes(pwClean);
    }) || null
  );
}

export async function getStoryForCouple(coupleName: string): Promise<Story | null> {
  const stories = await getStories();
  const cleanName = coupleName.toLowerCase().replace(/[^a-z]/g, '');
  return (
    stories.find((s) => {
      const sClean = s.couple.toLowerCase().replace(/[^a-z]/g, '');
      return sClean.includes(cleanName) || cleanName.includes(sClean);
    }) || null
  );
}

/* ------------------------------------------------------------------
 * 3. FILMS
 * ------------------------------------------------------------------ */

export async function getFilms(): Promise<Film[]> {
  const filePath = path.join(CONTENT_DIR, 'films', 'films.json');
  if (!fs.existsSync(filePath)) return [];

  const rawJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return rawJson.map((item: unknown, index: number) =>
    validateRecord(FilmSchema, item, 'films', `film-${index}`)
  );
}

/* ------------------------------------------------------------------
 * 4. PHOTOBOOKS
 * ------------------------------------------------------------------ */

export async function getPhotobooks(): Promise<Photobook[]> {
  const dirPath = path.join(CONTENT_DIR, 'photobooks');
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const books = files.map((filename) => {
    const filePath = path.join(dirPath, filename);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(rawContent);

    return validateRecord(PhotobookSchema, data, 'photobooks', data.slug || filename);
  });

  return books.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPhotobook(slug: string): Promise<Photobook | null> {
  const all = await getPhotobooks();
  return all.find((b) => b.slug === slug) || null;
}

/* ------------------------------------------------------------------
 * 5. IMAGES (Curated Standalone Frames)
 * ------------------------------------------------------------------ */

export async function getImages(): Promise<SingleImage[]> {
  const filePath = path.join(CONTENT_DIR, 'images', 'images.json');
  if (!fs.existsSync(filePath)) return [];

  const rawJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return rawJson.map((item: unknown, index: number) =>
    validateRecord(SingleImageSchema, item, 'images', `img-${index}`)
  );
}

/* ------------------------------------------------------------------
 * 6. TRACKS
 * ------------------------------------------------------------------ */

export async function getTracks(): Promise<Track[]> {
  const filePath = path.join(CONTENT_DIR, 'tracks', 'tracks.json');
  if (!fs.existsSync(filePath)) return [];

  const rawJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return rawJson.map((item: unknown, index: number) =>
    validateRecord(TrackSchema, item, 'tracks', `track-${index}`)
  );
}

/* ------------------------------------------------------------------
 * 7. PLANNERS & PARTNERS (Auto-populated from stories & pre-weddings)
 * ------------------------------------------------------------------ */

function categorizeVendorRole(roleStr: string): PlannerCategory {
  const r = roleStr.toLowerCase();
  if (r.includes('plan') || r.includes('event') || r.includes('producer') || r.includes('curat')) return 'PLANNERS';
  if (r.includes('décor') || r.includes('decor') || r.includes('design') || r.includes('floral') || r.includes('sceno')) return 'DÉCOR';
  if (r.includes('venue') || r.includes('palace') || r.includes('fort') || r.includes('hotel') || r.includes('resort') || r.includes('estate')) return 'VENUES';
  if (r.includes('makeup') || r.includes('hair') || r.includes('beauty') || r.includes('mua') || r.includes('styling')) return 'MAKEUP';
  if (r.includes('outfit') || r.includes('couture') || r.includes('lehenga') || r.includes('drape') || r.includes('designer') || r.includes('attire') || r.includes('jewel')) return 'OUTFITS';
  if (r.includes('cater') || r.includes('bar') || r.includes('food') || r.includes('cocktail') || r.includes('banquet')) return 'CATERING';
  return 'PLANNERS';
}

export async function getPlanners(): Promise<Planner[]> {
  const [stories, preWeddings] = await Promise.all([getStories(), getPreWeddings()]);

  const vendorMap = new Map<string, Planner>();

  stories.forEach((story) => {
    story.credits?.forEach((credit) => {
      const key = credit.name.trim().toLowerCase();
      if (!vendorMap.has(key)) {
        vendorMap.set(key, {
          name: credit.name.trim(),
          category: categorizeVendorRole(credit.role),
          city: story.location.split(',')[0].trim(),
          url: credit.url,
        });
      }
    });
  });

  preWeddings.forEach((pw) => {
    pw.credits?.forEach((credit) => {
      const key = credit.name.trim().toLowerCase();
      if (!vendorMap.has(key)) {
        vendorMap.set(key, {
          name: credit.name.trim(),
          category: categorizeVendorRole(credit.role),
          city: pw.location.split(',')[0].trim(),
          url: credit.url,
        });
      }
    });
  });

  const manualPath = path.join(CONTENT_DIR, 'planners', 'planners.json');
  if (fs.existsSync(manualPath)) {
    try {
      const manualData = JSON.parse(fs.readFileSync(manualPath, 'utf-8'));
      if (Array.isArray(manualData.exclude)) {
        manualData.exclude.forEach((nameToExclude: string) => {
          vendorMap.delete(nameToExclude.trim().toLowerCase());
        });
      }
      if (Array.isArray(manualData.additions)) {
        manualData.additions.forEach((addition: Planner) => {
          vendorMap.set(addition.name.trim().toLowerCase(), addition);
        });
      }
    } catch (e) {
      console.error('Failed to read manual planners configuration:', e);
    }
  }

  const result: Planner[] = Array.from(vendorMap.values());
  return result
    .map((p, index) => validateRecord(PlannerSchema, p, 'planners', `planner-${index}`))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/* ------------------------------------------------------------------
 * 8. FAQ
 * ------------------------------------------------------------------ */

export async function getFaq(): Promise<FaqItem[]> {
  const filePath = path.join(CONTENT_DIR, 'faq', 'faq.json');
  if (!fs.existsSync(filePath)) return [];

  const rawJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return rawJson.map((item: unknown, index: number) =>
    validateRecord(FaqItemSchema, item, 'faq', `faq-${index}`)
  );
}
