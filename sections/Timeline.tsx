import { Briefcase, GraduationCap } from "lucide-react";
import { JourneyItem, JourneyList } from "@/components/Journey";
import { Section } from "@/components/Section";
import type { Dict } from "@/data/i18n/types";
import { timelineStacks } from "@/data/site";

export function Timeline({ t }: { t: Dict["timeline"] }) {
  return (
    <Section id="experience" eyebrow={t.eyebrow} title={t.title} accent={t.accent}>
      <JourneyList>
        {t.items.map((item) => {
          const stack = timelineStacks[item.id];
          return (
            <JourneyItem key={item.id} label={item.period || undefined}>
              <div className="mt-2 flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-800 text-indigo">
                  {item.kind === "work" ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                </span>
                <h3 className="text-xl font-medium">{item.title}</h3>
              </div>
              <p className="mt-1 text-mute">{item.place}</p>
              {item.points.length > 0 && (
                <ul className="mt-3 max-w-2xl list-disc space-y-1 pl-5 text-mute">
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
              {stack && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </JourneyItem>
          );
        })}
      </JourneyList>
    </Section>
  );
}
