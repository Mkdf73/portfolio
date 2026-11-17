"use client";

import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ToolLogo } from "@/components/ToolLogo";
import type { Tool } from "@/data/site";

/**
 * Visuel d'un projet : capture si elle existe, sinon une couverture dessinée
 * (fenêtre d'application, nom du projet, logos de la stack qui apparaissent en cascade).
 * Léger effet de profondeur au défilement.
 */
export function ProjectCover({ name, index, image, tools }: { name: string; index: number; image: string | null; tools: Tool[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24]);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-paper/10 bg-ink-800 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(91,69,224,0.45)]">
        {image ? (
          <motion.div style={{ y }} className="absolute -inset-6">
            <Image src={image} alt={name} fill loading="lazy" sizes="(min-width: 1024px) 560px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          </motion.div>
        ) : (
          <>
            <div aria-hidden="true" className="cover-grid absolute inset-0" />
            <motion.div style={{ y }} className="absolute inset-6 flex flex-col rounded-xl border border-paper/10 bg-ink-900 shadow-[0_20px_40px_-25px_rgba(20,23,43,0.4)] transition-transform duration-500 group-hover:-translate-y-1 sm:inset-10">
              <div className="flex items-center gap-1.5 border-b border-paper/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
                <span className="ml-3 font-mono text-[10px] text-mute">{`0${index + 1}`}</span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-5 p-4 text-center">
                <span className="font-serif text-4xl italic text-indigo sm:text-5xl">{name}</span>
                <motion.ul
                  className="flex flex-wrap justify-center gap-3"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                >
                  {tools.slice(0, 6).map((tool) => (
                    <motion.li
                      key={tool.name}
                      title={tool.name}
                      variants={{ hidden: { opacity: 0, y: 12, scale: 0.6 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } } }}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-paper/10 bg-ink-950"
                    >
                      <ToolLogo tool={tool} size={20} colored />
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </MotionConfig>
  );
}
