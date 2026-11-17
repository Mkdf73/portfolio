"use client";

import { Download, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { FacebookIcon, SnapchatIcon, GithubIcon, LinkedinIcon, TiktokIcon } from "@/components/BrandIcons";
import { localeLabels, locales, type Locale } from "@/data/i18n/config";
import type { Dict } from "@/data/i18n/types";
import { getCv, site, snapchatUrl, socials } from "@/data/site";

export function Nav({ lang, t, cvLabel }: { lang: Locale; t: Dict["nav"]; cvLabel: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");
  const home = `/${lang}`;
  const cv = getCv(lang);

  const links = [
    { href: `${home}#about`, label: t.about },
    { href: `${home}#skills`, label: t.skills },
    { href: `${home}#projects`, label: t.projects },
    { href: `${home}#content`, label: t.content },
    { href: `${home}#experience`, label: t.experience },
    { href: `${home}#contact`, label: t.contact },
  ];

  const networks = [
    { label: "LinkedIn", href: socials.linkedin, Icon: LinkedinIcon },
    { label: "GitHub", href: socials.github, Icon: GithubIcon },
    { label: "TikTok", href: socials.tiktok, Icon: TiktokIcon },
    { label: "Facebook", href: socials.facebook, Icon: FacebookIcon },
    { label: "Snapchat", href: snapchatUrl, Icon: SnapchatIcon },
  ];

  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // Section visible à l'écran : sert à souligner le bon lien du menu.
  useEffect(() => {
    const ids = ["about", "skills", "projects", "content", "experience", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      if (window.scrollY < 200) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur transition-all duration-300 ${scrolled || open ? "border-paper/10 bg-ink-950/90 shadow-[0_8px_30px_-20px_rgba(20,23,43,0.35)]" : "border-transparent bg-ink-950/40"}`}>
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <a href={`${home}#top`} className="flex items-center gap-3 font-medium" onClick={() => setOpen(false)}>
            <Image src={site.avatar} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo/20 transition-transform duration-300 hover:scale-110" />
            <span>{site.name}</span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            <MotionConfig reducedMotion="user">
              {links.map((l) => {
                const isActive = l.href.endsWith(`#${active}`) && active !== "";
                return (
                  <a key={l.href} href={l.href} aria-current={isActive ? "location" : undefined} className={`relative py-2 text-sm transition-colors hover:text-paper ${isActive ? "text-paper" : "text-mute"}`}>
                    {l.label}
                    {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-indigo" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  </a>
                );
              })}
            </MotionConfig>
          </nav>
          <div className="flex items-center gap-4">
            <ul className="flex items-center gap-3 text-sm" aria-label={t.language}>
              {locales.map((l) => (
                <li key={l}>
                  <a
                    href={`/${l}${rest ? `/${rest}` : ""}`}
                    hrefLang={l}
                    lang={l}
                    aria-current={l === lang ? "true" : undefined}
                    title={localeLabels[l]}
                    className={l === lang ? "font-semibold text-paper" : "text-mute hover:text-paper"}
                  >
                    {l.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-paper/15 lg:hidden"
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Le menu mobile est hors du <header> : le flou d'arrière-plan du header
          piégerait un élément fixed et le rendrait invisible. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-ink-950 px-5 pb-8 pt-2 lg:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                className="flex items-center justify-between border-b border-paper/10 py-5 text-2xl font-medium"
              >
                {l.label}
                <span className="font-mono text-xs text-mute">0{i + 1}</span>
              </motion.a>
            ))}
            {cv && (
              <a href={cv} download onClick={() => setOpen(false)} className="btn btn-primary mt-8">
                <Download size={18} aria-hidden="true" />
                {cvLabel}
              </a>
            )}
            <ul className="mt-8 flex items-center gap-3">
              {networks.filter((n) => n.href).map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-paper/15 text-mute hover:border-paper/40 hover:text-paper"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
