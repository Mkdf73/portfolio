"use client";

import { usePathname } from "next/navigation";
import { getDict } from "@/data/i18n";
import { isLocale } from "@/data/i18n/config";

export default function NotFound() {
  const seg = usePathname()?.split("/")[1] ?? "en";
  const lang = isLocale(seg) ? seg : "en";
  const t = getDict(lang).notFound;
  return (
    <main id="main" className="flex min-h-[80vh] items-center pt-24">
      <div className="container-page text-center">
        <p className="hero-rise font-serif text-8xl italic text-indigo sm:text-9xl">404</p>
        <h1 className="hero-rise mt-4 text-3xl font-medium sm:text-4xl" style={{ animationDelay: "100ms" }}>
          {t.title}
        </h1>
        <p className="hero-rise mt-3 text-mute" style={{ animationDelay: "180ms" }}>
          {t.text}
        </p>
        <a href={`/${lang}`} className="hero-rise btn btn-primary mt-8" style={{ animationDelay: "260ms" }}>
          {t.back}
        </a>
      </div>
    </main>
  );
}
