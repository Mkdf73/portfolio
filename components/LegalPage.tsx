import type { Locale } from "@/data/i18n/config";
import type { Dict } from "@/data/i18n/types";
import { site } from "@/data/site";
import { Footer } from "@/sections/Footer";

export function LegalPage({ lang, t, kind }: { lang: Locale; t: Dict; kind: "privacy" | "terms" }) {
  const page = t.legal[kind];
  return (
    <>
      <main id="main" className="pt-32 pb-20">
        <div className="container-page max-w-3xl">
          <a href={`/${lang}`} className="text-sm text-mute hover:text-paper">
            {t.legal.back}
          </a>
          <h1 className="mt-6 text-4xl font-medium sm:text-5xl">{page.title}</h1>
          <p className="mt-3 text-sm text-mute">{t.legal.updated}</p>
          <div className="mt-10 space-y-9">
            {page.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-medium">{s.heading}</h2>
                <div className="mt-3 space-y-3 text-paper/85">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
            <p className="text-paper/85">
              {site.emails.primary} / {site.emails.secondary}
              {site.address ? ` | ${site.address}` : ""}
            </p>
          </div>
        </div>
      </main>
      <Footer lang={lang} t={t.footer} />
    </>
  );
}
