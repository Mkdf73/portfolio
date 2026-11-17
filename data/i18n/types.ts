export type LegalSection = { heading: string; paragraphs: string[] };

export type Dict = {
  meta: { title: string; description: string };
  nav: { about: string; skills: string; projects: string; content: string; experience: string; contact: string; openMenu: string; closeMenu: string; skip: string; language: string };
  hero: { toolsLabel: string; scroll: string; eyebrow: string; tagline: string; lead: string; ctaWork: string; ctaContact: string; ctaCv: string; photoAlt: string };
  about: { eyebrow: string; title: string; accent: string; paragraphs: string[]; facts: { label: string; value: string }[] };
  skills: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    groups: { languages: string; backend: string; frontend: string; database: string; devops: string; media: string };
  };
  projects: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    labels: { problem: string; solution: string; role: string; code: string; live: string };
    items: Record<string, { category: string; status?: string; summary: string; problem?: string; solution?: string; role: string }>;
  };
  content: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    stepsTitle: string;
    toolsTitle: string;
    steps: { title: string; text: string; items?: string[] }[];
    social: { title: string; text: string; items: string[] };
    linksTitle: string;
    linksText: string;
    videosTitle: string;
    watch: string;
  };
  timeline: {
    eyebrow: string;
    title: string;
    accent: string;
    items: { id: string; kind: "work" | "study"; title: string; place: string; period: string; points: string[] }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    accent: string;
    text: string;
    emailLabel: string;
    cv: string;
    whatsapp: string;
    whatsappText: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      sent: string;
      consent: string;
      consentLink: string;
      errors: { invalid: string; not_configured: string; send_failed: string; generic: string };
    };
  };
  footer: { rights: string; top: string; privacy: string; terms: string; built: string };
  notFound: { title: string; text: string; back: string };
  legal: {
    updated: string;
    back: string;
    privacy: { title: string; sections: LegalSection[] };
    terms: { title: string; sections: LegalSection[] };
  };
};
