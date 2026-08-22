import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  const iconPath = path.join(process.cwd(), 'public', 'images', 'logo-emblem-square.png');
  let base64Image = '';

  try {
    const fileBuffer = fs.readFileSync(iconPath);
    base64Image = `data:image/png;base64,${fileBuffer.toString('base64')}`;
  } catch {
    // Fallback if file read fails during edge compilation
  }

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
        }}
      >
        {base64Image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={base64Image}
            alt="The Picture Square Logo Mark"
            width={26}
            height={26}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <div
            style={{
              width: '20px',
              height: '24px',
              backgroundColor: '#84683D',
              borderRadius: '2px',
            }}
          />
        )}
      </div>
    ),
    {
      ...size,
    }
  );
}
