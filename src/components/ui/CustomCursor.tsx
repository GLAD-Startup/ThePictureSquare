import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Enable custom cursor class on body for desktop pointer devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target or parent has data-cursor attribute
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      const interactiveTarget = target.closest('a, button, [role="button"], input, textarea') as HTMLElement | null;

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
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Central Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#141413]"
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

      {/* Fluid Outer Ring & Context Tag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border border-[#B89B72]/60 bg-[#141413]/5 backdrop-blur-[2px]"
        animate={{
          x: position.x,
          y: position.y,
          width: cursorText ? 84 : isHovered ? 52 : 36,
          height: cursorText ? 84 : isHovered ? 52 : 36,
          marginLeft: cursorText ? -42 : isHovered ? -26 : -18,
          marginTop: cursorText ? -42 : isHovered ? -26 : -18,
          backgroundColor: cursorText ? 'rgba(20, 20, 19, 0.88)' : 'rgba(20, 20, 19, 0.03)',
          borderColor: cursorText ? 'rgba(184, 155, 114, 0.8)' : isHovered ? 'rgba(184, 155, 114, 0.7)' : 'rgba(184, 155, 114, 0.35)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280, mass: 0.2 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[10px] uppercase font-sans font-semibold tracking-[0.22em] text-[#F6F4EE]"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
