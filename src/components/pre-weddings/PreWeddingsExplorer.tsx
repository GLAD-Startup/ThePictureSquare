'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { PreWedding } from '@/lib/content/types';
import { ArrowUpRight } from 'lucide-react';

interface PreWeddingsExplorerProps {
  preWeddings: PreWedding[];
  allTags: string[];
  currentTag?: string;
}

const ITEMS_PER_PAGE = 12;

export const PreWeddingsExplorer: React.FC<PreWeddingsExplorerProps> = ({
  preWeddings,
  allTags,
  currentTag,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialPageParam = parseInt(searchParams.get('page') || '1', 10);
  const initialPage = isNaN(initialPageParam) || initialPageParam < 1 ? 1 : initialPageParam;

  const [visibleCount, setVisibleCount] = useState<number>(initialPage * ITEMS_PER_PAGE);

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

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const displayedItems = preWeddings.slice(0, visibleCount);
  const hasMore = visibleCount < preWeddings.length;

  return (
    <div className="space-y-16">
      {/* ------------------------------------------------------------- */}
      {/* 1. TAG FILTER ROW                                             */}
      {/* ------------------------------------------------------------- */}
      <nav
        aria-label="Pre-Wedding Tags Filter"
        className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 border-b border-rule scrollbar-none select-none"
      >
        <span className="text-meta-sm text-accent-text mr-2 uppercase tracking-widest font-semibold shrink-0">
          LOCATION / TAG:
        </span>

        <Link
          href="/pre-weddings"
          className={`px-4 py-1.5 rounded-full text-meta-sm uppercase transition-all duration-300 shrink-0 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none ${
            !currentTag
              ? 'bg-fg text-fg-inverse font-semibold shadow-sm'
              : 'text-fg-dim hover:text-fg border border-rule hover:border-accent'
          }`}
        >
          ALL ({preWeddings.length})
        </Link>

        {allTags.map((tag) => {
          const isActive = currentTag?.toLowerCase() === tag.toLowerCase();
          const tagUrl = `/pre-weddings/tag/${encodeURIComponent(
            tag.toLowerCase().replace(/\s+/g, '-')
          )}`;

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
      {/* 2. 2-UP VISUAL GRID (4:5 COVER, DISPLAY TITLE, READ MORE)     */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {displayedItems.map((item, idx) => (
          <div key={item.slug} className="group relative flex flex-col">
            {/* EXACTLY ONE <a> WRAPPING THE CARD */}
            <Link
              href={`/pre-weddings/${item.slug}`}
              className="block focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none rounded-sm"
              aria-label={`View pre-wedding session: ${item.couple} in ${item.location}`}
              data-cursor="LOOKBOOK"
            >
              {/* 4:5 Cover Image Container with Inset Border & Subtle Ring */}
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-bg-sunken border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.04)]">
                <Image
                  src={item.cover.src}
                  alt={item.cover.alt}
                  width={item.cover.width}
                  height={item.cover.height}
                  priority={idx < 2}
                  placeholder={item.cover.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={item.cover.blurDataURL}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />

                {/* 1px Inset Border & Subtle Ring */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
                  aria-hidden="true"
                />

                {/* Stills Count Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-bg-raised/90 backdrop-blur-md rounded-full border border-rule font-sans text-meta-sm">
                  <span className="text-accent-text font-semibold">
                    {item.images.length} STILLS
                  </span>
                </div>
              </div>

              {/* Text Information Below Card */}
              <div className="space-y-2 pt-4 border-b border-rule pb-4">
                {/* City in .text-meta */}
                <span className="text-meta text-accent-text block">
                  {item.location} · {item.displayDate}
                </span>

                {/* Couple Name in Display Face */}
                <h2 className="font-display text-3xl sm:text-4xl text-fg font-normal leading-tight group-hover:text-accent-text transition-colors duration-300">
                  {item.couple}
                </h2>

                {/* Excerpt */}
                <p className="text-body text-fg-dim text-sm line-clamp-2 leading-relaxed">
                  {item.excerpt}
                </p>

                {/* READ MORE link with accent underline animation */}
                <div className="pt-2">
                  <span className="relative inline-flex items-center gap-1.5 text-meta text-fg group-hover:text-accent-text transition-colors">
                    <span>READ MORE</span>
                    <ArrowUpRight size={13} className="text-accent-text" />
                    <span
                      className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ease-[cubic-bezier(0.23,1,0.32,1)]"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. LOAD MORE BUTTON                                           */}
      {/* ------------------------------------------------------------- */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-rule text-fg hover:border-accent hover:text-accent-text font-sans text-meta tracking-[0.22em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer"
            data-cursor="LOAD MORE"
          >
            <span>LOAD MORE SESSIONS</span>
            <span className="text-accent-text">
              ({preWeddings.length - visibleCount} REMAINING)
            </span>
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. VISUALLY-HIDDEN CRAWLER NAV                                */}
      {/* ------------------------------------------------------------- */}
      <nav aria-label="Complete Pre-Weddings Archive (Search Crawlers)" className="sr-only">
        <h2>Complete Pre-Wedding Sessions Archive</h2>
        <ul>
          {preWeddings.map((item) => (
            <li key={`crawler-pw-${item.slug}`}>
              <Link href={`/pre-weddings/${item.slug}`}>
                {item.couple} Pre-Wedding Session in {item.location}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PreWeddingsExplorer;
