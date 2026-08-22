import { MetadataRoute } from 'next';
import {
  getStories,
  getPreWeddings,
  getPhotobooks,
  getAllTags,
  getPreWeddingTags,
} from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thepicturesquare.com';

  // 1. Static Pages
  const staticRoutes = [
    '',
    '/stories',
    '/pre-weddings',
    '/films',
    '/images',
    '/photobooks',
    '/planners',
    '/services',
    '/about',
    '/faq',
    '/contact',
    '/search',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Fetch all collections & dynamic tags
  const [stories, preWeddings, photobooks, storyTags, preWeddingTags] = await Promise.all([
    getStories(),
    getPreWeddings(),
    getPhotobooks(),
    getAllTags(),
    getPreWeddingTags(),
  ]);

  // 3. Story Detail Routes
  const storyRoutes = stories.map((s) => ({
    url: `${baseUrl}/stories/${s.slug}`,
    lastModified: new Date(s.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 4. Pre-Wedding Detail Routes
  const preWeddingRoutes = preWeddings.map((pw) => ({
    url: `${baseUrl}/pre-weddings/${pw.slug}`,
    lastModified: new Date(pw.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 5. Photobook Detail Routes
  const photobookRoutes = photobooks.map((pb) => ({
    url: `${baseUrl}/photobooks/${pb.slug}`,
    lastModified: new Date(pb.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 6. Story Tag Routes
  const storyTagRoutes = storyTags.map((tag) => ({
    url: `${baseUrl}/stories/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 7. Pre-Wedding Tag Routes
  const preWeddingTagRoutes = preWeddingTags.map((tag) => ({
    url: `${baseUrl}/pre-weddings/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...storyRoutes,
    ...preWeddingRoutes,
    ...photobookRoutes,
    ...storyTagRoutes,
    ...preWeddingTagRoutes,
  ];
}
