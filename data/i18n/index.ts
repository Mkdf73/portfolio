import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import type { Locale } from "./config";
import type { Dict } from "./types";

const dictionaries: Record<Locale, Dict> = { en, fr, es };

export const getDict = (locale: Locale): Dict => dictionaries[locale];
