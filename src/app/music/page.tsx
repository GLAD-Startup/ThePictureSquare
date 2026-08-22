import type { Metadata } from 'next';
import Link from 'next/link';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { GoldMeta } from '@/components/ui/GoldAccent';
import { Music, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bespoke Audio & Soundscapes | THE PICTURE SQUARE',
  description: 'Custom musical scoring, acoustic soundscapes, and live ceremony natural sound integration for 4K wedding films.',
};

export default function MusicPage() {
  const soundChapters = [
    {
      title: 'ACOUSTIC & STRINGS',
      desc: 'Warm cello, sitar, and classical acoustic guitar scoring tailored to sacred pheras and twilight rituals.',
      tag: 'SACRED RITUALS',
    },
    {
      title: 'ORCHESTRAL SOUNDSCAPES',
      desc: 'Cinematic orchestral dynamics layered with atmospheric environmental sound from palace courtyards.',
      tag: 'GRAND BARAAT',
    },
    {
      title: 'DOCUMENTARY VOCALS & MANTRAS',
      desc: 'Crystal-clear multi-track audio capture of sacred Vedic chanting, family blessings, and unscripted vows.',
      tag: 'NATURAL SOUND',
    },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-20">
      <Shell>
        <div className="space-y-6 max-w-4xl border-b border-rule pb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            <GoldMeta>SOUND DESIGN DIVISION</GoldMeta>
          </div>

          <h1 className="font-display text-display-lg text-fg font-normal leading-none">
            BESPOKE SOUNDSCAPES
          </h1>

          <p className="font-display text-2xl sm:text-3xl font-normal italic text-fg-dim">
            &ldquo;We score our films like cinema—bespoke compositions and pristine natural sound.&rdquo;
          </p>
        </div>
      </Shell>

      <Shell>
        <div className="space-y-12">
          <SectionHead title="SOUND CHAPTERS" eyebrow="CINEMATIC AUDIO" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {soundChapters.map((chapter, i) => (
              <div
                key={i}
                className="p-8 rounded-sm bg-bg-raised border border-rule space-y-4 shadow-[0_4px_20px_rgba(20,20,19,0.03)]"
              >
                <div className="flex items-center justify-between text-accent-text">
                  <Music size={20} />
                  <span className="text-meta-sm font-semibold">{chapter.tag}</span>
                </div>
                <h3 className="font-display text-2xl text-fg font-normal">
                  {chapter.title}
                </h3>
                <p className="text-[13px] font-sans text-fg-dim leading-relaxed">
                  {chapter.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Shell>

      <Shell>
        <div className="pt-12 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-meta text-accent-text font-semibold">CINEMATOGRAPHY SUITE</span>
            <h3 className="font-display text-3xl sm:text-4xl text-fg font-normal">
              EXPLORE OUR 4K WEDDING FILMS
            </h3>
          </div>

          <Link
            href="/films"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg font-sans text-[13px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md"
          >
            <span>VIEW 4K FILMS →</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Shell>
    </main>
  );
}
