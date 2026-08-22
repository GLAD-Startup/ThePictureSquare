import { ImageResponse } from 'next/og';
import { getStory, getStories } from '@/lib/content';

export const runtime = 'nodejs';
export const alt = 'The Picture Square Wedding Story';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);

  const couple = story ? story.couple : 'Wedding Chronicle';
  const location = story ? story.location : 'Destination Celebration';
  const date = story ? story.displayDate : 'The Picture Square';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          backgroundColor: '#F6F4EE',
          color: '#141413',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Subtle decorative frame line */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid rgba(20, 20, 19, 0.14)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Wordmark */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#84683D',
              fontFamily: 'sans-serif',
              fontWeight: 700,
            }}
          >
            THE PICTURE SQUARE
          </span>

          <span
            style={{
              fontSize: '14px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#63605A',
              fontFamily: 'sans-serif',
              fontWeight: 600,
            }}
          >
            FINE ART WEDDING ARCHIVE
          </span>
        </div>

        {/* Center Couple Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span
            style={{
              fontSize: '68px',
              color: '#141413',
              lineHeight: 1.05,
              fontWeight: 400,
            }}
          >
            {couple}
          </span>

          <span
            style={{
              fontSize: '26px',
              color: '#84683D',
              fontStyle: 'italic',
            }}
          >
            {location}
          </span>
        </div>

        {/* Bottom Details */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(20, 20, 19, 0.14)',
            paddingTop: '20px',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#63605A',
              fontFamily: 'sans-serif',
              fontWeight: 600,
            }}
          >
            {date}
          </span>

          <span
            style={{
              fontSize: '14px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#84683D',
              fontFamily: 'sans-serif',
              fontWeight: 700,
            }}
          >
            WWW.THEPICTURESQUARE.COM
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
