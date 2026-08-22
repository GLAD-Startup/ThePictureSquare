import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F6F4EE',
          borderRadius: '4px',
          border: '1.5px solid #141413',
        }}
      >
        <span
          style={{
            fontSize: '15px',
            fontFamily: 'serif',
            fontWeight: 700,
            color: '#84683D',
            letterSpacing: '-0.05em',
          }}
        >
          TPS
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
