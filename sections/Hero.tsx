import { ArrowDown, Download } from "lucide-react";
import { PhotoSlot } from "@/components/PhotoSlot";
import { ToolMarquee } from "@/components/ToolMarquee";
import type { Locale } from "@/data/i18n/config";
import type { Dict } from "@/data/i18n/types";
import { allTools, getCv, site } from "@/data/site";

export function Hero({ lang, t }: { lang: Locale; t: Dict["hero"] }) {
  const [first, ...rest] = site.name.split(" ");
  const cv = getCv(lang);
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      {/* Cercles lavande en fond, qui dérivent très lentement */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="hero-grid" />
      </div>

      <div className="container-page grid items-center gap-12 pb-16 lg:grid-cols-[1.4fr_1fr] sm:pb-20">
        <div className="text-center lg:text-left">
          <p className="hero-rise eyebrow inline-flex items-center gap-3 text-indigo" style={{ animationDelay: "0ms" }}>
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-indigo" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo" />
            </span>
            {t.eyebrow}
          </p>
          <h1 className="mt-6 text-6xl font-medium leading-[0.98] sm:text-8xl" aria-label={site.name}>
            <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <span className="mask-up inline-block" style={{ animationDelay: "80ms" }}>
                {first}
              </span>
            </span>{" "}
            <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <span className="mask-up accent-serif inline-block" style={{ animationDelay: "200ms" }}>
                {rest.join(" ")}.
              </span>
            </span>
          </h1>
          <p className="hero-rise mt-6 font-serif text-3xl italic text-mute sm:text-4xl" style={{ animationDelay: "380ms" }}>
            {t.tagline}
          </p>
          <p className="hero-rise mx-auto mt-6 max-w-xl text-lg text-mute lg:mx-0" style={{ animationDelay: "480ms" }}>
            {t.lead}
          </p>
          <div className="hero-rise mt-9 flex flex-wrap justify-center gap-3 lg:justify-start" style={{ animationDelay: "580ms" }}>
            <a href={`/${lang}#projects`} className="btn btn-primary group">
              {t.ctaWork}
              <ArrowDown size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a href={`/${lang}#contact`} className="btn btn-ghost">
              {t.ctaContact}
            </a>
            {cv && (
              <a href={cv} download className="btn btn-ghost group">
                <Download size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5" />
                {t.ctaCv}
              </a>
            )}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
          <span aria-hidden="true" className="photo-frame absolute -inset-3 rounded-[1.4rem] border border-indigo/30" />
          <div className="photo-reveal">
            <PhotoSlot alt={t.photoAlt} className="aspect-[4/5] w-full shadow-[0_30px_60px_-30px_rgba(20,23,43,0.45)]" />
          </div>
        </div>
      </div>

      <div className="hero-rise border-y border-paper/10 bg-ink-900/60" style={{ animationDelay: "750ms" }}>
        <p className="sr-only">{t.toolsLabel}</p>
        <ToolMarquee tools={allTools} label={t.toolsLabel} />
      </div>

    </section>
  );
}
