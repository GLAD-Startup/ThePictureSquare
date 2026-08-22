import React from 'react';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { ParallaxFrame } from '@/components/ui/ParallaxFrame';
import { ArrowUpRight } from 'lucide-react';
import { getFeaturedStories, Story } from '@/lib/content';

interface SelectedStoriesProps {
  initialStories?: Story[];
}

export async function SelectedStories({ initialStories }: SelectedStoriesProps = {}) {
  const stories = initialStories || (await getFeaturedStories());
  const displayStories = stories.slice(0, 3);

  return (
    <section id="stories" className="relative w-full py-20 sm:py-28 lg:py-32 space-y-16">
      <Shell>
        <div className="space-y-16">
          {/* SectionHead Recurring Device */}
          <SectionHead title="STORIES" eyebrow="FEATURED ARCHIVE" />

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {displayStories.map((story, idx) => (
              <div
                key={story.slug}
                className="group relative flex flex-col space-y-5"
                data-cursor="VIEW STORY"
              >
                <Link
                  href={`/stories/${story.slug}`}
                  className="block focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none rounded-sm"
                  aria-label={`Read story: ${story.couple} — ${story.location}`}
                >
                  {/* 4:5 Parallax Frame with Subtle Intensity */}
                  <div className="relative w-full overflow-hidden rounded-none shadow-[0_10px_30px_rgba(20,20,19,0.04)]">
                    <ParallaxFrame
                      src={story.cover.src}
                      alt={story.cover.alt}
                      width={story.cover.width}
                      height={story.cover.height}
                      aspect="4/5"
                      intensity="subtle"
                      focalY={40}
                      className="w-full"
                    />

                    {/* Number Badge */}
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-bg-raised/90 backdrop-blur-md rounded-full border border-rule pointer-events-none">
                      <span className="text-meta-sm text-accent-text font-semibold">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Text Details Below Card */}
                  <div className="space-y-2 pt-3 border-b border-rule pb-4">
                    {/* "Couple — City, Country" in .text-meta */}
                    <span className="text-meta text-accent-text block">
                      {story.couple} — {story.location}
                    </span>

                    {/* Title in display face with accent underline animation on group hover */}
                    <h3 className="font-display text-2xl sm:text-[1.75rem] text-fg font-normal leading-snug group-hover:text-accent-text transition-colors relative inline-block">
                      <span>{story.title}</span>
                      <span
                        className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ease-[cubic-bezier(0.23,1,0.32,1)]"
                        aria-hidden="true"
                      />
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* VIEW ALL STORIES link below */}
          <div className="text-center pt-6">
            <Link
              href="/stories"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-rule text-fg hover:border-accent hover:text-accent-text font-sans text-meta transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
              data-cursor="ALL STORIES"
            >
              <span>VIEW ALL STORIES</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </Shell>
    </section>
  );
}

export default SelectedStories;
