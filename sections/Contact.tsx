import { Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { Locale } from "@/data/i18n/config";
import type { Dict } from "@/data/i18n/types";
import { getCv, site, socials, whatsappLink } from "@/data/site";

const row = "group flex min-h-12 items-center gap-3 rounded-lg border border-paper/15 bg-ink-900 px-4 transition-all duration-300 hover:translate-x-1 hover:border-indigo/50 hover:text-indigo";

export function Contact({ lang, t }: { lang: Locale; t: Dict["contact"] }) {
  const wa = whatsappLink(t.whatsappText);
  return (
    <Section id="contact" eyebrow={t.eyebrow} title={t.title} accent={t.accent} intro={t.text}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal from="left">
        <ul className="space-y-3">
          {wa && (
            <li>
              <a href={wa} target="_blank" rel="noopener noreferrer" className={`${row} border-[#25D366]/40 bg-[#25D366]/5`}>
                <WhatsappIcon className="text-[#25D366]" />
                <span>{t.whatsapp}</span>
                <span className="ml-auto text-sm text-mute">+{site.whatsapp}</span>
              </a>
            </li>
          )}
          {[site.emails.primary, site.emails.secondary].map((email) => (
            <li key={email}>
              <a href={`mailto:${email}`} className={row}>
                <Mail size={20} aria-hidden="true" />
                <span className="break-all">{email}</span>
              </a>
            </li>
          ))}
          {getCv(lang) && (
            <li>
              <a href={getCv(lang)!} download className={row}>
                <Download size={20} aria-hidden="true" />
                {t.cv}
              </a>
            </li>
          )}
          <li>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={row}>
              <LinkedinIcon /> LinkedIn
            </a>
          </li>
          <li>
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className={row}>
              <GithubIcon /> GitHub
            </a>
          </li>
        </ul>
        </Reveal>
        <Reveal from="right" delay={0.1}>
          <ContactForm lang={lang} t={t.form} />
        </Reveal>
      </div>
    </Section>
  );
}
