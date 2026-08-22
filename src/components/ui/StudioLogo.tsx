import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface StudioLogoProps {
  variant?: 'full' | 'emblem' | 'lockup';
  theme?: 'dark' | 'light' | 'auto'; // 'light' means for dark backgrounds, 'dark' means for light backgrounds
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  priority?: boolean;
}

export const StudioLogo: React.FC<StudioLogoProps> = ({
  variant = 'lockup',
  theme = 'dark',
  className = '',
  size = 'md',
  href = '/',
  priority = false,
}) => {
  // Dimensions based on size and variant
  let width = 160;
  let height = 75;

  if (variant === 'emblem') {
    if (size === 'sm') {
      width = 28;
      height = 34;
    } else if (size === 'md') {
      width = 38;
      height = 46;
    } else {
      width = 54;
      height = 66;
    }
  } else if (variant === 'full') {
    if (size === 'sm') {
      width = 120;
      height = 56;
    } else if (size === 'md') {
      width = 160;
      height = 75;
    } else {
      width = 220;
      height = 104;
    }
  }

  // Choose appropriate transparent asset based on theme
  const src =
    variant === 'emblem'
      ? '/images/logo-emblem.png'
      : theme === 'light'
      ? '/images/logo-light.png'
      : '/images/logo.png';

  const logoContent = (
    <div className={`inline-flex items-center gap-3 group transition-transform duration-300 ${className}`}>
      {variant === 'lockup' ? (
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 flex items-center justify-center">
            <Image
              src="/images/logo-emblem.png"
              alt="The Picture Square Monogram Emblem"
              width={size === 'sm' ? 24 : size === 'lg' ? 36 : 30}
              height={size === 'sm' ? 30 : size === 'lg' ? 44 : 37}
              priority={priority}
              className="object-contain filter brightness-[0.98] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col text-left">
            <span
              className={`font-display font-normal uppercase tracking-[0.24em] leading-none transition-colors duration-300 ${
                size === 'sm'
                  ? 'text-sm'
                  : size === 'lg'
                  ? 'text-xl'
                  : 'text-base sm:text-lg'
              } ${
                theme === 'light'
                  ? 'text-fg-inverse group-hover:text-accent'
                  : 'text-fg group-hover:text-accent-text'
              }`}
            >
              THE PICTURE SQUARE
            </span>
            <span
              className={`text-[9px] font-sans font-semibold tracking-[0.28em] uppercase mt-1 transition-colors duration-300 ${
                theme === 'light' ? 'text-fg-inverse/60' : 'text-fg-dim'
              }`}
            >
              WEDDING MONOGRAPHS &amp; 4K CINEMA
            </span>
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt="The Picture Square Logo"
          width={width}
          height={height}
          priority={priority}
          className="object-contain filter brightness-[0.98] transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none rounded-sm"
        aria-label="The Picture Square Home"
        data-cursor="HOME"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default StudioLogo;
