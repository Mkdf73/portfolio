import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { isLocale, locales } from "@/data/i18n/config";
import { getDict } from "@/data/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: getDict(lang).legal.terms.title,
    alternates: {
      canonical: `/${lang}/terms`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/terms`])),
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalPage lang={lang} t={getDict(lang)} kind="terms" />;
}
