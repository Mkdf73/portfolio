"use client";

import { motion, MotionConfig, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Parcours : une fine ligne verticale se remplit pendant le défilement, chaque étape est une carte
 * avec un point sur la ligne qui passe au bleu quand elle entre à l'écran.
 * Rien ne boucle, rien ne bloque le scroll, tout est coupé si le visiteur préfère moins de mouvement.
 */
export function JourneyList({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 65%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} data-journey className="relative mx-auto max-w-3xl">
        <div aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-paper/20" />
        <motion.div
          aria-hidden="true"
          data-journey-fill
          className="absolute left-0 top-0 h-full w-px origin-top bg-indigo"
          style={{ scaleY: reduce ? 1 : fill }}
        />
        <ol className="space-y-6 pl-10">{children}</ol>
      </div>
    </MotionConfig>
  );
}

export function JourneyItem({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <li className="relative">
      <span aria-hidden="true" className="absolute h-[11px] w-[11px] rounded-full bg-ink-700 ring-4 ring-ink-950" style={{ left: "calc(-2.5rem - 5px)", top: "1.75rem" }} />
      <motion.span
        aria-hidden="true"
        className="absolute h-[11px] w-[11px] rounded-full bg-indigo ring-4 ring-ink-950"
        style={{ left: "calc(-2.5rem - 5px)", top: "1.75rem" }}
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -25% 0px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.div
        className="rounded-xl border border-paper/10 bg-ink-900 p-6 transition-[border-color,box-shadow] duration-300 hover:border-indigo/30 hover:shadow-[0_20px_40px_-28px_rgba(91,69,224,0.5)]"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {label && <p className="font-mono text-xs uppercase tracking-wider text-indigo">{label}</p>}
        {children}
      </motion.div>
    </li>
  );
}
