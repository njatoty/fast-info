import { cookies } from "next/headers";
import { cache } from "react";

import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./locales";

export const getLocale = cache(async (): Promise<Locale> => {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
});
