'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Film } from '@/lib/content/types';
import { SectionHead } from '@/components/ui/SectionHead';
import { VideoLightbox } from '@/components/films/VideoLightbox';
import { Play, ArrowUpRight } from 'lucide-react';

interface FilmsExplorerProps {
  films: Film[];
}

export const FilmsExplorer: React.FC<FilmsExplorerProps> = ({ films }) => {
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const instacuts = films.filter((f) => f.kind === 'instacut');
  const trailers = films.filter((f) => f.kind === 'trailer');
  const compilations = films.filter((f) => f.kind === 'compilation');

  const handlePlay = (film: Film, event: React.MouseEvent<HTMLElement>) => {
    setActiveFilm(film);
    setTriggerEl(event.currentTarget);
  };

  const handleClose = () => {
    setActiveFilm(null);
  };

  return (
    <div className="space-y-32">
      {/* ------------------------------------------------------------- */}
      {/* 1. INSTACUTS — 9:16 cards, 4-up desktop / 2-up mobile         */}
      {/* ------------------------------------------------------------- */}
      {instacuts.length > 0 && (
        <section id="instacuts" className="space-y-12 scroll-mt-24">
          <SectionHead
            title="INSTACUTS"
            eyebrow="UNDER-A-MINUTE VERTICAL CINEMA"
            align="center"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {instacuts.map((film) => (
              <div key={film.id} className="group flex flex-col space-y-3">
                {/* THE CARD IS A <button> */}
                <button
                  type="button"
                  onClick={(e) => handlePlay(film, e)}
                  aria-label={`Play ${film.kind} — ${film.couple}, ${film.location}`}
                  className="relative w-full aspect-[9/16] overflow-hidden rounded-sm bg-bg-sunken border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.06)] text-left focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer group"
                  data-cursor="PLAY REEL"
                >
                  <Image
                    src={film.poster.src}
                    alt={film.poster.alt}
                    width={film.poster.width}
                    height={film.poster.height}
                    className="w-full h-full object-cover filter brightness-[0.95] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />

                  {/* 1px Inset Border & Ring */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
                    aria-hidden="true"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-bg-inverse/90 via-bg-inverse/25 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Centred Play Triangle with White Fill */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white group-hover:bg-accent-text group-hover:border-accent flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.15] shadow-lg"
                      aria-hidden="true"
                    >
                      <Play size={22} className="ml-1 fill-white text-white" />
                    </span>
                  </div>

                  {/* Bottom Information */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-baseline justify-between font-sans text-meta-sm text-fg-inverse pointer-events-none">
                    <span className="font-semibold text-[11px] sm:text-[12px] truncate max-w-[65%] group-hover:text-accent transition-colors">
                      {film.couple}
                    </span>
                    <span className="text-fg-inverse/80 text-[10px] sm:text-[11px] shrink-0">
                      {film.runtime}
                    </span>
                  </div>
                </button>

                {/* If film has a storySlug, add VIEW THE FULL STORY link */}
                {film.storySlug && (
                  <div className="pt-1 text-center sm:text-left">
                    <Link
                      href={`/stories/${film.storySlug}`}
                      className="inline-flex items-center gap-1 text-meta-sm text-accent-text hover:text-fg transition-colors"
                      data-cursor="STORY"
                    >
                      <span>VIEW THE FULL STORY</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. TRAILERS — 16:9 cards, 3-up desktop / 1-up mobile          */}
      {/* ------------------------------------------------------------- */}
      {trailers.length > 0 && (
        <section id="trailers" className="space-y-12 scroll-mt-24">
          <SectionHead
            title="TRAILERS"
            eyebrow="3–5 MINUTE WEDDING MOTION PICTURES"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {trailers.map((film) => (
              <div key={film.id} className="group flex flex-col space-y-3">
                {/* THE CARD IS A <button> */}
                <button
                  type="button"
                  onClick={(e) => handlePlay(film, e)}
                  aria-label={`Play trailer — ${film.couple}, ${film.location}`}
                  className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-bg-sunken border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.06)] text-left focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer group"
                  data-cursor="PLAY FILM"
                >
                  <Image
                    src={film.poster.src}
                    alt={film.poster.alt}
                    width={film.poster.width}
                    height={film.poster.height}
                    className="w-full h-full object-cover filter brightness-[0.95] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />

                  {/* 1px Inset Border & Ring */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
                    aria-hidden="true"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-bg-inverse/90 via-bg-inverse/25 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Centred Play Triangle with White Fill */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white group-hover:bg-accent-text group-hover:border-accent flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.15] shadow-lg"
                      aria-hidden="true"
                    >
                      <Play size={24} className="ml-1 fill-white text-white" />
                    </span>
                  </div>

                  {/* Bottom Info: Couple left, Runtime right */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between font-sans text-meta text-fg-inverse pointer-events-none">
                    <div className="flex flex-col">
                      <span className="font-semibold group-hover:text-accent transition-colors">
                        {film.couple}
                      </span>
                      <span className="text-meta-sm text-fg-inverse/80">
                        {film.location}
                      </span>
                    </div>

                    <span className="text-meta text-accent font-semibold shrink-0">
                      {film.runtime}
                    </span>
                  </div>
                </button>

                {/* If storySlug exists */}
                {film.storySlug && (
                  <div className="pt-1">
                    <Link
                      href={`/stories/${film.storySlug}`}
                      className="inline-flex items-center gap-1.5 text-meta text-accent-text hover:text-fg transition-colors"
                      data-cursor="STORY"
                    >
                      <span>VIEW THE FULL STORY</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. COMPILATIONS — 16:9 cards, 2-up desktop / 1-up mobile      */}
      {/* ------------------------------------------------------------- */}
      {compilations.length > 0 && (
        <section id="compilations" className="space-y-12 scroll-mt-24">
          <SectionHead
            title="COMPILATIONS"
            eyebrow="LONG-FORM SHOWREELS &amp; ANTHOLOGIES"
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {compilations.map((film) => (
              <div key={film.id} className="group flex flex-col space-y-3">
                {/* THE CARD IS A <button> */}
                <button
                  type="button"
                  onClick={(e) => handlePlay(film, e)}
                  aria-label={`Play compilation — ${film.couple}, ${film.location}`}
                  className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-bg-sunken border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.06)] text-left focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer group"
                  data-cursor="PLAY SHOWREEL"
                >
                  <Image
                    src={film.poster.src}
                    alt={film.poster.alt}
                    width={film.poster.width}
                    height={film.poster.height}
                    className="w-full h-full object-cover filter brightness-[0.95] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />

                  {/* 1px Inset Border & Ring */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
                    aria-hidden="true"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-bg-inverse/90 via-bg-inverse/25 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Centred Play Triangle with White Fill */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white group-hover:bg-accent-text group-hover:border-accent flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.15] shadow-2xl"
                      aria-hidden="true"
                    >
                      <Play size={28} className="ml-1.5 fill-white text-white" />
                    </span>
                  </div>

                  {/* Bottom Info: Couple left, Runtime right */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-baseline justify-between font-sans text-meta text-fg-inverse pointer-events-none">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-display text-2xl text-fg-inverse group-hover:text-accent transition-colors">
                        {film.couple}
                      </span>
                      <span className="text-meta-sm text-fg-inverse/80">
                        {film.location}
                      </span>
                    </div>

                    <span className="text-meta text-accent font-semibold shrink-0">
                      {film.runtime}
                    </span>
                  </div>
                </button>

                {film.storySlug && (
                  <div className="pt-1">
                    <Link
                      href={`/stories/${film.storySlug}`}
                      className="inline-flex items-center gap-1.5 text-meta text-accent-text hover:text-fg transition-colors"
                    >
                      <span>VIEW THE FULL STORY</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fullscreen Video Lightbox Modal */}
      <VideoLightbox
        film={activeFilm}
        onClose={handleClose}
        triggerElement={triggerEl}
      />
    </div>
  );
};

export default FilmsExplorer;
