import { getStories, getPreWeddings, getPhotobooks, getFilms } from './content';

export interface SearchItem {
  slug: string;
  type: 'story' | 'pre-wedding' | 'photobook' | 'film';
  title: string;
  couple: string;
  location: string;
  excerpt: string;
  tags: string[];
  cover: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  targetUrl: string;
}

export async function generateSearchIndex(): Promise<SearchItem[]> {
  const [stories, preWeddings, photobooks, films] = await Promise.all([
    getStories(),
    getPreWeddings(),
    getPhotobooks(),
    getFilms(),
  ]);

  const items: SearchItem[] = [];

  // 1. Stories
  stories.forEach((s) => {
    items.push({
      slug: s.slug,
      type: 'story',
      title: s.title,
      couple: s.couple,
      location: s.location,
      excerpt: s.excerpt,
      tags: s.tags || [],
      cover: {
        src: s.cover.src,
        width: s.cover.width,
        height: s.cover.height,
        alt: s.cover.alt,
      },
      targetUrl: `/stories/${s.slug}`,
    });
  });

  // 2. Pre-Weddings
  preWeddings.forEach((pw) => {
    items.push({
      slug: pw.slug,
      type: 'pre-wedding',
      title: `${pw.couple} Pre-Wedding Lookbook`,
      couple: pw.couple,
      location: pw.location,
      excerpt: pw.excerpt,
      tags: pw.tags || [],
      cover: {
        src: pw.cover.src,
        width: pw.cover.width,
        height: pw.cover.height,
        alt: pw.cover.alt,
      },
      targetUrl: `/pre-weddings/${pw.slug}`,
    });
  });

  // 3. Photobooks
  photobooks.forEach((pb) => {
    items.push({
      slug: pb.slug,
      type: 'photobook',
      title: `${pb.couple} Heirloom Monograph`,
      couple: pb.couple,
      location: `${pb.size} · ${pb.binding}`,
      excerpt: pb.description || `Handcrafted lay-flat monograph for ${pb.couple}.`,
      tags: ['photobook', 'heirloom', 'leather', 'cotton rag', 'monograph'],
      cover: {
        src: pb.cover.src,
        width: pb.cover.width,
        height: pb.cover.height,
        alt: pb.cover.alt,
      },
      targetUrl: `/photobooks/${pb.slug}`,
    });
  });

  // 4. Films
  films.forEach((f) => {
    items.push({
      slug: f.id,
      type: 'film',
      title: `${f.couple} — ${f.kind.toUpperCase()}`,
      couple: f.couple,
      location: f.location,
      excerpt: `4K ${f.kind} motion picture recording (${f.runtime}) in ${f.location}.`,
      tags: [f.kind, '4k film', 'cinematography', 'showreel'],
      cover: {
        src: f.poster.src,
        width: f.poster.width,
        height: f.poster.height,
        alt: f.poster.alt,
      },
      targetUrl: `/films#${f.kind}s`,
    });
  });

  return items;
}
