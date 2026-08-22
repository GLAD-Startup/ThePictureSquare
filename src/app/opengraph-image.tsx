import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'The Picture Square — Editorial Wedding & Film Studio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
            MATHURA · AGRA · RAJASTHAN · DESTINATIONS
          </span>
        </div>

        {/* Center Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
          <span
            style={{
              fontSize: '60px',
              color: '#141413',
              lineHeight: 1.1,
              fontWeight: 400,
            }}
          >
            Editorial Wedding Photography &amp; 4K Documentary Cinema
          </span>

          <span
            style={{
              fontSize: '24px',
              color: '#84683D',
              fontStyle: 'italic',
            }}
          >
            Documenting sacred rituals and timeless love across generations
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
            ESTABLISHED 2000 · BRAJ HERITAGE
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
