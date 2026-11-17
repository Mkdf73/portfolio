"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { FacebookIcon, TiktokIcon } from "@/components/BrandIcons";
import type { VideoLink } from "@/data/site";

const cardColors = ["bg-paper text-ink-950", "bg-indigo text-white", "bg-amber text-white"];

/**
 * Cartes vidéo empilées : chaque carte reste collée en haut pendant le défilement
 * et la précédente recule légèrement quand la suivante arrive par-dessus.
 */
export function VideoStack({ videos, watch }: { videos: VideoLink[]; watch: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <MotionConfig reducedMotion="user">
      <ul ref={ref} className="mt-6">
        {videos.map((v, i) => (
          <Card key={v.url} v={v} i={i} total={videos.length} progress={scrollYProgress} watch={watch} />
        ))}
      </ul>
    </MotionConfig>
  );
}

function Card({ v, i, total, progress, watch }: { v: VideoLink; i: number; total: number; progress: MotionValue<number>; watch: string }) {
  const reduce = useReducedMotion();
  const start = i / total;
  const target = 1 - (total - i - 1) * 0.04;
  const scale = useTransform(progress, [start, 1], reduce ? [1, 1] : [1, target]);
  const Icon = v.platform === "Facebook" ? FacebookIcon : TiktokIcon;

  return (
    <li className="sticky mb-6 last:mb-0" style={{ top: `${6 + i * 1.25}rem` }}>
      <motion.a
        href={v.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ scale, transformOrigin: "top center" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className={`group relative flex min-h-72 flex-col justify-between overflow-hidden rounded-2xl p-7 shadow-[0_-10px_40px_-20px_rgba(20,23,43,0.35)] sm:p-9 ${cardColors[i % cardColors.length]}`}
      >
        <span aria-hidden="true" className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-current opacity-[0.06] transition-transform duration-700 group-hover:scale-125" />
        <span className="relative flex items-center justify-between font-mono text-xs uppercase tracking-wider opacity-80">
          <span>{`0${i + 1}`}</span>
          <span className="flex items-center gap-2">
            <Icon />
            {v.platform}
          </span>
        </span>
        <span className="relative flex items-end justify-between gap-6">
          <span className="font-serif text-4xl italic leading-tight sm:text-5xl">{v.title}</span>
          <span aria-hidden="true" className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-current/30 transition-transform duration-500 group-hover:scale-110 sm:flex">
            <Play size={22} className="translate-x-0.5" />
          </span>
        </span>
        <span className="relative inline-flex w-fit items-center gap-2 rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-paper">
          {watch}
          <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </motion.a>
    </li>
  );
}
