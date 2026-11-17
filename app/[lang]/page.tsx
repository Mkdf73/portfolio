import { notFound } from "next/navigation";
import { isLocale } from "@/data/i18n/config";
import { getDict } from "@/data/i18n";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Content } from "@/sections/Content";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Timeline } from "@/sections/Timeline";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <main id="main">
        <Hero lang={lang} t={t.hero} />
        <About t={t.about} />
        <Skills t={t.skills} />
        <Projects t={t.projects} />
        <Content t={t.content} />
        <Timeline t={t.timeline} />
        <Contact lang={lang} t={t.contact} />
      </main>
      <Footer lang={lang} t={t.footer} />
    </>
  );
}
