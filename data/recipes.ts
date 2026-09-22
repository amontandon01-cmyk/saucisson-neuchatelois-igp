import type { Lang, LocalizedText, ProductId } from "./products";
import { sources } from "./sources";

export type ExternalRecipeIdea = {
  title: LocalizedText;
  category: "heritage" | "modern";
  image: string;
  text: LocalizedText;
  source: string;
  sourceName: string;
  productIds: ProductId[];
};

export type HostedRecipe = {
  slug: string;
  status: "draft" | "published";
  title: LocalizedText;
  productIds: ProductId[];
  image: string;
  imageRightsConfirmed: boolean;
  preparationMinutes: number;
  cookingMinutes: number;
  servings: number;
  ingredients: Record<Lang, string[]>;
  steps: Record<Lang, string[]>;
  tip?: LocalizedText;
  heritage?: LocalizedText;
  verifiedAt: string;
};

const externalSources = {
  brioche: "https://rezepte.lemenu.ch/recipes/LM201910_42_AOP_IGP/brioche-au-saucisson-neuchatelois-igp?locale=fr",
  magazine: "https://www.aop-igp.ch/fileadmin/Dokumente/Tradition___Terroir/Kundenmagazin_Nr_17_F.pdf",
  carpaccio: "https://www.canalalpha.ch/play/lidee-du-chef/episode/556/carpaccio-de-saucisson-neuchatelois-avec-des-cigares-au-britchon",
};

export const externalRecipeIdeas: ExternalRecipeIdea[] = [
  {
    title: { fr: "La torrée et sa salade de pommes de terre", de: "Torrée mit Kartoffelsalat" },
    category: "heritage",
    image: "/aop-saucisson-creux.webp",
    text: { fr: "Le saucisson cuit dans les braises se partage avec du pain ou une salade de pommes de terre — parfois une salade de cornettes — dans la tradition neuchâteloise.", de: "Der in der Glut gegarte Saucisson wird nach Neuenburger Tradition mit Brot, Kartoffelsalat oder manchmal Hörnlisalat geteilt." },
    source: sources.heritage,
    sourceName: "Patrimoine culinaire suisse",
    productIds: ["saucisson"],
  },
  {
    title: { fr: "Pommes de terre, carottes et poireaux", de: "Kartoffeln, Karotten und Lauch" },
    category: "heritage",
    image: "/aop-saucisson-planche.webp",
    text: { fr: "Une association familiale documentée par le Patrimoine culinaire suisse.", de: "Eine vom Kulinarischen Erbe der Schweiz dokumentierte Familienküche." },
    source: sources.heritage,
    sourceName: "Patrimoine culinaire suisse",
    productIds: ["saucisson", "saucisse"],
  },
  {
    title: { fr: "Salade de cornettes de la torrée", de: "Hörnlisalat zur Torrée" },
    category: "heritage",
    image: "/aop-saucissons.webp",
    text: { fr: "La salade de cornettes figure parmi les accompagnements associés à la torrée.", de: "Hörnlisalat gehört zu den überlieferten Beilagen der Torrée." },
    source: sources.heritage,
    sourceName: "Patrimoine culinaire suisse",
    productIds: ["saucisson"],
  },
  {
    title: { fr: "Brioche au Saucisson neuchâtelois IGP", de: "Brioche mit Saucisson neuchâtelois IGP" },
    category: "heritage",
    image: "/aop-craft.webp",
    text: { fr: "Un classique de fête dont la recette complète reste publiée chez son auteur.", de: "Ein Festtagsklassiker; das vollständige Rezept bleibt bei seinem Urheber." },
    source: externalSources.brioche,
    sourceName: "le menu",
    productIds: ["saucisson"],
  },
  {
    title: { fr: "Choucroute neuchâteloise", de: "Neuenburger Sauerkraut" },
    category: "heritage",
    image: "/aop-saucisson-creux.webp",
    text: { fr: "Une table généreuse associant la spécialité fumée, le chou et les pommes de terre.", de: "Ein grosszügiges Gericht mit der geräucherten Spezialität, Kohl und Kartoffeln." },
    source: sources.heritage,
    sourceName: "Patrimoine culinaire suisse",
    productIds: ["saucisson", "saucisse"],
  },
  {
    title: { fr: "Petcha, sourieb et poireaux à la crème", de: "Petcha, Sourieb und Rahmlauch" },
    category: "heritage",
    image: "/aop-saucisson-planche.webp",
    text: { fr: "Des accompagnements régionaux à découvrir dans leur source patrimoniale.", de: "Regionale Beilagen, dokumentiert in der Quelle zum kulinarischen Erbe." },
    source: sources.heritage,
    sourceName: "Patrimoine culinaire suisse",
    productIds: ["saucisson", "saucisse"],
  },
  {
    title: { fr: "Riz aux poireaux et Saucisson neuchâtelois IGP", de: "Lauchreis mit Saucisson neuchâtelois IGP" },
    category: "modern",
    image: "/aop-saucissons.webp",
    text: { fr: "Une interprétation au riz et au poireau publiée dans Tradition & Terroir.", de: "Eine Interpretation mit Reis und Lauch aus Tradition & Terroir." },
    source: externalSources.magazine,
    sourceName: "AOP-IGP Suisse · Swissmilk",
    productIds: ["saucisson"],
  },
  {
    title: { fr: "Tarte au Gruyère AOP, poireau et saucisson", de: "Tarte mit Gruyère AOP, Lauch und Saucisson" },
    category: "modern",
    image: "/aop-saucisson-creux.webp",
    text: { fr: "Une rencontre entre spécialités suisses protégées, publiée par ses auteurs.", de: "Eine von ihren Urhebern veröffentlichte Begegnung geschützter Schweizer Spezialitäten." },
    source: externalSources.magazine,
    sourceName: "AOP-IGP Suisse · Swissmilk",
    productIds: ["saucisson"],
  },
  {
    title: { fr: "Carpaccio de saucisson et cigares au Britchon", de: "Saucisson-Carpaccio mit Britchon-Röllchen" },
    category: "modern",
    image: "/aop-saucisson-planche.webp",
    text: { fr: "Une création de chef attribuée à sa source originale.", de: "Eine Küchenkreation mit direkter Angabe der Originalquelle." },
    source: externalSources.carpaccio,
    sourceName: "Canal Alpha · L’idée du chef",
    productIds: ["saucisson"],
  },
];

/** No hosted recipe is published before culinary and image-rights validation by the ANMB. */
export const hostedRecipes: HostedRecipe[] = [];
