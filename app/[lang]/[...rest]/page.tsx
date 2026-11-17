import { notFound } from "next/navigation";

// Toute URL inconnue sous /en, /fr ou /es affiche la page 404 du site.
export default function CatchAll() {
  notFound();
}
