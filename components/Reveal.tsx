"use client";

import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

type Dir = "up" | "left" | "right";
const offset: Record<Dir, { x: number; y: number }> = { up: { x: 0, y: 24 }, left: { x: -40, y: 0 }, right: { x: 40, y: 0 } };

/** Apparition douce quand l'élément entre à l'écran (une seule fois). */
export function Reveal({ children, className, delay = 0, from = "up" }: { children: ReactNode; className?: string; delay?: number; from?: Dir }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, ...offset[from] }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
