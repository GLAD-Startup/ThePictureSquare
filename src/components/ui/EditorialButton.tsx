'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface EditorialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  dataCursor?: string;
}

export const EditorialButton: React.FC<EditorialButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  dataCursor,
  ...props
}) => {
  // Minimum text size 13px per build rules (0.8125rem)
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-[13px] tracking-[0.20em]',
    md: 'px-8 py-3.5 text-[13px] tracking-[0.22em]',
    lg: 'px-10 py-4 text-[14px] tracking-[0.24em]',
  }[size];

  const baseStyle =
    'relative inline-flex items-center justify-center font-sans font-semibold uppercase transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden rounded-full group focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus:outline-none';

  let variantStyle = '';
  if (variant === 'primary') {
    variantStyle = 'bg-fg text-fg-inverse hover:bg-accent-text hover:text-fg-inverse shadow-sm';
  } else if (variant === 'outline') {
    variantStyle =
      'border border-rule text-fg hover:border-accent hover:text-accent-text bg-transparent';
  } else if (variant === 'text') {
    variantStyle = 'p-0 bg-transparent text-fg hover:text-accent-text rounded-none';
  }

  const content = (
    <motion.span
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variant === 'text' ? '' : sizeClasses} ${variantStyle} ${className}`}
      data-cursor={dataCursor}
    >
      {/* Background Fill / Hover Accent */}
      {variant === 'outline' && (
        <span
          className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
          aria-hidden="true"
        />
      )}

      <span className="relative z-10 flex items-center gap-3">
        {children}
        <span
          className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />
      </span>

      {/* Gold underline for text variant */}
      {variant === 'text' && (
        <span
          className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ease-[cubic-bezier(0.23,1,0.32,1)]"
          aria-hidden="true"
        />
      )}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" data-cursor={dataCursor}>
        {content}
      </Link>
    );
  }

  return (
    <button {...props} data-cursor={dataCursor}>
      {content}
    </button>
  );
};

export default EditorialButton;
