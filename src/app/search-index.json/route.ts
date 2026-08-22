import { NextResponse } from 'next/server';
import { generateSearchIndex } from '@/lib/search';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const searchIndex = await generateSearchIndex();
  return NextResponse.json(searchIndex, {
    headers: {
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
