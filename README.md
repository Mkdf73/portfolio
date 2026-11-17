# Portfolio de Mohamed Kadafi

Site en ligne : **https://mohamed-kadafi.vercel.app**

Portfolio d'une page, en trois langues (anglais, français, espagnol), avec pages de politique de confidentialité et de conditions d'utilisation.

## Stack

- Next.js (App Router) et TypeScript
- Tailwind CSS 3
- Motion pour les animations (titres qui se dévoilent mot par mot, cartes en cascade, couvertures de projets avec profondeur, cartes vidéo empilées, soulignement du menu actif, barre de progression de lecture)
- Animations CSS pour le Hero (nom, photo, cercles qui dérivent) et la bande d'outils défilante
- Toutes les animations se coupent si le visiteur a activé « réduire les animations » sur son appareil
- Lucide (icônes), logos d'outils via `simple-icons`, icônes de réseaux en SVG
- DM Sans et Instrument Serif, auto-hébergées via `@fontsource`

## Lancer le projet

Commandes compatibles PowerShell :

```
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:3000 et redirige vers `/en`, `/fr` ou `/es` selon la langue du navigateur.

Build de production : `npm run build` puis `npm run start`. Vérification des types : `npm run typecheck`.

## Modifier le contenu

| Quoi | Où |
|---|---|
| Textes (EN, FR, ES), pages légales | `data/i18n/en.ts`, `fr.ts`, `es.ts` |
| Numéro WhatsApp (`whatsapp`, format 237XXXXXXXXX), emails, liens, outils et logos (monogrammes pour les outils sans logo libre), dépôts GitHub, images de projets | `data/site.ts` |
| Photo de profil | `public/photo.jpg` |
| CV téléchargeable | `public/cv-mohamed-kadafi.pdf` et chemin dans `data/site.ts` (`cv`) |
| Logo de la barre de navigation | `public/avatar.jpg` |
| Favicon | `app/icon.png` et `app/apple-icon.png` |
| Couleurs | `tailwind.config.ts` et `app/globals.css` |

Champs laissés vides à remplir quand tu as l'information (ils ne s'affichent pas tant qu'ils sont vides) :

- `period` des formations dans `data/i18n/*.ts` (section `timeline`)
- `address` dans `data/site.ts` (adresse affichée dans la page de confidentialité)
- `image` de chaque projet dans `data/site.ts` (mettre le fichier dans `public/projects/`)

### Ajouter une langue

1. Copier `data/i18n/en.ts` en `data/i18n/de.ts` (par exemple) et traduire les textes.
2. Ajouter le code dans `data/i18n/config.ts` (`locales` et `localeLabels`) et dans `data/i18n/index.ts`.

Le sélecteur de langue, le sitemap et les balises `hreflang` se mettent à jour tout seuls.

## Variables d'environnement

Copie `.env.example` en `.env.local` (PowerShell : `Copy-Item .env.example .env.local`).

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL finale du site (canonical, sitemap, Open Graph) |
| `RESEND_API_KEY` | Clé API Resend pour le formulaire de contact |
| `CONTACT_TO_EMAIL` | Adresse qui reçoit les messages |
| `CONTACT_FROM_EMAIL` | Expéditeur validé dans Resend |

Le formulaire de contact envoie les messages via [Resend](https://resend.com). **Sans ces variables il ne peut pas envoyer** : il affiche alors un message invitant à écrire par email.

## Mise en ligne sur Vercel (pas à pas, PowerShell)

### 1. Mettre le projet sur GitHub

Crée d'abord un dépôt vide sur github.com (par exemple `portfolio`, sans README). Puis, dans le dossier du projet :

```powershell
git init
git add .
git commit -m "Portfolio Mohamed Kadafi"
git branch -M main
git remote add origin https://github.com/Mkdf73/portfolio.git
git push -u origin main
```

### 2. Créer le projet sur Vercel

1. Va sur vercel.com, connecte-toi avec GitHub.
2. Add New, Project, puis importe le dépôt `portfolio`. Vercel reconnaît Next.js tout seul : ne change aucun réglage.
3. Dans Environment Variables, ajoute les variables du tableau ci-dessus (au minimum `NEXT_PUBLIC_SITE_URL`).
4. Deploy. Le site est en ligne sur une adresse du type `portfolio-xxx.vercel.app`.

Sans `NEXT_PUBLIC_SITE_URL`, le site utilise automatiquement l'adresse Vercel de production pour le sitemap et les aperçus de partage.

### 3. Brancher ton nom de domaine

1. Achète le domaine chez un registrar (Namecheap, Porkbun, Cloudflare...) ou directement dans Vercel (Domains, Buy).
2. Vercel : Project Settings, Domains, Add, puis entre ton domaine.
3. Chez le registrar, ajoute les enregistrements DNS que Vercel affiche (en général un enregistrement A vers `76.76.21.21` pour le domaine et un CNAME `cname.vercel-dns.com` pour `www`). Le HTTPS est activé automatiquement.
4. Mets `NEXT_PUBLIC_SITE_URL=https://ton-domaine.com` dans Vercel, puis Deployments, Redeploy.
5. Soumets `https://ton-domaine.com/sitemap.xml` dans Google Search Console.

### 4. Activer le formulaire de contact (Resend)

1. Crée un compte sur resend.com, ajoute ton domaine et copie les enregistrements DNS demandés chez ton registrar.
2. Crée une clé API.
3. Dans Vercel, renseigne `RESEND_API_KEY`, `CONTACT_TO_EMAIL` et `CONTACT_FROM_EMAIL` (ex. `Portfolio <contact@ton-domaine.com>`), puis redéploie.

### 5. Mettre à jour le site plus tard

Chaque modification envoyée sur GitHub est mise en ligne automatiquement :

```powershell
git add .
git commit -m "Mise à jour"
git push
```

### Avant de lancer

- [ ] Le site s'affiche bien sur téléphone et ordinateur (`npm run build` puis `npm run start` en local)
- [ ] Domaine branché et `NEXT_PUBLIC_SITE_URL` renseignée
- [ ] Formulaire testé (un message reçu dans ta boîte)
- [ ] Favicon visible dans l'onglet (photo recadrée)
- [ ] Pages Confidentialité et Conditions d'utilisation relues
- [ ] Aperçu de partage vérifié en collant le lien dans LinkedIn ou WhatsApp

## Pages légales

La politique de confidentialité et les conditions d'utilisation sont des modèles rédigés d'après le fonctionnement réel du site (aucun cookie, aucun outil d'analyse, formulaire via Resend, hébergement Vercel). Relis-les, adapte-les à ta situation et fais-les valider si besoin. Si tu ajoutes un outil d'analyse ou un service tiers, mets-les à jour.

## Structure

```
app/[lang]/   pages par langue (accueil, privacy, terms, page 404)
app/api/      route du formulaire de contact
components/   Nav, Section, AnimatedTitle, Reveal, ToolLogo, ToolGrid, ToolMarquee,
              ProjectCover, VideoStack, Journey, ScrollProgress, ContactForm, LegalPage
sections/     Hero, About, Skills, Projects, Content, Timeline, Contact, Footer
data/         site.ts (données neutres) et i18n/ (textes par langue)
proxy.ts      redirection vers la langue du navigateur
```
