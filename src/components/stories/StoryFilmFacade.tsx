'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { GalleryImage } from '@/lib/content/types';

interface StoryFilmFacadeProps {
  filmUrl: string;
  poster: GalleryImage;
  couple: string;
}

export const StoryFilmFacade: React.FC<StoryFilmFacadeProps> = ({
  filmUrl,
  poster,
  couple,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract video embed URL (YouTube or Vimeo)
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('v=')) {
          videoId = url.split('v=')[1]?.split('&')[0] || '';
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
        }
        return videoId
          ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
          : url;
      }
      if (url.includes('vimeo.com')) {
        const vimeoId = url.split('vimeo.com/')[1]?.split('?')[0] || '';
        return vimeoId
          ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1`
          : url;
      }
    } catch {
      return url;
    }
    return url;
  };

  const embedSrc = getEmbedUrl(filmUrl);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 my-16">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-bg-raised border border-rule shadow-[0_15px_40px_rgba(20,20,19,0.08)]">
        {!isPlaying ? (
          <div className="relative w-full h-full group">
            {/* Poster Frame */}
            <Image
              src={poster.src}
              alt={poster.alt || `${couple} 4K Wedding Film`}
              width={poster.width || 1600}
              height={poster.height || 900}
              className="w-full h-full object-cover filter brightness-[0.95] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />

            {/* Inset Border Frame & Subtle Ring */}
            <div
              className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
              aria-hidden="true"
            />

            {/* Dark Scrim Overlay for Video Poster */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-bg-inverse/80 via-bg-inverse/20 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Play Button Trigger with Crisp White Triangle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Play 4K cinema film for ${couple}`}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:scale-105 group-hover:bg-accent-text group-hover:border-accent transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
                data-cursor="PLAY FILM"
              >
                <Play size={28} className="ml-1.5 fill-white text-white" />
              </button>
            </div>

            {/* Video Meta Info */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-sans text-meta-sm text-fg-inverse">
              <span className="font-semibold tracking-widest text-accent uppercase">
                4K CINEMA MASTER CUT
              </span>
              <span className="text-fg-inverse/80 uppercase">
                {couple} — SHOWREEL
              </span>
            </div>
          </div>
        ) : (
          <iframe
            src={embedSrc}
            title={`${couple} 4K Cinema Film`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        )}
      </div>
    </div>
  );
};

export default StoryFilmFacade;
