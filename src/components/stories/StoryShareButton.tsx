'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface StoryShareButtonProps {
  title: string;
  couple: string;
}

export const StoryShareButton: React.FC<StoryShareButtonProps> = ({ title, couple }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareData = {
      title: `${couple} — ${title} | The Picture Square`,
      text: `View the wedding monograph for ${couple} by The Picture Square.`,
      url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Failed to copy share link:', err);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share this wedding story"
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rule hover:border-accent text-fg-dim hover:text-accent-text text-meta-sm uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer"
      data-cursor="SHARE"
    >
      {copied ? (
        <>
          <Check size={13} className="text-accent-text" />
          <span className="text-accent-text font-semibold">LINK COPIED</span>
        </>
      ) : (
        <>
          <Share2 size={13} />
          <span>SHARE</span>
        </>
      )}
    </button>
  );
};

export default StoryShareButton;
