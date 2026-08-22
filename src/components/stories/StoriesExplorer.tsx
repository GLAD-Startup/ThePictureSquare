'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Story } from '@/lib/content/types';
import { Rule } from '@/components/ui/Rule';
import { ArrowUpRight } from 'lucide-react';

interface StoriesExplorerProps {
  stories: Story[];
  allTags: string[];
  currentTag?: string;
}

const ITEMS_PER_PAGE = 8;

export const StoriesExplorer: React.FC<StoriesExplorerProps> = ({
  stories,
  allTags,
  currentTag,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial page from URL query parameter (e.g. ?page=2)
  const initialPageParam = parseInt(searchParams.get('page') || '1', 10);
  const initialPage = isNaN(initialPageParam) || initialPageParam < 1 ? 1 : initialPageParam;

  const [visibleCount, setVisibleCount] = useState<number>(initialPage * ITEMS_PER_PAGE);

  // Sync state if user navigates back/forward
  useEffect(() => {
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    if (!isNaN(pageParam) && pageParam > 0) {
      setVisibleCount(pageParam * ITEMS_PER_PAGE);
    }
  }, [searchParams]);

  const handleLoadMore = () => {
    const newCount = visibleCount + ITEMS_PER_PAGE;
    setVisibleCount(newCount);

    const newPage = Math.ceil(newCount / ITEMS_PER_PAGE);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    // Update query param without triggering full reload so state is shareable
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const displayedStories = stories.slice(0, visibleCount);
  const hasMore = visibleCount < stories.length;

  return (
    <div className="space-y-16">
      {/* ------------------------------------------------------------- */}
      {/* 1. TAG FILTER ROW                                             */}
      {/* ------------------------------------------------------------- */}
      <nav
        aria-label="Story Tags Filter"
        className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 border-b border-rule scrollbar-none select-none"
      >
        <span className="text-meta-sm text-accent-text mr-2 uppercase tracking-widest font-semibold shrink-0">
          FILTER:
        </span>

        <Link
          href="/stories"
          className={`px-4 py-1.5 rounded-full text-meta-sm uppercase transition-all duration-300 shrink-0 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none ${
            !currentTag
              ? 'bg-fg text-fg-inverse font-semibold shadow-sm'
              : 'text-fg-dim hover:text-fg border border-rule hover:border-accent'
          }`}
        >
          ALL ({stories.length})
        </Link>

        {allTags.map((tag) => {
          const isActive =
            currentTag?.toLowerCase() === tag.toLowerCase();
          const tagUrl = `/stories/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`;

          return (
            <Link
              key={tag}
              href={tagUrl}
              className={`px-4 py-1.5 rounded-full text-meta-sm uppercase transition-all duration-300 shrink-0 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none ${
                isActive
                  ? 'bg-fg text-fg-inverse font-semibold shadow-sm'
                  : 'text-fg-dim hover:text-fg border border-rule hover:border-accent'
              }`}
            >
              {tag}
            </Link>
          );
        })}
      </nav>

      {/* ------------------------------------------------------------- */}
      {/* 2. VERTICAL STORIES LIST (ONE STORY PER ROW)                  */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-16">
        {displayedStories.map((story, idx) => {
          const isEven = idx % 2 === 0;

          // Format month + year for bottom-right meta
          const storyDate = new Date(story.date);
          const monthYear = storyDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          });

          return (
            <React.Fragment key={story.slug}>
              {/* EXACTLY ONE <a> WRAPPING THE ENTIRE ROW */}
              <Link
                href={`/stories/${story.slug}`}
                className="group block relative focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-4 focus-visible:ring-offset-bg focus:outline-none rounded-sm"
                aria-label={`Read story: ${story.couple} — ${story.location}`}
                data-cursor="READ STORY"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* 7-Col 4:5 Cover Image with 1px Inset Border & Subtle Ring */}
                  <div
                    className={`order-1 lg:col-span-7 relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-bg-sunken border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.04)] ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <Image
                      src={story.cover.src}
                      alt={story.cover.alt}
                      width={story.cover.width}
                      height={story.cover.height}
                      priority={idx < 2}
                      placeholder={story.cover.blurDataURL ? 'blur' : 'empty'}
                      blurDataURL={story.cover.blurDataURL}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                    />

                    {/* 1px Inset Border & Ring */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
                      aria-hidden="true"
                    />

                    {/* Case Number Marker */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-bg-raised/90 backdrop-blur-md rounded-full border border-rule">
                      <span className="text-meta-sm text-accent-text font-semibold">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* 5-Col Narrative Content */}
                  <div
                    className={`order-2 lg:col-span-5 space-y-6 flex flex-col justify-between h-full ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* "Couple — City, Country" in .text-meta */}
                      <span className="text-meta text-accent-text block">
                        {story.couple} — {story.location}
                      </span>

                      {/* Title in .text-display-md with accent hover color */}
                      <h2 className="text-display-md text-fg font-normal leading-[1.05] group-hover:text-accent-text transition-colors duration-300">
                        {story.title}
                      </h2>

                      {/* Excerpt in .text-body */}
                      <p className="text-body text-fg-dim font-sans leading-[1.75]">
                        {story.excerpt}
                      </p>
                    </div>

                    {/* Footer Row: READ THE STORY as accent-underlined link + Month/Year */}
                    <div className="pt-6 border-t border-rule/80 flex items-center justify-between">
                      {/* Accent-underlined link indicator */}
                      <div className="relative inline-flex items-center gap-2 text-meta text-fg group-hover:text-accent-text transition-colors">
                        <span>READ THE STORY</span>
                        <ArrowUpRight size={14} className="text-accent-text" />
                        <span
                          className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ease-[cubic-bezier(0.23,1,0.32,1)]"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Month + Year bottom-right in .text-meta --fg-dim */}
                      <span className="text-meta text-fg-dim">
                        {monthYear}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Hairline Divider between rows */}
              {idx < displayedStories.length - 1 && <Rule />}
            </React.Fragment>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. LOAD MORE BUTTON (APPENDS NEXT 8 & UPDATES ?page=)        */}
      {/* ------------------------------------------------------------- */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-rule text-fg hover:border-accent hover:text-accent-text font-sans text-meta tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer"
            data-cursor="LOAD MORE"
          >
            <span>LOAD MORE STORIES</span>
            <span className="text-accent-text">
              ({stories.length - visibleCount} REMAINING)
            </span>
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. VISUALLY-HIDDEN CRAWLER NAV (GUARANTEES 100% CRAWLABILITY) */}
      {/* ------------------------------------------------------------- */}
      <nav aria-label="Complete Stories Archive (Search Engine Crawlers)" className="sr-only">
        <h2>Complete Wedding Stories Archive</h2>
        <ul>
          {stories.map((story) => (
            <li key={`crawler-${story.slug}`}>
              <Link href={`/stories/${story.slug}`}>
                {story.couple} — {story.title} ({story.location})
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default StoriesExplorer;
