import { FacebookIcon, SnapchatIcon, TiktokIcon } from "@/components/BrandIcons";
import { JourneyItem, JourneyList } from "@/components/Journey";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { Dict } from "@/data/i18n/types";
import { ToolLogo } from "@/components/ToolLogo";
import { VideoStack } from "@/components/VideoStack";
import { skillGroups, snapchatUrl, socials, videos } from "@/data/site";

const mediaTools = skillGroups.find((g) => g.key === "media")?.tools ?? [];

const channels = [
  { label: "TikTok", href: socials.tiktok, Icon: TiktokIcon },
  { label: "Facebook", href: socials.facebook, Icon: FacebookIcon },
    { label: "Snapchat", href: snapchatUrl, Icon: SnapchatIcon },
];

export function Content({ t }: { t: Dict["content"] }) {
  return (
    <Section id="content" eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.intro}>
      <Reveal className="mx-auto mb-14 max-w-3xl">
        <p className="text-center text-sm font-medium text-mute">{t.toolsTitle}</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-3">
          {mediaTools.map((tool, i) => (
            <li
              key={tool.name}
              className="float-soft flex items-center gap-2 rounded-lg border border-paper/10 bg-ink-900 px-3 py-2 text-sm"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <ToolLogo tool={tool} size={20} colored />
              {tool.name}
            </li>
          ))}
        </ul>
      </Reveal>
      <h3 className="mx-auto max-w-3xl text-xl font-medium">{t.stepsTitle}</h3>
      <div className="mt-8">
        <JourneyList>
          {t.steps.map((s, i) => (
            <JourneyItem key={s.title} label={`0${i + 1}`}>
              <p className="mt-2 text-xl font-medium">{s.title}</p>
              <p className="mt-1 text-mute">{s.text}</p>
              {s.items && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <li key={it} className="chip">
                      {it}
                    </li>
                  ))}
                </ul>
              )}
            </JourneyItem>
          ))}
        </JourneyList>
      </div>

      {videos.length > 0 && (
        <div className="mx-auto mt-20 max-w-3xl">
          <h3 className="text-xl font-medium">{t.videosTitle}</h3>
          <VideoStack videos={videos} watch={t.watch} />
        </div>
      )}

      <Reveal className="mx-auto mt-20 max-w-3xl">
        <div className="rounded-2xl border border-paper/10 bg-ink-900 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-800 text-indigo">
              <TiktokIcon />
            </span>
            <span className="-ml-5 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink-900 bg-ink-800 text-indigo">
              <FacebookIcon />
            </span>
            <h3 className="text-xl font-medium">{t.social.title}</h3>
          </div>
          <p className="mt-4 max-w-2xl text-mute">{t.social.text}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {t.social.items.map((it) => (
              <li key={it} className="chip">
                {it}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-6 max-w-3xl">
        <div className="flex flex-col gap-6 rounded-2xl border border-paper/10 bg-ink-900 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-medium">{t.linksTitle}</h3>
            <p className="mt-2 max-w-md text-mute">{t.linksText}</p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {channels.filter((n) => n.href).map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 rounded-lg border border-paper/15 px-4 transition-colors hover:border-paper/40">
                  <Icon />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
