import React from 'react';
import { Rule } from './Rule';

interface SectionHeadProps {
  title: string;
  eyebrow?: string;
  number?: string | number;
  className?: string;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2' | 'h3';
}

/**
 * SectionHead — recurring editorial device across the site.
 * Hairline ─── Centred Uppercase Title ─── Hairline
 */
export const SectionHead: React.FC<SectionHeadProps> = ({
  title,
  eyebrow,
  number,
  className = '',
  align = 'center',
  as = 'h2',
}) => {
  const formattedNumber =
    number !== undefined
      ? typeof number === 'number'
        ? number.toString().padStart(2, '0')
        : number
      : null;

  const HeadingTag = as;

  return (
    <div className={`w-full flex items-center gap-4 sm:gap-6 py-4 ${className}`}>
      {/* Left Hairline */}
      <Rule className="flex-1 !bg-rule-strong" />

      {/* Centred Title & Meta Block */}
      <div
        className={`flex flex-col items-center text-center px-2 shrink-0 ${
          align === 'left' ? 'sm:items-start sm:text-left' : ''
        }`}
      >
        {(eyebrow || formattedNumber) && (
          <div className="flex items-center gap-2 mb-1">
            {formattedNumber && (
              <span className="text-meta-sm text-accent-text font-semibold">
                {formattedNumber}
              </span>
            )}
            {formattedNumber && eyebrow && (
              <span className="text-fg-faint text-[10px]" aria-hidden="true">
                •
              </span>
            )}
            {eyebrow && (
              <span className="text-meta-sm text-accent-text tracking-[0.22em] uppercase font-semibold">
                {eyebrow}
              </span>
            )}
          </div>
        )}

        <HeadingTag className="font-sans text-[13px] sm:text-[14px] font-semibold tracking-[0.24em] text-fg uppercase">
          {title}
        </HeadingTag>
      </div>

      {/* Right Hairline */}
      <Rule className="flex-1 !bg-rule-strong" />
    </div>
  );
};

export default SectionHead;
