import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-sanity-webhook-secret');

    // 1. Verify webhook secret
    if (process.env.SANITY_REVALIDATE_SECRET && secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    const body = await req.json();
    const { _type, slug, tags } = body;

    console.log(`🔄 [SANITY REVALIDATION] Document updated: ${_type} (slug: ${slug?.current || 'N/A'})`);

    // 2. Revalidate paths based on document type
    if (_type === 'story') {
      if (slug?.current) {
        revalidatePath(`/stories/${slug.current}`);
      }
      revalidatePath('/stories');
      revalidatePath('/planners'); // Story vendor credits auto-populate planners
      revalidatePath('/search');
      revalidatePath('/search-index.json');

      if (Array.isArray(tags)) {
        tags.forEach((tag: string) => {
          revalidatePath(`/stories/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`);
        });
      }
    } else if (_type === 'preWedding') {
      if (slug?.current) {
        revalidatePath(`/pre-weddings/${slug.current}`);
      }
      revalidatePath('/pre-weddings');
      revalidatePath('/planners');
      revalidatePath('/search');
      revalidatePath('/search-index.json');

      if (Array.isArray(tags)) {
        tags.forEach((tag: string) => {
          revalidatePath(`/pre-weddings/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`);
        });
      }
    } else if (_type === 'film') {
      revalidatePath('/films');
      revalidatePath('/search');
      revalidatePath('/search-index.json');
    } else if (_type === 'photobook') {
      if (slug?.current) {
        revalidatePath(`/photobooks/${slug.current}`);
      }
      revalidatePath('/photobooks');
      revalidatePath('/search');
    } else if (_type === 'planner') {
      revalidatePath('/planners');
    } else if (_type === 'faqItem') {
      revalidatePath('/faq');
    } else if (_type === 'siteSettings' || _type === 'testimonial') {
      revalidatePath('/');
      revalidatePath('/about');
      revalidatePath('/contact');
      revalidatePath('/services');
    }

    // Always revalidate global sitemap
    revalidatePath('/sitemap.xml');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      document: { _type, slug: slug?.current },
    });
  } catch (err: any) {
    console.error('Error during on-demand revalidation:', err);
    return NextResponse.json({ message: 'Revalidation error', error: err?.message }, { status: 500 });
  }
}
