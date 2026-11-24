/**
 * Données qui ne dépendent pas de la langue : liens, emails, piles techniques.
 * Les textes traduits sont dans data/i18n/en.ts, fr.ts et es.ts.
 */
import {
  siC, siCelery, siDocker, siFastapi, siGit, siGithub, siGithubactions, siJavascript, siJsonwebtokens, siLinux, siN8n, siNextdotjs,
  siNginx, siOpenapiinitiative, siPhp, siPostgresql, siPydantic, siPython, siTiktok, siFacebook, siReact, siRedis, siSqlite, siTailwindcss, siTypescript, siVite,
} from "simple-icons";

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "Mohamed Kadafi",
  // Le nom de domaine reste à acheter et brancher sur Vercel (voir README).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
  emails: { primary: "Mohamedkadafi47@gmail.com", secondary: "Roimhd7@gmail.com" },
  photo: "/photo.jpg",
  avatar: "/avatar.jpg",
  /**
   * Numéro WhatsApp au format international, chiffres uniquement, sans + ni espaces (ex: "2376XXXXXXXX").
   * Tant que la valeur est vide, aucun bouton WhatsApp ne s'affiche.
   */
  whatsapp: "237693765574",
  /** Adresse postale pour la page de confidentialité. Laisse vide pour ne pas l'afficher. */
  address: "",
};

/**
 * CV téléchargeable. Place le PDF dans /public (ex: public/cv-mohamed-kadafi-fr.pdf) puis renseigne le chemin.
 * Tant que la valeur est null, le bouton ne s'affiche pas.
 */
export const cv: Record<"en" | "fr" | "es", string | null> = {
  en: "/cv-mohamed-kadafi.pdf",
  fr: "/cv-mohamed-kadafi-fr.pdf",
  es: null,
};
export const getCv = (lang: "en" | "fr" | "es") => cv[lang] ?? cv.en ?? cv.fr ?? cv.es;

export const socials = {
  github: "https://github.com/Mkdf73",
  linkedin: "https://www.linkedin.com/in/kadafi-mohamed",
  tiktok: "https://www.tiktok.com/@roi.mhd",
  facebook: "https://www.facebook.com/share/1EgCpn64uq/",
  /** Lien du profil Snapchat. Tant que la valeur est vide, Snapchat ne s'affiche pas. */
  snapchat: "https://snapchat.com/t/LqJ0TsqF",
};
export const snapchatUrl = socials.snapchat;

/**
 * Un outil : son nom, et soit le logo officiel (simple-icons, avec sa couleur de marque),
 * soit un monogramme (2 lettres + couleur) quand le logo n'est pas disponible librement.
 */
type SimpleIcon = { path: string; title: string; hex: string };
export type Tool = { name: string; icon?: SimpleIcon; mono?: { text: string; color: string } };
export type SkillKey = "languages" | "backend" | "frontend" | "database" | "devops" | "media";

const t = (name: string, icon: SimpleIcon): Tool => ({ name, icon });
const m = (name: string, text: string, color: string): Tool => ({ name, mono: { text, color } });

export const skillGroups: { key: SkillKey; tools: Tool[] }[] = [
  { key: "languages", tools: [t("Python", siPython), t("TypeScript", siTypescript), t("JavaScript", siJavascript), t("PHP", siPhp), t("C", siC), m("SQL", "SQL", "#336791")] },
  { key: "backend", tools: [t("FastAPI", siFastapi), t("Pydantic", siPydantic), t("REST API", siOpenapiinitiative), m("WebSocket", "WS", "#3A3A3A"), t("Celery", siCelery), t("JWT", siJsonwebtokens)] },
  { key: "frontend", tools: [t("React", siReact), t("Next.js", siNextdotjs), t("Tailwind CSS", siTailwindcss), t("Vite", siVite)] },
  { key: "database", tools: [t("PostgreSQL", siPostgresql), t("Redis", siRedis), t("SQLite", siSqlite), m("Alembic", "Al", "#6B4E2E")] },
  { key: "devops", tools: [t("Docker", siDocker), t("Git", siGit), t("GitHub", siGithub), t("GitHub Actions", siGithubactions), t("n8n", siN8n), t("Linux", siLinux), t("Nginx", siNginx)] },
  { key: "media", tools: [m("Sora", "So", "#111111"), m("Seedance", "Sd", "#1F6FEB"), m("Higgsfield", "Hf", "#2E2E2E"), m("CapCut", "Cc", "#000000"), m("Canva", "Ca", "#00A3AD"), t("TikTok", siTiktok), t("Facebook", siFacebook)] },
];

/** Tous les outils, sans doublon, pour la bande défilante sous le Hero. */
export const allTools: Tool[] = skillGroups.flatMap((g) => g.tools);

export type ProjectMeta = { slug: string; stack: string[]; image: string | null; github: string | null; live: string | null };

export const projectsMeta: ProjectMeta[] = [
  {
    slug: "sygalin-connect",
    stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Redis", "Docker", "Alembic", "JWT", "Celery"],
    image: null,
    github: "https://github.com/Mkdf73/sygalin-connect",
    live: null,
  },
  { slug: "documenso", stack: ["Documenso", "Self-hosting"], image: null, github: "https://github.com/Mkdf73/documenso", live: null },
  { slug: "paylinko", stack: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Redis", "Playwright"], image: null, github: "https://github.com/Mkdf73/paylinko", live: null },
];

export const timelineStacks: Record<string, string[]> = {
  "sygalin-connect": ["FastAPI", "PostgreSQL", "Redis", "Celery", "Docker"],
};

/**
 * Vidéos à afficher dans la section vidéo (cartes avec lien, sans intégration).
 * Exemple : { title: "Titre de la vidéo", platform: "TikTok", url: "https://www.tiktok.com/@roi.mhd/video/..." }
 * Tant que la liste est vide, la grille n'apparaît pas.
 */
export type VideoLink = { title: string; platform: "TikTok" | "Facebook" | "YouTube" | "X"; url: string };
export const videos: VideoLink[] = [
  { title: "L'amour sans confiance", platform: "Facebook", url: "https://www.facebook.com/share/r/1CUcW4gffY/?mibextid=wwXIfr" },
  { title: "Un mariage sans amour", platform: "TikTok", url: "https://vm.tiktok.com/ZN8SGuewL/" },
  { title: "Trois voix : une décision", platform: "TikTok", url: "https://vm.tiktok.com/ZN8SGhWYn/" },
];

/** Lien WhatsApp (wa.me) avec un message pré-rempli, ou null si aucun numéro n'est renseigné. */
export const whatsappLink = (text: string) => (site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : null);
