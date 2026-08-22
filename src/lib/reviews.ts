import fs from 'fs';
import path from 'path';
import { SITE_CONFIG } from '@/lib/site-config';

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  relativeTime: string;
  text: string;
  authorPhotoUrl?: string;
  isLocalGuide?: boolean;
  source: 'Google';
}

export interface GooglePlaceReviewsData {
  rating: number;
  userRatingCount: number;
  placeId: string;
  googleCid?: string;
  googleReviewUrl: string;
  googleMapsUrl: string;
  reviews: Review[];
}

/**
 * Reads local fallback seed reviews from content/testimonials.json
 */
function getFallbackReviews(): GooglePlaceReviewsData {
  try {
    const filePath = path.join(process.cwd(), 'content', 'testimonials.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return data as GooglePlaceReviewsData;
    }
  } catch (err) {
    console.error('[reviews] Error reading fallback testimonials.json:', err);
  }

  // Hardcoded in-memory guarantee if file system read fails
  return {
    rating: 4.9,
    userRatingCount: 33,
    placeId: SITE_CONFIG.googlePlaceId,
    googleCid: SITE_CONFIG.googleCid,
    googleReviewUrl: `https://search.google.com/local/writereview?placeid=${SITE_CONFIG.googlePlaceId}`,
    googleMapsUrl: SITE_CONFIG.googleMapsUrl,
    reviews: [
      {
        id: 'seed-1',
        authorName: 'Pawan Sharma',
        rating: 5,
        relativeTime: '7 months ago',
        text: 'Picture Square Photo Studio is truly outstanding in videography. The video quality is cinematic, editing is flawless, and every moment is captured beautifully. The team is professional, cooperative, and understands exactly what the client wants.',
        isLocalGuide: false,
        source: 'Google',
      },
      {
        id: 'seed-2',
        authorName: 'Avinash Kumar Singh',
        rating: 5,
        relativeTime: '2 years ago',
        text: 'Great work by professional photographers. Complete pre wedding was done in a day and results were outstanding. Looking for working with them again in future.',
        isLocalGuide: true,
        source: 'Google',
      },
      {
        id: 'seed-3',
        authorName: 'Chandan Chauhan',
        rating: 5,
        relativeTime: '3 years ago',
        text: 'Best experience with the picture square photography. Very punctual and cooperative. Team behaviour so good.',
        isLocalGuide: false,
        source: 'Google',
      },
      {
        id: 'seed-4',
        authorName: 'Ashish Kumar',
        rating: 5,
        relativeTime: '5 years ago',
        text: "Amazing work by Picture Square, had good experience in my cousin's wedding, professional and very cooperative team.",
        isLocalGuide: false,
        source: 'Google',
      },
      {
        id: 'seed-5',
        authorName: 'Priya Gaur',
        rating: 5,
        relativeTime: '5 years ago',
        text: "The picture square's team work is so professional. I am very impressed because of their work quality and behaviour.",
        isLocalGuide: false,
        source: 'Google',
      },
    ],
  };
}

/**
 * Filter out unwanted review authors specified in requirements
 */
function shouldExcludeReview(authorName: string): boolean {
  const normalized = authorName.toLowerCase().trim();
  return (
    normalized.includes('manish brother') ||
    normalized.includes('rahul sharma')
  );
}

/**
 * Server-side fetch of Google Places Details.
 * Uses 24-hour ISR cache (`revalidate: 86400`).
 * API key remains strictly server-side.
 * Falls back safely to verified seed set if API is unavailable or returns < 3 reviews.
 */
export async function getGooglePlaceReviews(): Promise<GooglePlaceReviewsData> {
  const fallback = getFallbackReviews();
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = SITE_CONFIG.googlePlaceId;

  if (!apiKey || !placeId) {
    return fallback;
  }

  try {
    // 1. Attempt Google Places Details API (Legacy format)
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=rating,user_ratings_total,reviews&key=${apiKey}`;

    const res = await fetch(url, {
      next: { revalidate: 86400 }, // 24 hours ISR revalidation, <= 30 days cache compliance
    });

    if (!res.ok) {
      console.warn(`[reviews] Google Places API returned status ${res.status}. Using fallback seed.`);
      return fallback;
    }

    const data = await res.json();
    if (data.status !== 'OK' || !data.result) {
      console.warn(`[reviews] Google Places API status: ${data.status}. Using fallback seed.`);
      return fallback;
    }

    const result = data.result;
    const rating = typeof result.rating === 'number' ? result.rating : fallback.rating;
    const userRatingCount =
      typeof result.user_ratings_total === 'number'
        ? result.user_ratings_total
        : fallback.userRatingCount;

    const rawReviews = Array.isArray(result.reviews) ? result.reviews : [];
    const validReviews: Review[] = rawReviews
      .filter((r: { author_name?: string; text?: string }) => {
        if (!r.author_name || !r.text) return false;
        return !shouldExcludeReview(r.author_name);
      })
      .map((r: {
        author_name: string;
        rating?: number;
        relative_time_description?: string;
        text: string;
        profile_photo_url?: string;
      }, index: number) => ({
        id: `google-${index}-${r.author_name.replace(/\s+/g, '-').toLowerCase()}`,
        authorName: r.author_name,
        rating: typeof r.rating === 'number' ? r.rating : 5,
        relativeTime: r.relative_time_description || 'recently',
        text: r.text,
        authorPhotoUrl: r.profile_photo_url,
        isLocalGuide: false,
        source: 'Google' as const,
      }));

    // If fewer than 3 reviews return from API, merge or fall back to seed set
    if (validReviews.length < 3) {
      return {
        ...fallback,
        rating,
        userRatingCount,
      };
    }

    return {
      rating,
      userRatingCount,
      placeId,
      googleReviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
      googleMapsUrl: SITE_CONFIG.googleMapsUrl,
      reviews: validReviews,
    };
  } catch (err) {
    console.error('[reviews] Error fetching Google Places Details:', err);
    return fallback;
  }
}
