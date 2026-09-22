import { Quote } from "lucide-react";

import { Eyebrow } from "@/components/public/eyebrow";
import { Reveal } from "@/components/public/reveal";
import { getVerseOfTheDay, getVerseText } from "@/lib/data/bible-verses";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";

export async function BibleVerse() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const verse = getVerseText(getVerseOfTheDay(), locale);

  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <Eyebrow align="center">{dict.about.verseEyebrow}</Eyebrow>
      <Quote className="mx-auto size-6 text-primary" strokeWidth={1.5} aria-hidden />
      <blockquote className="mt-4 text-balance font-heading text-xl leading-snug font-medium tracking-tight sm:text-2xl">
        {verse.text}
      </blockquote>
      <cite className="mt-4 block text-sm text-muted-foreground not-italic">{verse.reference}</cite>
    </Reveal>
  );
}
