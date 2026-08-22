'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ArrowUpRight, X, Sparkles } from 'lucide-react';
import type FuseType from 'fuse.js';

export interface SearchItem {
  slug: string;
  type: 'story' | 'pre-wedding' | 'photobook' | 'film';
  title: string;
  couple: string;
  location: string;
  excerpt: string;
  tags: string[];
  cover: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

const POPULAR_TAGS = [
  'Royal Palaces',
  'Mathura',
  'Vrindavan',
  'Jaipur',
  'Udaipur',
  'Agra',
  'Sacred Rituals',
  '4K Cinema',
  'Destination Weddings',
];

interface SearchInterfaceProps {
  isOverlay?: boolean;
  onCloseOverlay?: () => void;
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({
  isOverlay,
  onCloseOverlay,
}) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, startTransition] = useTransition();

  const fuseRef = useRef<FuseType<SearchItem> | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Lazy load search index and Fuse.js ONLY when search is first engaged
  const initSearchEngine = async () => {
    if (fuseRef.current || isLoading) return;

    setIsLoading(true);
    try {
      const [{ default: Fuse }, res] = await Promise.all([
        import('fuse.js'),
        fetch('/search-index.json'),
      ]);

      if (!res.ok) throw new Error('Search index failed to load');
      const data: SearchItem[] = await res.json();

      fuseRef.current = new Fuse(data, {
        keys: [
          { name: 'title', weight: 0.35 },
          { name: 'couple', weight: 0.35 },
          { name: 'location', weight: 0.2 },
          { name: 'tags', weight: 0.2 },
          { name: 'excerpt', weight: 0.1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        includeScore: true,
      });

      if (query.trim()) {
        performSearch(query, fuseRef.current);
      }
    } catch (err) {
      console.error('Failed to load search index:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const performSearch = (searchTerm: string, fuseInstance?: FuseType<SearchItem> | null) => {
    const fuse = fuseInstance || fuseRef.current;
    if (!fuse || !searchTerm.trim()) {
      setResults([]);
      return;
    }

    startTransition(() => {
      const searchResults = fuse.search(searchTerm.trim());
      setResults(searchResults.map((r) => r.item));
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (!fuseRef.current) {
      initSearchEngine();
    } else {
      performSearch(val);
    }
  };

  const handleTagClick = async (tag: string) => {
    setQuery(tag);
    if (!fuseRef.current) {
      await initSearchEngine();
    }
    performSearch(tag);
    inputRef.current?.focus();
  };

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
    if (initialQuery) {
      initSearchEngine();
    }
  }, [initialQuery]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-16">
      {/* ------------------------------------------------------------- */}
      {/* 1. OVERSIZED SEARCH INPUT                                     */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full text-center space-y-6">
        <div className="relative flex items-center justify-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => {
              if (!fuseRef.current) initSearchEngine();
            }}
            onChange={handleInputChange}
            placeholder="Search couples, palaces, cities..."
            aria-label="Search stories, pre-weddings, photobooks, and films"
            className="w-full font-display text-2xl sm:text-4xl lg:text-5xl text-fg placeholder:text-fg-faint bg-transparent border-b border-rule focus:border-accent-text outline-none text-center pb-5 transition-colors duration-300"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                inputRef.current?.focus();
              }}
              aria-label="Clear search input"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-dim hover:text-fg p-2 transition-colors focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-meta-sm text-accent-text uppercase animate-pulse">
            INITIALIZING REPOSITORY INDEX...
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. RESULTS CONTAINER / EMPTY STATE                            */}
      {/* ------------------------------------------------------------- */}
      {query.trim() ? (
        results.length > 0 ? (
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-rule pb-3 font-sans">
              <span className="text-meta text-accent-text font-semibold uppercase">
                SEARCH RESULTS ({results.length})
              </span>
              <span className="text-meta-sm text-fg-dim">
                MATCHED FOR &ldquo;{query}&rdquo;
              </span>
            </div>

            <div className="space-y-12">
              {results.map((item, idx) => (
                <div key={`${item.type}-${item.slug}`} className="group relative border-b border-rule pb-12">
                  <Link
                    href={`/${item.type === 'story' ? 'stories' : item.type === 'pre-wedding' ? 'pre-weddings' : item.type === 'photobook' ? 'photobooks' : 'films'}/${item.type === 'film' ? '' : item.slug}`}
                    onClick={() => onCloseOverlay?.()}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none rounded-sm"
                    data-cursor="VIEW RECORD"
                  >
                    {/* 6-Col 4:3 Image Container with 1px Inset Border & Subtle Ring */}
                    <div
                      className={`lg:col-span-6 xl:col-span-5 relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-bg-sunken border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.04)] ${
                        idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <Image
                        src={item.cover.src}
                        alt={item.cover.alt}
                        width={item.cover.width}
                        height={item.cover.height}
                        className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                      />

                      {/* 1px Inset Border & Subtle Ring */}
                      <div
                        className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
                        aria-hidden="true"
                      />

                      {/* Type Badge */}
                      <div className="absolute top-4 left-4 z-10 px-3.5 py-1 bg-bg-raised/90 backdrop-blur-md rounded-full border border-rule font-sans text-meta-sm">
                        <span className="text-accent-text font-semibold uppercase">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    {/* 6-Col Text Block */}
                    <div
                      className={`lg:col-span-6 xl:col-span-7 flex flex-col justify-between space-y-6 ${
                        idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-meta text-accent-text font-semibold uppercase">
                          <span>{item.type}</span>
                          <span aria-hidden="true" className="text-fg-faint">•</span>
                          <span className="text-fg-dim">{item.location}</span>
                        </div>

                        <h3 className="font-display text-3xl sm:text-4xl text-fg font-normal leading-tight group-hover:text-accent-text transition-colors duration-300">
                          {item.title}
                        </h3>

                        <p className="text-body text-fg-dim text-sm sm:text-base leading-relaxed line-clamp-3 font-normal">
                          {item.excerpt}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="relative inline-flex items-center gap-2 text-meta text-fg group-hover:text-accent-text transition-colors font-semibold">
                          <span>EXPLORE {item.type.toUpperCase()}</span>
                          <ArrowUpRight size={14} className="text-accent-text" />
                          <span
                            className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ease-[cubic-bezier(0.23,1,0.32,1)]"
                            aria-hidden="true"
                          />
                        </span>

                        <span className="text-meta-sm text-fg-faint uppercase font-medium">
                          {item.couple}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ----------------------------------------------------------- */
          /* NO-RESULTS STATE                                            */
          /* ----------------------------------------------------------- */
          <div className="text-center py-16 space-y-8 max-w-xl mx-auto border-t border-rule">
            <div className="space-y-2">
              <span className="text-meta text-accent-text block uppercase font-semibold">
                NO DIRECT MATCHES
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-fg font-normal">
                NO RESULTS FOR &ldquo;{query}&rdquo;
              </h3>
              <p className="text-body text-fg-dim text-sm">
                We couldn&apos;t find any archive entries matching your query. Explore our complete stories chronicle or contact our studio desk directly.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/stories"
                className="px-6 py-3 rounded-full bg-fg text-fg-inverse hover:bg-accent-text hover:text-fg-inverse text-meta uppercase font-semibold transition-colors"
              >
                BROWSE ALL STORIES
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-rule hover:border-accent text-fg hover:text-accent-text text-meta uppercase font-semibold transition-colors"
              >
                CONTACT STUDIO
              </Link>
            </div>
          </div>
        )
      ) : (
        /* ------------------------------------------------------------- */
        /* 3. EMPTY STATE (SUGGEST POPULAR TAGS)                         */
        /* ------------------------------------------------------------- */
        <div className="space-y-8 py-8 border-t border-rule text-center">
          <div className="flex items-center justify-center gap-2 text-meta text-accent-text font-semibold uppercase">
            <Sparkles size={14} className="text-accent-text" />
            <span>POPULAR ARCHIVE SEARCHES</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto font-sans">
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="px-5 py-2.5 rounded-full border border-rule hover:border-accent bg-bg-sunken hover:bg-bg-raised text-fg hover:text-accent-text text-meta-sm uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer"
                data-cursor="SEARCH TAG"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="pt-8 max-w-lg mx-auto text-fg-dim text-body text-xs sm:text-sm">
            Search through over 30 published stories, pre-wedding lookbooks, 4K documentary films, and handcrafted monographs across Rajasthan, Braj, Agra, and Delhi NCR.
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInterface;
