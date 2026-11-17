"use client";

import { motion, MotionConfig } from "motion/react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const word = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
};

/** Titre dont chaque mot remonte depuis un masque quand il entre à l'écran. */
export function AnimatedTitle({ id, title, accent, className = "" }: { id?: string; title: string; accent: string; className?: string }) {
  const words = [...title.split(" ").map((w) => ({ w, a: false })), ...accent.split(" ").map((w) => ({ w, a: true }))].filter((x) => x.w);
  return (
    <MotionConfig reducedMotion="user">
      <motion.h2
        id={id}
        className={className}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        aria-label={`${title} ${accent}`}
      >
        {words.map(({ w, a }, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span variants={word} className={`inline-block ${a ? "accent-serif" : ""}`}>
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.h2>
    </MotionConfig>
  );
}
