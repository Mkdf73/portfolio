import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/dm-sans";
import "@fontsource/instrument-serif/400-italic.css";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsappButton } from "@/components/WhatsappButton";
import { isLocale, locales } from "@/data/i18n/config";
import { getDict } from "@/data/i18n";
import { site, snapchatUrl, socials, whatsappLink } from "@/data/site";
import "../globals.css";

export const viewport: Viewport = { themeColor: "#F8F8F4", width: "device-width", initialScale: 1 };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/en" },
    },
    openGraph: { type: "website", url: `${site.url}/${lang}`, siteName: site.name, title: t.meta.title, description: t.meta.description, locale: lang },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.emails.primary}`,
    sameAs: [socials.linkedin, socials.github, socials.tiktok, socials.facebook, snapchatUrl].filter(Boolean),
    jobTitle: "Software Developer",
    address: { "@type": "PostalAddress", addressCountry: "CM" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "IUT de Ngaoundéré" },
  };

  return (
    <html lang={lang}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-paper focus:px-4 focus:py-2 focus:text-ink-950">
          {t.nav.skip}
        </a>
        <ScrollProgress />
        <Nav lang={lang} t={t.nav} cvLabel={t.hero.ctaCv} />
        {children}
        {whatsappLink(t.contact.whatsappText) && <WhatsappButton href={whatsappLink(t.contact.whatsappText)!} label={t.contact.whatsapp} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
