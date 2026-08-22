/**
 * Shared motion constants — single source of truth.
 * Import from here; never redeclare easing per component.
 */

/* Easing curves — array form for Framer Motion */
export const ease = {
  outEditorial: [0.23, 1, 0.32, 1] as const,
  inOutEditorial: [0.77, 0, 0.175, 1] as const,
  drawer: [0.32, 0.72, 0, 1] as const,
  smooth: [0.16, 1, 0.3, 1] as const,
};

/**
 * Standard scroll-in reveal preset.
 * Fade + 12px rise, 500ms, --ease-smooth, once only.
 * Spread directly onto a motion.div: <motion.div {...scrollReveal}>
 */
export const scrollReveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: ease.smooth },
} as const;

/**
 * Staggered container for children that each use scrollRevealChild.
 * Apply to the parent wrapper.
 */
export const staggerContainer = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
} as const;

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const;

export const staggerChildVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
} as const;

/** Image hover scale — 1.02 over 700ms */
export const imageHover = {
  scale: 1.02,
  transition: { duration: 0.7, ease: ease.smooth },
} as const;
