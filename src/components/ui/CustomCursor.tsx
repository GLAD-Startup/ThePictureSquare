'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion — do not mount
    const mqlMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mqlMotion.matches) {
      setReducedMotion(true);
      return;
    }

    // Check pointer: fine — only mount on fine pointer devices
    const mqlPointer = window.matchMedia('(pointer: fine)');
    if (!mqlPointer.matches) {
      return;
    }

    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mqlMotion.addEventListener('change', motionHandler);

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      const interactiveTarget = target.closest(
        'a, button, [role="button"], input, textarea, select'
      ) as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else if (interactiveTarget) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      mqlMotion.removeEventListener('change', motionHandler);
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (reducedMotion || !isVisible) return null;

  return (
    <>
      {/* Central Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-fg"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? (cursorText ? 0 : 0.5) : 1,
          opacity: isHovered && cursorText ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer Contextual Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border border-accent/60 bg-bg-raised/85 backdrop-blur-[2px] shadow-md"
        animate={{
          x: position.x,
          y: position.y,
          width: cursorText ? 92 : isHovered ? 52 : 36,
          height: cursorText ? 92 : isHovered ? 52 : 36,
          marginLeft: cursorText ? -46 : isHovered ? -26 : -18,
          marginTop: cursorText ? -46 : isHovered ? -26 : -18,
          borderColor: cursorText
            ? 'rgba(184, 155, 114, 0.9)'
            : isHovered
            ? 'rgba(184, 155, 114, 0.7)'
            : 'rgba(184, 155, 114, 0.35)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280, mass: 0.2 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[13px] uppercase font-sans font-semibold tracking-[0.20em] text-fg text-center px-2"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
