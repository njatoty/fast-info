import type { Dictionary } from "./fr";

// Termes techniques/commerciaux volontairement laissés en français (accessoires, écrans,
// stockage, catalogue, WhatsApp, E-mail...) : ce sont les mots réellement utilisés par les
// commerçants et clients malgaches au quotidien — les traduire littéralement sonnerait faux.
export const mg: Dictionary = {
  nav: {
    home: "Fandraisana",
    products: "Vokatra",
    services: "Serivisy",
    offers: "Tolotra",
    gallery: "Sary",
    events: "Hetsika",
    about: "Momba anay",
    contact: "Contact",
    megaMenu: {
      products: {
        categoriesLabel: "Sokajy",
        featuredLabel: "Voafantina",
        viewAll: "Jereo ny catalogue manontolo",
      },
      services: {
        listLabel: "Ny serivisinay",
        featuredLabel: "Voafantina",
        viewAll: "Jereo ny serivisy rehetra",
      },
    },
  },
  common: {
    call: "Antsoy",
    callBrandTemplate: "Antsoy ny {brand}",
    openMenu: "Sokafy ny menu",
  },
  theme: {
    toggleLabel: "Ovay ny endrika",
    light: "Mazava",
    dark: "Maizina",
    system: "Système",
  },
  language: {
    toggleLabel: "Ovay ny fiteny",
    fr: "Français",
    mg: "Malagasy",
  },
  footer: {
    explore: "Rohy",
    company: "Orinasa",
    contact: "Contact",
    rights: "Zo rehetra voatokana.",
  },
  meta: {
    home: {
      title: "Fandraisana",
    },
    products: {
      title: "Vokatra",
      description:
        "Finday, accessoires, écrans, stockage, audio ary informatika — ny catalogue an'ny FastInfo any Antananarivo.",
    },
    services: {
      title: "Serivisy",
      description:
        "Fanontana, fanaovana kopia, fanoratana antontan-taratasy ary fakan-tsary hetsika — ny serivisin'ny FastInfo any Antananarivo.",
    },
    offers: {
      title: "Tolotra",
      description: "Ny tolotra eo an-toerana ao amin'ny FastInfo — vokatra sy serivisy amin'ny vidiny mihena.",
    },
    gallery: {
      title: "Sary",
      description:
        "Fampakaram-bady, fitsingerenan'ny nahaterahana, hetsiky ny orinasa ary sary hoso-doko — ny sary an'ny FastInfo.",
    },
    events: {
      title: "Hetsika",
      description: "Fampakaram-bady, fitsingerenan'ny nahaterahana ary hetsiky ny orinasa noraisin'ny FastInfo.",
    },
    about: {
      title: "Momba anay",
      description: "Ny tantara, ny tanjona ary ny ekipan'ny FastInfo any Antananarivo.",
    },
    contact: {
      title: "Contact",
      description: "Mifandraisa amin'ny FastInfo amin'ny telefaonina, WhatsApp, e-mail na amin'ny taratasy an-tserasera.",
    },
  },
  home: {
    hero: {
      eyebrow: "Antananarivo · Finday, informatika ary fakan-tsary",
      ctaProducts: "Jereo ny vokatra",
      ctaContact: "Mifandraisa aminay",
      imageAlt1: "Ny tontolon'ny teknolojia ao amin'ny FastInfo",
      imageAlt2: "Fitaovana fakan-tsary an'ny FastInfo",
    },
    categories: {
      photography: "Fakantsary",
    },
    featuredProducts: {
      eyebrow: "Catalogue",
      title: "Vokatra voafantina",
      description: "Finday, accessoires ary fitaovana voafantina ho an'ny fiainana andavanandro.",
      cta: "Jereo ny catalogue manontolo",
    },
    services: {
      eyebrow: "Serivisy",
      title: "Serivisy ho an'ny fiainanao andavanandro",
      description: "Manomboka amin'ny fanontana ka hatramin'ny fakan-tsary, misy ekipan'ny FastInfo vonona hanampy anao.",
      cta: "Fantaro bebe kokoa",
    },
    offers: {
      eyebrow: "Tolotra amin'izao fotoana izao",
      title: "Fampihenam-bidy tsy azo very maina",
      description: "Fampihenam-bidy vonjimaika amin'ny vokatra sy serivisy voafantina.",
      cta: "Jereo ny tolotra rehetra",
    },
    gallery: {
      eyebrow: "Fakantsary",
      title: "Ireo sary nalainay",
      description:
        "Fampakaram-bady, fitsingerenan'ny nahaterahana, hetsiky ny orinasa — santionany amin'ny asa fakan-tsarinay.",
      cta: "Jereo ny sary rehetra",
    },
    events: {
      eyebrow: "Hetsika vao haingana",
      title: "Ireo tetikasa fakan-tsary farany",
      cta: "Jereo ny hetsika rehetra",
    },
    location: {
      eyebrow: "Ahitana anay",
      titleTemplate: "Ahitanao anay any {city}",
      directions: "Hakana ny lalana",
    },
    contactBand: {
      title: "Manana fanontaniana na tetikasa ve ianao? Andao hiresaka.",
      description: "Mamaly haingana ny ekipanay, na amin'ny telefaonina, WhatsApp, na amin'ny taratasy fifandraisana.",
      formCta: "Taratasy fifandraisana",
    },
  },
  products: {
    list: {
      eyebrow: "Catalogue",
      title: "Ny vokatray",
      description: "Finday, accessoires, écrans, stockage ary informatika — vokatra voafantina haharitra.",
      all: "Rehetra",
      empty: "Tsy misy vokatra amin'ity sokajy ity amin'izao fotoana izao.",
    },
    detail: {
      breadcrumb: "Vokatra",
      relatedEyebrow: "Mba jereo koa",
      relatedTitle: "Vokatra mitovitovy",
      inquiryMessageTemplate: "Manao ahoana, liana amin'ity aho : {name}.",
    },
    availability: {
      in_stock: "Misy",
      out_of_stock: "Lany",
      on_order: "Filazana mialoha",
    },
  },
  services: {
    list: {
      eyebrow: "Serivisy",
      title: "Ny serivisinay",
      description: "Manomboka amin'ny fanontana ka hatramin'ny fakan-tsary hetsika, misy ekipa vonona amin'ny filanao rehetra.",
    },
    detail: {
      breadcrumb: "Serivisy",
      inquiryMessageTemplate: "Manao ahoana, te-hahafantatra bebe kokoa momba ity aho : {title}.",
    },
  },
  offers: {
    eyebrow: "Tolotra",
    title: "Tolotra amin'izao fotoana izao",
    description: "Fampihenam-bidy vonjimaika amin'ny vokatra sy serivisy voafantina.",
    empty: "Tsy misy tolotra amin'izao fotoana izao. Mba miverena tsy ela !",
    validUntilTemplate: "Manan-kery hatramin'ny {date}",
  },
  gallery: {
    eyebrow: "Fakantsary",
    title: "Sary",
    description: "Santionany amin'ny fakan-tsary nataonay tamin'ny fampakaram-bady, fitsingerenan'ny nahaterahana ary hetsiky ny orinasa.",
    all: "Rehetra",
    empty: "Tsy misy sary amin'ity sokajy ity amin'izao fotoana izao.",
  },
  events: {
    list: {
      eyebrow: "Hetsika",
      title: "Ny tetikasa fakan-tsarinay",
      description: "Hetsika sasany noraisin'ny ekipanay, manomboka amin'ny fampakaram-bady ka hatramin'ny seminera orinasa.",
      empty: "Tsy misy hetsika navoaka amin'izao fotoana izao.",
    },
    detail: {
      breadcrumb: "Hetsika",
    },
  },
  about: {
    eyebrow: "Momba anay",
    title: "Ekipa iray, fahaiza-manao telo mifameno",
    intro:
      "Eto {city} no ipetrahan'ny birao'nay, ary manampy ny olona tsirairay sy ny orinasa amin'ny filany ara-teknolojia, ara-panjakana ary ara-panaovan-tsary izahay. Ny mampiavaka anay dia ny fahaizana manao zavatra maro, ny hafainganam-pandraisana ary ny fitiavan'ny asa tsara.",
    imageAlt: "Ekipan'ny FastInfo miasa",
    values: [
      {
        title: "Teknolojia azo ampiasaina",
        description: "Vokatra azo itokisana, voafantina mba haharitra, amin'ny vidiny mifanentana.",
      },
      {
        title: "Serivisy akaiky ny mponina",
        description: "Fanontana, fanaovana kopia ary fanoratana antontan-taratasy, tsy mila fotoana voafaritra mialoha.",
      },
      {
        title: "Fahaiza-maka sary",
        description: "Ekipa mahay maka sary amin'ny hetsikao, amim-pitandremana manokana.",
      },
      {
        title: "Fitokiana eto an-toerana",
        description: "Orinasa miorina tsara any Antananarivo, ka manompo ny fiaraha-monina eo aminy.",
      },
    ],
    whyTitle: "Nahoana no FastInfo ?",
    whyDescription:
      "Satria eto aminay ihany no ahitana ny fivarotana vokatra teknolojika, ny serivisy ara-panjakana ilaina ary ny fahaiza-maka sary amin'ny hetsika. Mpiara-miasa tokana, ekipa mahalala anao, ary fanomezan-toky amin'ny kalitao amin'ny asa rehetra ataonay.",
    verseEyebrow: "Andinin-Baiboly androany",
  },
  contact: {
    eyebrow: "Contact",
    title: "Andao hiresaka momba ny tetikasanao",
    description: "Manana fanontaniana momba ny vokatra, ny serivisy na ny hetsika tokony horakofana ve ianao ? Soraty izahay, ary hovalianay haingana ianao.",
    phoneLabel: "Telefaonina",
    whatsappLabel: "WhatsApp",
    emailLabel: "E-mail",
    addressLabel: "Adiresy",
    hoursLabel: "Ora fisokafana",
    form: {
      name: "Anarana feno",
      email: "E-mail",
      phone: "Telefaonina (tsy voatery)",
      subject: "Lohahevitra (tsy voatery)",
      message: "Hafatra",
      submit: "Alefaso ny hafatra",
      successTitle: "Misaotra, tafaverina soa aman-tsara ny hafatrao.",
      successDescription: "Hovalian'ny ekipanay haingana ianao.",
      sendAnother: "Alefaso hafatra hafa",
      toastSuccess: "Nalefa ny hafatra — hovalianay haingana ianao.",
      toastError: "Nisy olana. Andramo indray azafady.",
    },
  },
  inquiry: {
    call: "Antsoy",
    whatsapp: "WhatsApp",
    form: "Taratasy",
  },
  lightbox: {
    close: "Hidio",
    previous: "Sary teo aloha",
    next: "Sary manaraka",
    fallbackTitle: "Sary",
  },
  whatsappFab: {
    label: "Miresaha amin'ny WhatsApp",
  },
};
