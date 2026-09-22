import type { Lang } from "@/data/products";

export type { Lang };

export type PageKey =
  | "overview"
  | "saucisson"
  | "saucisse"
  | "cooking"
  | "recipes"
  | "torree"
  | "locator"
  | "pro"
  | "news"
  | "association"
  | "members"
  | "committee"
  | "partners"
  | "privacy";

export type RouteKey = "home" | PageKey;

export type DetailSection = {
  kicker: string;
  title: string;
  text: string;
  bullets?: string[];
  source?: string;
  sourceLabel?: string;
};

export type DetailContent = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: DetailSection[];
  note?: string;
};

export const routes: Record<Lang, Record<RouteKey, string>> = {
  fr: {
    home: "/",
    overview: "/le-produit",
    saucisson: "/saucisson-neuchatelois-igp",
    saucisse: "/saucisse-neuchateloise-igp",
    cooking: "/cuisson",
    recipes: "/recettes",
    torree: "/torree",
    locator: "/ou-acheter",
    pro: "/professionnels",
    news: "/actualites",
    association: "/anmb",
    members: "/anmb/membres",
    committee: "/anmb/comite",
    partners: "/anmb/reseau",
    privacy: "/protection-des-donnees",
  },
  de: {
    home: "/de",
    overview: "/de/die-zwei-igp",
    saucisson: "/de/saucisson-neuchatelois-igp",
    saucisse: "/de/saucisse-neuchateloise-igp",
    cooking: "/de/zubereitung",
    recipes: "/de/rezepte",
    torree: "/de/torree",
    locator: "/de/verkaufsstellen",
    pro: "/de/fachleute",
    news: "/de/aktuell",
    association: "/de/anmb",
    members: "/de/anmb/mitgliedschaft",
    committee: "/de/anmb/vorstand",
    partners: "/de/anmb/netzwerk",
    privacy: "/de/datenschutz",
  },
};

export const pageMeta: Record<Lang, Record<RouteKey, { title: string; description: string }>> = {
  fr: {
    home: {
      title: "Saucisson neuchâtelois IGP & Saucisse neuchâteloise IGP",
      description: "Le site de référence des deux spécialités IGP neuchâteloises : origine, fabrication, cuisson, torrée, recettes et fabricants certifiés.",
    },
    overview: {
      title: "Les deux IGP neuchâteloises",
      description: "Comprendre l’origine, la fabrication et la différence entre le Saucisson neuchâtelois IGP et la Saucisse neuchâteloise IGP.",
    },
    saucisson: {
      title: "Saucisson neuchâtelois IGP",
      description: "Identité, forme droite, origine suisse, fabrication neuchâteloise, goût, cuisson, certification et usages du Saucisson neuchâtelois IGP.",
    },
    saucisse: {
      title: "Saucisse neuchâteloise IGP",
      description: "Identité, forme courbe, origine suisse, fabrication neuchâteloise, goût, cuisson, certification et usages de la Saucisse neuchâteloise IGP.",
    },
    cooking: {
      title: "Cuisson des deux IGP",
      description: "La consigne officielle de cuisson : dans de l’eau frémissante pendant 30 à 40 minutes, selon la taille du produit.",
    },
    recipes: {
      title: "Recettes et inspirations",
      description: "Des usages neuchâtelois documentés et des recettes externes attribuées pour cuisiner les deux spécialités IGP.",
    },
    torree: {
      title: "La torrée neuchâteloise",
      description: "Histoire, tradition, préparation générale et sécurité de la torrée neuchâteloise, patrimoine vivant du canton.",
    },
    locator: {
      title: "Fabricants certifiés et points de vente",
      description: "Les fabricants certifiés OIC et leurs points de vente liés, clairement distingués des revendeurs externes.",
    },
    pro: {
      title: "Commerce, gastronomie, médias et tourisme",
      description: "Cahier des charges, faits essentiels, contacts et ressources vérifiées pour les professionnels et les médias.",
    },
    news: {
      title: "Actualités des deux IGP",
      description: "Actualités vérifiées du Saucisson neuchâtelois IGP, de la Saucisse neuchâteloise IGP et de leur filière.",
    },
    association: {
      title: "ANMB — groupement officiel des deux IGP",
      description: "Rôle de l’Association neuchâteloise des maîtres-bouchers, groupement officiel des deux IGP, distinct de la certification OIC.",
    },
    members: {
      title: "Adhésion à l’ANMB",
      description: "Comprendre la différence entre adhésion professionnelle à l’ANMB, certification IGP et point de vente.",
    },
    committee: {
      title: "Comité de l’ANMB",
      description: "Composition du comité de l’ANMB vérifiée sur le site officiel de l’association.",
    },
    partners: {
      title: "Réseau et organismes de référence",
      description: "Institutions de protection, certification, patrimoine et tourisme, clairement séparées des partenaires contractuels.",
    },
    privacy: {
      title: "Protection des données",
      description: "Données techniques, hébergement et liens externes du site des deux IGP neuchâteloises.",
    },
  },
  de: {
    home: {
      title: "Saucisson neuchâtelois IGP & Saucisse neuchâteloise IGP",
      description: "Die Referenzseite der beiden Neuenburger IGP-Spezialitäten: Herkunft, Herstellung, Zubereitung, Torrée, Rezepte und zertifizierte Hersteller.",
    },
    overview: {
      title: "Die zwei Neuenburger IGP-Spezialitäten",
      description: "Herkunft, Herstellung und Unterschied zwischen Saucisson neuchâtelois IGP und Saucisse neuchâteloise IGP verständlich erklärt.",
    },
    saucisson: {
      title: "Saucisson neuchâtelois IGP",
      description: "Identität, gerade Form, Schweizer Herkunft, Neuenburger Herstellung, Geschmack, Zubereitung und Zertifizierung des Saucisson neuchâtelois IGP.",
    },
    saucisse: {
      title: "Saucisse neuchâteloise IGP",
      description: "Identität, gebogene Form, Schweizer Herkunft, Neuenburger Herstellung, Geschmack, Zubereitung und Zertifizierung der Saucisse neuchâteloise IGP.",
    },
    cooking: {
      title: "Zubereitung der zwei IGP-Spezialitäten",
      description: "Die offizielle Garangabe: je nach Grösse 30 bis 40 Minuten in siedendem Wasser garen.",
    },
    recipes: {
      title: "Rezepte und Inspirationen",
      description: "Dokumentierte Neuenburger Verwendungen und korrekt zugeordnete externe Rezepte für die beiden IGP-Spezialitäten.",
    },
    torree: {
      title: "Die Neuenburger Torrée",
      description: "Geschichte, Tradition, allgemeiner Ablauf und Sicherheit der Torrée, eines lebendigen Neuenburger Kulturerbes.",
    },
    locator: {
      title: "Zertifizierte Hersteller und Verkaufsstellen",
      description: "OIC-zertifizierte Hersteller und ihre Verkaufsstellen, klar von externen Wiederverkäufern unterschieden.",
    },
    pro: {
      title: "Handel, Gastronomie, Medien und Tourismus",
      description: "Pflichtenheft, Kerndaten, Kontakte und geprüfte Ressourcen für Fachleute und Medien.",
    },
    news: {
      title: "Aktuelles zu den zwei IGP-Spezialitäten",
      description: "Geprüfte Meldungen zu Saucisson neuchâtelois IGP, Saucisse neuchâteloise IGP und ihrer Branche.",
    },
    association: {
      title: "ANMB — offizielle Trägerschaft der zwei IGP",
      description: "Rolle des Neuenburger Metzgermeisterverbands als offizielle Trägerschaft, getrennt von der OIC-Zertifizierung.",
    },
    members: {
      title: "Mitgliedschaft bei der ANMB",
      description: "Unterschied zwischen Berufsverbandsmitgliedschaft, IGP-Zertifizierung und Verkaufsstelle.",
    },
    committee: {
      title: "Vorstand der ANMB",
      description: "Zusammensetzung des ANMB-Vorstands, geprüft anhand der offiziellen Verbandsseite.",
    },
    partners: {
      title: "Netzwerk und Referenzorganisationen",
      description: "Institutionen für Schutz, Zertifizierung, Kulturerbe und Tourismus, getrennt von Vertragspartnern.",
    },
    privacy: {
      title: "Datenschutz",
      description: "Technische Daten, Hosting und externe Links der Website der zwei Neuenburger IGP-Spezialitäten.",
    },
  },
};

export const ui = {
  fr: {
    claim: "Élaborés dans le canton de Neuchâtel",
    pro: "Professionnels",
    menu: "Menu",
    closeMenu: "Fermer",
    language: "Deutsch",
    short: "DE",
    nav: [
      ["overview", "Les deux IGP"],
      ["cooking", "Cuisson"],
      ["recipes", "Recettes"],
      ["torree", "La torrée"],
      ["locator", "Fabricants & vente"],
    ] as [PageKey, string][],
    heroEyebrow: "Saucisson neuchâtelois IGP · Saucisse neuchâteloise IGP",
    heroTitle: "Deux spécialités. Un même terroir. Une IGP.",
    heroIntro: "Deux formes, une recette protégée et un savoir-faire de boucherie ancré dans le canton de Neuchâtel.",
    find: "Trouver où les acheter",
    cook: "Réussir la cuisson",
  },
  de: {
    claim: "Im Kanton Neuenburg hergestellt",
    pro: "Für Fachleute",
    menu: "Menü",
    closeMenu: "Schliessen",
    language: "Français",
    short: "FR",
    nav: [
      ["overview", "Die zwei IGP"],
      ["cooking", "Zubereitung"],
      ["recipes", "Rezepte"],
      ["torree", "Die Torrée"],
      ["locator", "Hersteller & Verkauf"],
    ] as [PageKey, string][],
    heroEyebrow: "Saucisson neuchâtelois IGP · Saucisse neuchâteloise IGP",
    heroTitle: "Zwei Spezialitäten. Ein Terroir. Eine IGP.",
    heroIntro: "Zwei Formen, eine geschützte Rezeptur und Metzgerhandwerk aus dem Kanton Neuenburg.",
    find: "Verkaufsstellen finden",
    cook: "Richtig zubereiten",
  },
} as const;

export const overviewContent: Record<Lang, DetailContent> = {
  fr: {
    eyebrow: "Les deux IGP",
    title: "Deux formes, une même exigence.",
    intro: "Le Saucisson neuchâtelois IGP et la Saucisse neuchâteloise IGP partagent la même composition, le même territoire d’élaboration et le même procédé protégé.",
    sections: [
      {
        kicker: "Origine",
        title: "Élaborés à Neuchâtel avec des porcs suisses.",
        text: "La transformation et l’élaboration ont lieu dans le canton de Neuchâtel. La naissance, l’engraissement, l’abattage et la découpe des porcs ont lieu exclusivement en Suisse.",
      },
      {
        kicker: "Composition",
        title: "Une recette encadrée par le cahier des charges.",
        text: "Les deux produits sont préparés exclusivement avec de la viande de porc : au minimum 60 % de viande maigre et au maximum 35 % de matière grasse. Le poivre, l’ail et le sel prévu par le cahier des charges structurent leur profil aromatique.",
      },
      {
        kicker: "Différence",
        title: "Le boyau distingue les deux spécialités.",
        text: "Le boyau de bœuf est droit pour le Saucisson neuchâtelois IGP et courbe pour la Saucisse neuchâteloise IGP. Le cahier des charges précise qu’il s’agit de la seule différence de préparation.",
      },
      {
        kicker: "Fabrication",
        title: "Égouttage, maturation et fumage à froid.",
        text: "Après l’embossage, les produits sont suspendus au minimum 12 heures à température ambiante. Ils sont ensuite fumés entre 18 et 28 °C. La fumée liquide et la coloration par trempage sont interdites. Le processus complet dure au minimum 36 heures.",
      },
    ],
  },
  de: {
    eyebrow: "Die zwei IGP",
    title: "Zwei Formen, dieselben Anforderungen.",
    intro: "Saucisson neuchâtelois IGP und Saucisse neuchâteloise IGP teilen Zusammensetzung, Herstellungsgebiet und geschütztes Verfahren.",
    sections: [
      {
        kicker: "Herkunft",
        title: "In Neuenburg aus Schweizer Schweinen hergestellt.",
        text: "Verarbeitung und Herstellung erfolgen im Kanton Neuenburg. Geburt, Mast, Schlachtung und Zerlegung der Schweine finden ausschliesslich in der Schweiz statt.",
      },
      {
        kicker: "Zusammensetzung",
        title: "Eine Rezeptur nach Pflichtenheft.",
        text: "Beide Produkte bestehen ausschliesslich aus Schweinefleisch: mindestens 60 % Magerfleisch und höchstens 35 % Fett. Pfeffer, Knoblauch und das im Pflichtenheft vorgesehene Salz prägen das Aroma.",
      },
      {
        kicker: "Unterschied",
        title: "Der Darm unterscheidet die zwei Spezialitäten.",
        text: "Der Rinderdarm ist beim Saucisson neuchâtelois IGP gerade und bei der Saucisse neuchâteloise IGP gebogen. Laut Pflichtenheft ist dies der einzige Unterschied in der Zubereitung.",
      },
      {
        kicker: "Herstellung",
        title: "Abtropfen, Reifen und Kalträuchern.",
        text: "Nach dem Füllen hängen die Produkte mindestens 12 Stunden bei Raumtemperatur. Danach werden sie bei 18 bis 28 °C geräuchert. Flüssigrauch und Färben durch Eintauchen sind verboten. Das gesamte Verfahren dauert mindestens 36 Stunden.",
      },
    ],
  },
};

export const cookingContent: Record<Lang, DetailContent> = {
  fr: {
    eyebrow: "Consigne officielle",
    title: "Eau frémissante, 30 à 40 minutes.",
    intro: "Le cahier des charges impose cette indication sur l’étiquette de chaque produit vendu cru. La durée dépend de la taille du produit.",
    sections: [
      { kicker: "01 · Vérifier", title: "Commencez par l’étiquette.", text: "Vérifiez si le produit est vendu cru ou cuit. Les indications particulières du fabricant restent prioritaires." },
      { kicker: "02 · Cuire", title: "Maintenez l’eau frémissante.", text: "Pour un produit cru, le cahier des charges indique une cuisson dans de l’eau frémissante, sans donner de température numérique." },
      { kicker: "03 · Adapter", title: "Comptez 30 à 40 minutes selon la taille.", text: "Le calibre et le poids varient. Respectez le temps porté sur l’étiquette du produit." },
    ],
    note: "Le cahier des charges ne donne aucune température numérique et aucune consigne sur le fait de piquer le boyau. Suivez l’étiquette ou une indication distincte du fabricant.",
  },
  de: {
    eyebrow: "Offizielle Garangabe",
    title: "Siedendes Wasser, 30 bis 40 Minuten.",
    intro: "Diese Angabe muss gemäss Pflichtenheft auf jedem roh verkauften Produkt stehen. Die Dauer richtet sich nach der Grösse.",
    sections: [
      { kicker: "01 · Prüfen", title: "Zuerst die Etikette lesen.", text: "Prüfen Sie, ob das Produkt roh oder gekocht verkauft wird. Besondere Herstellerangaben haben Vorrang." },
      { kicker: "02 · Garen", title: "Das Wasser sieden lassen.", text: "Für ein rohes Produkt schreibt das Pflichtenheft das Garen in siedendem Wasser vor, ohne eine Temperaturzahl zu nennen." },
      { kicker: "03 · Anpassen", title: "Je nach Grösse 30 bis 40 Minuten.", text: "Kaliber und Gewicht variieren. Halten Sie sich an die Zeitangabe auf der Etikette." },
    ],
    note: "Das Pflichtenheft nennt keine Temperaturzahl und keine Anweisung zum Einstechen. Beachten Sie die Etikette oder einen separaten Hinweis des Herstellers.",
  },
};

export const torreeContent: Record<Lang, DetailContent> = {
  fr: {
    eyebrow: "Patrimoine neuchâtelois",
    title: "La torrée, bien plus qu’une recette.",
    intro: "Cette tradition réunit le feu, le Saucisson neuchâtelois IGP, les pommes de terre et le temps partagé en plein air.",
    sections: [
      { kicker: "Tradition", title: "Une pratique liée au canton.", text: "La torrée, parfois appelée feu de berger, consiste à préparer un feu puis à cuire le Saucisson neuchâtelois IGP et des pommes de terre sous la cendre. Elle se pratique traditionnellement en automne." },
      { kicker: "Transmission", title: "Des gestes transmis et plusieurs variantes.", text: "L’enveloppement, les accompagnements et le déroulement peuvent varier selon les familles. La page touristique officielle documente une méthode complète sans que ce site la recopie." },
      { kicker: "Sécurité", title: "Les consignes du jour priment toujours.", text: "Avant tout feu, consultez le niveau de danger et les décisions du canton. Une torrée peut être limitée ou interdite, même si la tradition se pratique habituellement à cette saison.", bullets: ["Consulter la page officielle du canton le jour même", "Respecter les interdictions et les emplacements autorisés", "Éteindre complètement les braises et emporter les déchets"] },
    ],
    note: "La photographie de feu illustre l’ambiance. Elle ne documente pas une torrée neuchâteloise réelle.",
  },
  de: {
    eyebrow: "Neuenburger Kulturerbe",
    title: "Die Torrée ist mehr als ein Rezept.",
    intro: "Die Tradition verbindet Feuer, Saucisson neuchâtelois IGP, Kartoffeln und gemeinsam verbrachte Zeit im Freien.",
    sections: [
      { kicker: "Tradition", title: "Ein Brauch aus dem Kanton.", text: "Bei der Torrée, auch Hirtenfeuer genannt, werden Saucisson neuchâtelois IGP und Kartoffeln unter der Asche gegart. Traditionell findet sie im Herbst statt." },
      { kicker: "Weitergabe", title: "Überlieferte Handgriffe und mehrere Varianten.", text: "Verpackung, Beilagen und Ablauf können je nach Familie variieren. Die offizielle Tourismusseite dokumentiert eine vollständige Methode, ohne dass diese Website sie kopiert." },
      { kicker: "Sicherheit", title: "Aktuelle Vorschriften haben immer Vorrang.", text: "Vor jedem Feuer sind Gefahrenstufe und kantonale Entscheide zu prüfen. Eine Torrée kann trotz Saison eingeschränkt oder verboten sein.", bullets: ["Am selben Tag die offizielle Kantonsseite prüfen", "Verbote und erlaubte Feuerstellen beachten", "Glut vollständig löschen und Abfälle mitnehmen"] },
    ],
    note: "Das Feuerfoto vermittelt Stimmung; es dokumentiert keine reale Neuenburger Torrée.",
  },
};

export const privacyContent: Record<Lang, DetailContent> = {
  fr: {
    eyebrow: "Informations légales",
    title: "Protection des données.",
    intro: "Le site n’intègre ni publicité, ni outil d’analyse, ni carte ou réseau social embarqué.",
    sections: [],
  },
  de: {
    eyebrow: "Rechtliche Hinweise",
    title: "Datenschutz.",
    intro: "Die Website bindet weder Werbung noch Analysedienste, Karten oder soziale Netzwerke ein.",
    sections: [],
  },
};

export const associationKeys: PageKey[] = ["association", "members", "committee", "partners"];

export function alternateRoute(lang: Lang, key: RouteKey) {
  return routes[lang === "fr" ? "de" : "fr"][key];
}

export function staticPageForPath(lang: Lang, path: string): PageKey | undefined {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return (Object.keys(routes[lang]) as RouteKey[]).find(
    (key): key is PageKey => key !== "home" && routes[lang][key] === normalized,
  );
}

export function staticSlugs(lang: Lang) {
  return (Object.keys(routes[lang]) as RouteKey[])
    .filter((key) => key !== "home")
    .map((key) => routes[lang][key].replace(/^\/de\/?/, "").replace(/^\//, "").split("/"));
}
