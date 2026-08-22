import React from 'react';

/**
 * InstagramSection — Server-side cached real feed integration.
 * Connects to Instagram Basic Display API or Behold feed when environment
 * credentials (INSTAGRAM_ACCESS_TOKEN / BEHOLD_FEED_ID) are configured.
 *
 * If credentials are not present, renders null and logs an advisory,
 * avoiding placeholder or fake portfolio image grids.
 */
export async function InstagramSection() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const beholdId = process.env.BEHOLD_FEED_ID;

  if (!token && !beholdId) {
    if (process.env.NODE_ENV === 'development') {
      // Advisory log in development
      console.info(
        '[InstagramSection] No INSTAGRAM_ACCESS_TOKEN or BEHOLD_FEED_ID provided. Omitting feed per build rules.'
      );
    }
    return null;
  }

  try {
    // If Behold is configured
    if (beholdId) {
      const res = await fetch(`https://feeds.behold.so/${beholdId}`, {
        next: { revalidate: 3600 }, // Hourly server-side cache
      });
      if (!res.ok) return null;
      const posts = await res.json();

      return (
        <section id="instagram" className="py-20 border-t border-rule">
          <div className="max-w-[1560px] mx-auto px-5 sm:px-10 lg:px-[72px] space-y-10">
            <div className="flex items-center justify-between">
              <span className="text-meta text-accent-text">LIVE INSTAGRAM DISPATCHES</span>
              <a
                href="https://www.instagram.com/thepicturesquarephotography/"
                target="_blank"
                rel="noreferrer"
                className="text-meta text-fg-dim hover:text-accent-text uppercase"
              >
                @THEPICTURESQUAREPHOTOGRAPHY →
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.isArray(posts) &&
                posts.slice(0, 6).map((p: { id: string; mediaUrl: string; permalink: string }) => (
                  <a
                    key={p.id}
                    href={p.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="relative aspect-square overflow-hidden rounded-sm bg-bg-raised border border-rule group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.mediaUrl}
                      alt="The Picture Square Instagram Post"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </a>
                ))}
            </div>
          </div>
        </section>
      );
    }
  } catch (err) {
    console.error('[InstagramSection] Failed to fetch live feed:', err);
    return null;
  }

  return null;
}

export default InstagramSection;
