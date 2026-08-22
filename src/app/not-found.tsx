import React from 'react';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="py-32 sm:py-44 flex flex-col items-center justify-center text-center">
      <Shell>
        <div className="max-w-2xl mx-auto space-y-10">
          <SectionHead
            as="h1"
            title="404 — MONOGRAPH NOT FOUND"
            eyebrow="ARCHIVE RECORD MISSING"
            align="center"
          />

          <p className="font-display text-3xl sm:text-4xl italic text-fg leading-snug">
            &ldquo;The wedding story, lookbook, or chapter you are seeking does not exist in our archive or has been relocated.&rdquo;
          </p>

          <p className="prose-editorial text-fg-dim text-sm max-w-lg mx-auto">
            Please browse our published stories, explore curated film reels, or return to the main monograph catalog.
          </p>

          {/* Quick Direct Links */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 font-sans">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-fg text-fg-inverse hover:bg-accent-text hover:text-fg-inverse text-meta font-semibold uppercase tracking-[0.20em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-sm"
            >
              <span>EXPLORE STORIES</span>
              <ArrowUpRight size={14} />
            </Link>

            <Link
              href="/pre-weddings"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-rule hover:border-accent text-fg hover:text-accent-text text-meta font-semibold uppercase tracking-[0.20em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
            >
              <span>PRE-WEDDINGS</span>
            </Link>

            <Link
              href="/films"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-rule hover:border-accent text-fg hover:text-accent-text text-meta font-semibold uppercase tracking-[0.20em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
            >
              <span>4K FILMS</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-rule hover:border-accent text-fg-dim hover:text-accent-text text-meta font-semibold uppercase tracking-[0.20em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none"
            >
              <span>HOME</span>
            </Link>
          </div>
        </div>
      </Shell>
    </main>
  );
}
