"use client";

import { motion, MotionConfig } from "motion/react";
import { ToolLogo, toolColor } from "@/components/ToolLogo";
import type { Tool } from "@/data/site";

const list = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 22 } },
};

/**
 * Logos d'outils : apparition en cascade, puis au survol le logo prend la couleur de sa marque,
 * la carte se soulève et une lueur de la même couleur apparaît.
 */
export function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.ul className="flex flex-wrap gap-3" variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
        {tools.map((tool) => (
          <motion.li
            key={tool.name}
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{ "--brand": toolColor(tool) } as React.CSSProperties}
            className="tool-tile group relative flex h-24 w-24 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-paper/10 bg-ink-900 px-2 text-center text-mute sm:h-28 sm:w-28"
          >
            <span aria-hidden="true" className="tool-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative transition-transform duration-300 group-hover:scale-110">
              <span className="block group-hover:hidden">
                <ToolLogo tool={tool} />
              </span>
              <span className="hidden group-hover:block">
                <ToolLogo tool={tool} colored />
              </span>
            </span>
            <span className="relative text-xs font-medium leading-tight transition-colors duration-300 group-hover:text-paper">{tool.name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </MotionConfig>
  );
}
