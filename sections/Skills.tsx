import { Section } from "@/components/Section";
import { ToolGrid } from "@/components/ToolGrid";
import type { Dict } from "@/data/i18n/types";
import { skillGroups } from "@/data/site";

export function Skills({ t }: { t: Dict["skills"] }) {
  return (
    <Section id="skills" eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.intro}>
      <div className="divide-y divide-paper/10 border-y border-paper/10">
        {skillGroups.map((g) => (
          <div key={g.key} className="grid gap-5 py-7 sm:grid-cols-[12rem_1fr]">
            <h3 className="font-medium text-indigo">{t.groups[g.key]}</h3>
            <ToolGrid tools={g.tools} />
          </div>
        ))}
      </div>
    </Section>
  );
}
