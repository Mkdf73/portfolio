import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { ToolLogo } from "@/components/ToolLogo";
import { ProjectCover } from "@/components/ProjectCover";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { Dict } from "@/data/i18n/types";
import { allTools, projectsMeta, type Tool } from "@/data/site";

const findTool = (name: string): Tool | undefined => allTools.find((x) => x.name === name);

export function Projects({ t }: { t: Dict["projects"] }) {
  return (
    <Section id="projects" eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.intro}>
      <div className="space-y-20">
        {projectsMeta.map((meta, i) => {
          const p = t.items[meta.slug];
          const name = meta.slug === "sygalin-connect" ? "Sygalin Connect" : meta.slug === "documenso" ? "Documenso" : "PayLinko";
          return (
            <article key={meta.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <Reveal from={i % 2 ? "right" : "left"} className={i % 2 ? "lg:order-2" : ""}>
                  <ProjectCover name={name} index={i} image={meta.image} tools={meta.stack.map(findTool).filter((x): x is Tool => !!x)} />
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="flex flex-wrap items-center gap-3 text-sm text-mute">
                    {p.category}
                    {p.status && <span className="rounded-md bg-ink-700 px-2 py-0.5 text-xs font-medium text-indigo-soft">{p.status}</span>}
                  </p>
                  <h3 className="mt-2 text-3xl font-medium">{name}</h3>
                  <p className="mt-4 text-paper/85">{p.summary}</p>
                  <dl className="mt-6 space-y-4 text-sm">
                    {p.problem && (
                      <div>
                        <dt className="font-medium text-indigo">{t.labels.problem}</dt>
                        <dd className="mt-1 text-mute">{p.problem}</dd>
                      </div>
                    )}
                    {p.solution && (
                      <div>
                        <dt className="font-medium text-indigo">{t.labels.solution}</dt>
                        <dd className="mt-1 text-mute">{p.solution}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="font-medium text-indigo">{t.labels.role}</dt>
                      <dd className="mt-1 text-mute">{p.role}</dd>
                    </div>
                  </dl>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {meta.stack.map((s) => {
                      const tool = findTool(s);
                      return (
                        <li key={s} className="chip gap-1.5 transition-colors hover:border-indigo/40 hover:text-paper">
                          {tool && <ToolLogo tool={tool} size={13} colored />}
                          {s}
                        </li>
                      );
                    })}
                  </ul>
                  {(meta.github || meta.live) && (
                    <div className="mt-6 flex gap-3">
                      {meta.github && (
                        <a href={meta.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost group">
                          <GithubIcon /> {t.labels.code}
                          <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      )}
                      {meta.live && (
                        <a href={meta.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                          <ExternalLink size={16} aria-hidden="true" /> {t.labels.live}
                        </a>
                      )}
                    </div>
                  )}
                </Reveal>
              </article>
          );
        })}
      </div>
    </Section>
  );
}
