import type { LocalizedText } from "./products";
import { sources } from "./sources";

export type ReferenceOrganisation = {
  logo: string;
  darkLogo?: boolean;
  name: string;
  href: string;
  text: LocalizedText;
};

export type ReferenceGroup = {
  title: LocalizedText;
  note: LocalizedText;
  organisations: ReferenceOrganisation[];
};

export const referenceGroups: ReferenceGroup[] = [
  {
    title: { fr: "Réseaux professionnels", de: "Berufsnetzwerke" },
    note: { fr: "Organisations utiles à la branche, à la formation et à l’économie cantonale.", de: "Organisationen für Branche, Berufsbildung und kantonale Wirtschaft." },
    organisations: [
      { logo: "/logo-sff.svg", darkLogo: true, name: "SFF · Schweizer Fleisch-Fachverband", href: "https://sff.ch/fr", text: { fr: "Organisation nationale de la branche carnée.", de: "Nationale Organisation der Fleischbranche." } },
      { logo: "/logo-ren.svg", name: "Réseau d’entreprises formatrices neuchâteloises", href: "https://reneuchatel.ch/", text: { fr: "Réseau cantonal consacré à la formation professionnelle.", de: "Kantonales Netzwerk für die Berufsbildung." } },
      { logo: "/logo-cnci.png", darkLogo: true, name: "Chambre neuchâteloise du commerce et de l’industrie", href: "https://www.cnci.ch/", text: { fr: "Secrétariat patronal et relais économique cantonal.", de: "Arbeitgebersekretariat und kantonales Wirtschaftsnetzwerk." } },
    ],
  },
  {
    title: { fr: "Protection et certification de l’IGP", de: "Schutz und Zertifizierung der IGP" },
    note: { fr: "Sources institutionnelles pour le registre, le cahier des charges et les contrôles.", de: "Institutionelle Quellen für Register, Pflichtenheft und Kontrollen." },
    organisations: [
      { logo: "/logo-igp-officiel.png", name: "Association suisse des AOP-IGP", href: sources.aopProductFr, text: { fr: "Fiche officielle des deux spécialités neuchâteloises IGP.", de: "Offizielle Produktseite der beiden IGP-Spezialitäten." } },
      { logo: "/logo-oic.svg", name: "Organisme intercantonal de certification", href: sources.oicAopIgp, text: { fr: "Organisme chargé du contrôle et de la certification.", de: "Stelle für Kontrolle und Zertifizierung." } },
      { logo: "/logo-ofag.svg", name: "Office fédéral de l’agriculture", href: sources.federalRegister, text: { fr: "Registre fédéral des appellations AOP et IGP.", de: "Bundesregister der AOP- und IGP-Bezeichnungen." } },
    ],
  },
  {
    title: { fr: "Terroir et patrimoine culinaire", de: "Terroir und kulinarisches Erbe" },
    note: { fr: "Références qui documentent ou valorisent la spécialité neuchâteloise.", de: "Referenzen, die die Neuenburger Spezialität dokumentieren oder fördern." },
    organisations: [
      { logo: "/logo-suisse-terroir.svg", name: "Suisse Terroir", href: "https://www.suisseterroir.ch/adresse/saucisson-neuchatelois-igp/2975/FR", text: { fr: "Présentation nationale du produit et de son aire d’origine.", de: "Nationale Präsentation des Produkts und seines Herkunftsgebiets." } },
      { logo: "/logo-patrimoine.svg", name: "Patrimoine culinaire suisse", href: sources.heritage, text: { fr: "Histoire, usages, fabrication et tradition de la torrée.", de: "Geschichte, Verwendung, Herstellung und Torrée-Tradition." } },
      { logo: "/logo-nvt.svg", name: "Neuchâtel Vins et Terroir", href: "https://neuchatel-vins-terroir.ch/", text: { fr: "Promotion des produits et vins du terroir neuchâtelois.", de: "Förderung der Neuenburger Weine und Regionalprodukte." } },
    ],
  },
  {
    title: { fr: "Filière et rayonnement touristique", de: "Branche und touristische Ausstrahlung" },
    note: { fr: "Relais utiles pour la filière viande et la destination Neuchâtel.", de: "Nützliche Plattformen für die Fleischbranche und die Destination Neuenburg." },
    organisations: [
      { logo: "/logo-proviande.svg", name: "Proviande · Viande Suisse", href: "https://www.proviande.ch/fr", text: { fr: "Interprofession suisse de la filière viande.", de: "Schweizer Branchenorganisation der Fleischwirtschaft." } },
      { logo: "/logo-suisse-tourisme.svg", name: "Suisse Tourisme · Neuchâtel", href: "https://www.myswitzerland.com/fr-ch/destinations/neuchatel/", text: { fr: "Page officielle de la destination Neuchâtel.", de: "Offizielle Seite der Destination Neuenburg." } },
      { logo: "/logo-j3l.svg", name: "Jura & Trois-Lacs · Pays de Neuchâtel", href: sources.torreeTourism, text: { fr: "Présentation touristique de la torrée neuchâteloise.", de: "Touristische Präsentation der Neuenburger Torrée." } },
    ],
  },
];
