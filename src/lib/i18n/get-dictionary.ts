import { cache } from "react";

import { fr, type Dictionary } from "./dictionaries/fr";
import { mg } from "./dictionaries/mg";
import { getLocale } from "./get-locale";
import type { Locale } from "./locales";

const dictionaries: Record<Locale, Dictionary> = { fr, mg };

export const getDictionary = cache(async (): Promise<Dictionary> => {
  const locale = await getLocale();
  return dictionaries[locale];
});

export type { Dictionary };
