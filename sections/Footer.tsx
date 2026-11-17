import { ArrowUp } from "lucide-react";
import { FacebookIcon, SnapchatIcon, GithubIcon, LinkedinIcon, TiktokIcon } from "@/components/BrandIcons";
import type { Locale } from "@/data/i18n/config";
import type { Dict } from "@/data/i18n/types";
import { site, snapchatUrl, socials } from "@/data/site";

const networks = [
  { label: "LinkedIn", href: socials.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: socials.github, Icon: GithubIcon },
  { label: "TikTok", href: socials.tiktok, Icon: TiktokIcon },
  { label: "Facebook", href: socials.facebook, Icon: FacebookIcon },
    { label: "Snapchat", href: snapchatUrl, Icon: SnapchatIcon },
];

export function Footer({ lang, t }: { lang: Locale; t: Dict["footer"] }) {
  const [first, ...rest] = site.name.split(" ");
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 pt-16 pb-8">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="text-5xl font-medium leading-none sm:text-7xl" aria-hidden="true">
            {first} <span className="accent-serif">{rest.join(" ")}.</span>
          </p>
          <div className="flex items-center gap-3">
            {networks.filter((n) => n.href).map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-paper/15 text-mute transition-all duration-300 hover:-translate-y-1 hover:border-indigo/50 hover:text-indigo"
              >
                <Icon />
              </a>
            ))}
            <a
              href={`/${lang}#top`}
              aria-label={t.top}
              className="group flex h-11 w-11 items-center justify-center rounded-lg bg-indigo text-white transition-colors hover:bg-indigo-soft"
            >
              <ArrowUp size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-6 text-sm text-mute">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.rights} <span className="hidden sm:inline">{t.built}</span>
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-5">
            <a href={`/${lang}/privacy`} className="link-underline hover:text-paper">
              {t.privacy}
            </a>
            <a href={`/${lang}/terms`} className="link-underline hover:text-paper">
              {t.terms}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
