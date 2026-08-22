import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async redirects() {
    return [
      {
        source: '/weddings',
        destination: '/stories',
        permanent: true,
      },
      {
        source: '/stories/a-r',
        destination: '/stories/ananya-rohan',
        permanent: true,
      },
      {
        source: '/wedding-stories',
        destination: '/stories',
        permanent: true,
      },
      {
        source: '/lookbooks',
        destination: '/pre-weddings',
        permanent: true,
      },
      {
        source: '/films/trailers',
        destination: '/films#trailers',
        permanent: true,
      },
      {
        source: '/films/instacuts',
        destination: '/films#instacuts',
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
