import React from 'react';

interface GoldDividerProps {
  className?: string;
  subtle?: boolean;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({ className = '', subtle = false }) => {
  return (
    <div
      className={`w-full ${subtle ? 'gold-hairline-subtle' : 'gold-hairline'} ${className}`}
      aria-hidden="true"
    />
  );
};

interface GoldNumberProps {
  number: string | number;
  className?: string;
}

export const GoldNumber: React.FC<GoldNumberProps> = ({ number, className = '' }) => {
  const formatted = typeof number === 'number' ? number.toString().padStart(2, '0') : number;

  return (
    <span
      className={`font-sans text-[11px] font-semibold tracking-[0.25em] text-[#B89B72] uppercase inline-flex items-center gap-2 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72]/70 inline-block" />
      {formatted}
    </span>
  );
};

interface GoldMetaProps {
  children: React.ReactNode;
  className?: string;
}

export const GoldMeta: React.FC<GoldMetaProps> = ({ children, className = '' }) => {
  return (
    <span className={`text-meta text-[#B89B72] tracking-[0.25em] ${className}`}>
      {children}
    </span>
  );
};
