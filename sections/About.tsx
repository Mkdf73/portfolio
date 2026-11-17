import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { Dict } from "@/data/i18n/types";

export function About({ t }: { t: Dict["about"] }) {
  return (
    <Section id="about" eyebrow={t.eyebrow} title={t.title} accent={t.accent}>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-paper/85">
          {t.paragraphs.map((p, i) => (
            <Reveal key={p} delay={i * 0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal from="right" delay={0.15}>
          <dl className="divide-y divide-paper/10 border-y border-paper/10">
            {t.facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-6 py-4 text-sm transition-colors duration-300 hover:bg-ink-800/60">
                <dt className="text-mute">{f.label}</dt>
                <dd className="text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
