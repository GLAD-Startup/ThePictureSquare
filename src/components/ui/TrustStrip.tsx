import React from 'react';
import { GoogleGlyph } from './GoogleGlyph';
import { Star, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

interface TrustStripProps {
  rating?: number;
  userRatingCount?: number;
  reviewCount?: number;
  googleMapsUrl?: string;
  className?: string;
}

export const TrustStrip: React.FC<TrustStripProps> = ({
  rating = 4.9,
  userRatingCount,
  reviewCount,
  googleMapsUrl = SITE_CONFIG.googleMapsUrl,
  className = '',
}) => {
  const count = userRatingCount ?? reviewCount ?? 33;

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Rated ${rating.toFixed(1)} out of 5 from ${count} Google reviews. Open Google listing.`}
        className="group inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-bg-sunken border border-rule hover:border-accent hover:bg-bg-raised text-fg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-sm"
        data-cursor="REVIEWS"
      >
        {/* Google Icon */}
        <GoogleGlyph size={15} className="shrink-0" />

        {/* Rating Score & Star Glyph */}
        <div className="flex items-center gap-1 font-sans text-xs font-semibold text-fg">
          <span>{rating.toFixed(1)}</span>
          <Star size={13} className="fill-accent text-accent" aria-hidden="true" />
        </div>

        {/* Separator Dot */}
        <span className="text-fg-faint text-xs" aria-hidden="true">
          •
        </span>

        {/* Review Count & Text */}
        <span className="font-sans text-xs text-fg-dim font-medium tracking-wide group-hover:text-fg transition-colors">
          {count} Google reviews
        </span>

        <ArrowUpRight size={12} className="text-accent-text opacity-75 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>
  );
};

export default TrustStrip;
