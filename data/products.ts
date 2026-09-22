import { sources } from "./sources";

export type Lang = "fr" | "de";
export type ProductId = "saucisson" | "saucisse";

export type LocalizedText = Record<Lang, string>;

export type ProtectedProduct = {
  id: ProductId;
  officialName: string;
  shape: LocalizedText;
  identity: LocalizedText;
  use: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  source: string;
};

export const products: Record<ProductId, ProtectedProduct> = {
  saucisson: {
    id: "saucisson",
    officialName: "Saucisson neuchâtelois IGP",
    shape: { fr: "Boyau de bœuf droit", de: "Gerader Rinderdarm" },
    identity: {
      fr: "Une spécialité crue fumée de porc, reconnaissable à sa forme droite.",
      de: "Eine rohe, geräucherte Schweinefleischspezialität in gerader Form.",
    },
    use: {
      fr: "À la table familiale comme à la torrée, il se consomme après cuisson.",
      de: "Am Familientisch wie bei der Torrée wird er nach dem Garen genossen.",
    },
    image: "/aop-saucisson-planche.webp",
    imageAlt: {
      fr: "Saucisson neuchâtelois IGP entier et tranché sur une planche",
      de: "Saucisson neuchâtelois IGP, ganz und aufgeschnitten auf einem Brett",
    },
    source: sources.specification,
  },
  saucisse: {
    id: "saucisse",
    officialName: "Saucisse neuchâteloise IGP",
    shape: { fr: "Boyau de bœuf courbe", de: "Gebogener Rinderdarm" },
    identity: {
      fr: "La même recette protégée et le même savoir-faire, dans une forme courbe.",
      de: "Dieselbe geschützte Rezeptur und dasselbe Können, in gebogener Form.",
    },
    use: {
      fr: "Sa forme la distingue ; elle se cuisine et se partage après cuisson.",
      de: "Ihre Form macht den Unterschied; auch sie wird vor dem Genuss gegart.",
    },
    image: "/aop-saucissons.webp",
    imageAlt: {
      fr: "Saucisse neuchâteloise IGP et Saucisson neuchâtelois IGP présentés par un artisan",
      de: "Saucisse neuchâteloise IGP und Saucisson neuchâtelois IGP bei einem Handwerker",
    },
    source: sources.specification,
  },
};

export const protectedProductNames = Object.values(products).map((product) => product.officialName);

export const commonProductFacts = {
  registrationYear: 2003,
  leanMeatMinimumPercent: 60,
  fatMaximumPercent: 35,
  casingDiameterMillimeters: "40–60",
  weightGrams: "200–600",
  coldSmokingCelsius: "18–28",
  drainingMinimumHours: 12,
  processMinimumHours: 36,
  cookingMinutes: "30–40",
  tastingMinimumScore: 4,
  sources: [sources.federalRegister, sources.specification, sources.aopProductFr],
} as const;
