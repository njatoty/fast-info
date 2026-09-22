import type { Locale } from "@/lib/i18n/locales";

interface VerseText {
  text: string;
  reference: string;
}

export interface BibleVerse {
  fr: VerseText;
  mg: VerseText;
}

// Louis Segond (LSG) for French, Baiboly Protestanta Malagasy (MG1865) for Malagasy —
// both public-domain translations from the same Reformed textual tradition, so the
// verse numbering lines up one-to-one between the two languages.
export const bibleVerses: BibleVerse[] = [
  {
    fr: {
      text: "Recommande à l'Éternel tes œuvres, et tes projets réussiront.",
      reference: "Proverbes 16.3",
    },
    mg: {
      text: "Ankino amin'i Jehovah ny asanao, Dia ho lavorary izay kasainao.",
      reference: "Ohabolana 16.3",
    },
  },
  {
    fr: {
      text: "Tout ce que vous faites, faites-le de bon cœur, comme pour le Seigneur et non pour des hommes, sachant que vous recevrez du Seigneur l'héritage pour récompense.",
      reference: "Colossiens 3.23-24",
    },
    mg: {
      text: "Ary na inona na inona no ataonareo, dia ataovy amin'ny fo, tahaka ny ho an'ny Tompo, fa tsy ho an'olona, satria fantatrareo fa ny Tompo no handraisanareo ny lova ho valiny.",
      reference: "Kolosiana 3.23-24",
    },
  },
  {
    fr: {
      text: "Je puis tout par celui qui me fortifie.",
      reference: "Philippiens 4.13",
    },
    mg: {
      text: "Mahay ny zavatra rehetra aho ao amin'ilay mampahery ahy.",
      reference: "Filipiana 4.13",
    },
  },
  {
    fr: {
      text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse ; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.",
      reference: "Proverbes 3.5-6",
    },
    mg: {
      text: "Matokia an'i Jehovah amin'ny fonao rehetra, Fa aza miankina amin'ny fahalalanao; Maneke Azy amin'ny alehanao rehetra, Fa Izy handamina ny lalanao.",
      reference: "Ohabolana 3.5-6",
    },
  },
  {
    fr: {
      text: "Tout ce que ta main trouve à faire avec ta force, fais-le.",
      reference: "Ecclésiaste 9.10",
    },
    mg: {
      text: "Izay rehetra azon'ny tananao atao dia ataovy amin'ny herinao.",
      reference: "Mpitoriteny 9.10",
    },
  },
  {
    fr: {
      text: "Soit donc que vous mangiez, soit que vous buviez, soit que vous fassiez quelque autre chose, faites tout pour la gloire de Dieu.",
      reference: "1 Corinthiens 10.31",
    },
    mg: {
      text: "Koa amin'izany, na mihinana na misotro ianareo, na inona na inona ataonareo, dia ataovy ho voninahitr'Andriamanitra izany rehetra izany.",
      reference: "1 Korintiana 10.31",
    },
  },
  {
    fr: {
      text: "Si tu vois un homme habile dans son ouvrage, il se tient auprès des rois ; il ne se tient pas auprès des gens obscurs.",
      reference: "Proverbes 22.29",
    },
    mg: {
      text: "Mahita olona mailaka amin'ny raharahany va ianao? Eo anatrehan'ny mpanjaka no hitsanganany, Fa tsy hitsangana eo anatrehan'ny olona ambany izy.",
      reference: "Ohabolana 22.29",
    },
  },
  {
    fr: {
      text: "Si l'Éternel ne bâtit la maison, ceux qui la bâtissent travaillent en vain.",
      reference: "Psaume 127.1",
    },
    mg: {
      text: "Raha tsy Jehovah no manao ny trano, Dia miasa foana ny mpanao azy.",
      reference: "Salamo 127.1",
    },
  },
];

/** Deterministic per day (UTC) so the verse is stable across requests within a day, yet changes daily. */
export function getVerseOfTheDay(date: Date = new Date()): BibleVerse {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const dayOfYear = Math.floor(diff / 86_400_000);
  return bibleVerses[dayOfYear % bibleVerses.length];
}

export function getVerseText(verse: BibleVerse, locale: Locale): VerseText {
  return verse[locale];
}
