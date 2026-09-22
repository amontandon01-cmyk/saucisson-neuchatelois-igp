import type { LocalizedText } from "./products";
import { sources } from "./sources";

export type NewsItem = {
  id: string;
  slugs: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  body: Record<"fr" | "de", string[]>;
  publishedAt: string;
  updatedAt: string;
  source: string;
  image: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "selection-2026",
    slugs: { fr: "premiere-selection-2026", de: "erste-selektion-2026" },
    title: {
      fr: "Première Sélection du Saucisson neuchâtelois IGP",
      de: "Erste Prämierung des Saucisson neuchâtelois IGP",
    },
    summary: {
      fr: "Christen Delicatessen a reçu le Prix du meilleur Saucisson neuchâtelois IGP 2026 lors d’une dégustation à l’aveugle réunissant neuf boucheries du canton.",
      de: "Christen Delicatessen erhielt bei einer Blindverkostung mit neun Metzgereien aus dem Kanton die Auszeichnung für den besten Saucisson neuchâtelois IGP 2026.",
    },
    body: {
      fr: [
        "La première sélection s’est tenue le 25 août 2026 au Restaurant de la Tourne, à Rochefort. Neuf boucheries neuchâteloises ont participé à la dégustation à l’aveugle.",
        "Le prix a été attribué à Claude-Alain Christen, de Christen Delicatessen. Cette distinction met en lumière la qualité du produit et le savoir-faire des artisans bouchers-charcutiers.",
      ],
      de: [
        "Die erste Prämierung fand am 25. August 2026 im Restaurant de la Tourne in Rochefort statt. Neun Neuenburger Metzgereien nahmen an der Blindverkostung teil.",
        "Die Auszeichnung ging an Claude-Alain Christen von Christen Delicatessen. Sie würdigt die Qualität des Produkts und das Können der Metzger- und Charcuterie-Betriebe.",
      ],
    },
    publishedAt: "2026-08-25",
    updatedAt: "2026-09-22",
    source: sources.selection2026,
    image: "/aop-saucisson-planche.webp",
  },
];
