'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Music, Volume2 } from 'lucide-react';
import { Track } from '@/lib/content/types';

interface StoryInlineAudioProps {
  trackInfo: {
    title: string;
    artist: string;
  };
  matchedTrack?: Track | null;
}

export const StoryInlineAudio: React.FC<StoryInlineAudioProps> = ({
  trackInfo,
  matchedTrack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(matchedTrack?.durationSec || 180);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSrc = matchedTrack?.audioUrl || '/audio/ambient-sample.mp3';

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Handle autoplay or missing file gracefully
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12">
      <div className="p-8 sm:p-10 rounded-sm bg-bg-sunken border border-rule text-center space-y-5 shadow-[0_4px_20px_rgba(20,20,19,0.02)]">
        <div className="flex items-center justify-center gap-2 text-meta-sm text-accent-text font-semibold">
          <Music size={14} className="text-accent-text" />
          <span>ORIGINAL SCORE &amp; SOUNDTRACK</span>
        </div>

        {/* Title in display italic */}
        <h3 className="font-display text-2xl sm:text-3xl font-normal italic text-fg">
          &ldquo;{trackInfo.title}&rdquo;
        </h3>

        {/* Artist in .text-meta */}
        <span className="text-meta text-fg-dim block font-semibold">
          COMPOSED BY <span className="text-accent-text">{trackInfo.artist.toUpperCase()}</span>
        </span>

        {/* Playable Inline Controls */}
        <div className="pt-3 flex flex-col items-center gap-3">
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            preload="none"
          />

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-rule hover:border-accent bg-bg-raised text-fg hover:text-accent-text text-meta-sm uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer shadow-sm"
              data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
            >
              {isPlaying ? (
                <>
                  <Pause size={14} className="text-accent-text" />
                  <span className="font-semibold">PAUSE SCORE</span>
                </>
              ) : (
                <>
                  <Play size={14} className="text-accent-text fill-accent-text" />
                  <span className="font-semibold">LISTEN TO SCORE</span>
                </>
              )}
            </button>

            {isPlaying && (
              <div className="flex items-center gap-2 text-meta-sm text-fg-dim font-medium">
                <Volume2 size={14} className="text-accent-text animate-pulse" />
                <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryInlineAudio;
