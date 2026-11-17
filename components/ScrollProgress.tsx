"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Fine barre de progression de lecture en haut de la page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-indigo"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
