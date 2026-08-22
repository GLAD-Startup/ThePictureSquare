import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  maxStars?: number;
  size?: number;
  className?: string;
  showText?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 5,
  maxStars = 5,
  size = 15,
  className = '',
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-1 text-accent-text ${className}`}>
      {/* Screen Reader Announcement */}
      <span className="sr-only">
        Rated {rating} out of {maxStars} stars
      </span>

      {/* Decorative Star Glyphs */}
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: maxStars }).map((_, idx) => {
          const isFilled = idx < Math.floor(rating);
          const isHalf = !isFilled && idx < rating;

          return (
            <Star
              key={idx}
              size={size}
              className={`${
                isFilled
                  ? 'fill-accent text-accent'
                  : isHalf
                  ? 'fill-accent/50 text-accent'
                  : 'text-fg-faint/40'
              }`}
            />
          );
        })}
      </div>

      {showText && (
        <span className="text-meta-sm text-fg font-semibold ml-1" aria-hidden="true">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
