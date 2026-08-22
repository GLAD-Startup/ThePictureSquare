'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  duration?: number;
  staggerAmount?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  as = 'h2',
  delay = 0.1,
  duration = 1.0,
  staggerAmount = 0.04,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const words = text.split(' ');

  if (reducedMotion) {
    const Component = as;
    return <Component className={className}>{text}</Component>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerAmount,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: duration,
        ease: ease.outEditorial,
      },
    },
  };

  const Component = motion[as] as React.ElementType;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      className={`inline-flex flex-wrap overflow-hidden gap-x-[0.28em] gap-y-[0.1em] ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden pb-1 -mb-1">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
