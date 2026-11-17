import type { ReactNode } from "react";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { Reveal } from "@/components/Reveal";

export function Section({ id, eyebrow, title, accent, intro, children }: { id: string; eyebrow: string; title: string; accent: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-pad relative border-t border-paper/10">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-3 text-indigo">
              <span aria-hidden="true" className="eyebrow-line h-px w-8 bg-indigo" />
              {eyebrow}
              <span aria-hidden="true" className="eyebrow-line h-px w-8 bg-indigo" />
            </p>
          </Reveal>
          <AnimatedTitle id={`${id}-title`} title={title} accent={accent} className="h-section mt-5" />
          {intro && (
            <Reveal delay={0.15}>
              <p className="mx-auto mt-5 max-w-xl text-lg text-mute">{intro}</p>
            </Reveal>
          )}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
