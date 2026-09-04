import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, Flame, History, Sparkles, UtensilsCrossed } from "lucide-react";
import { Lang, routes } from "./content";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const sources = {
  heritage: "https://www.patrimoineculinaire.ch/Produit/Saucisson-neuchatelois-IGP-saucisse-neuchateloise-IGP/29",
  torree: "https://www.j3l.ch/fr/Z12892/a-faire/boire-manger/produits-regionaux/torree-neuchateloise",
  brioche: "https://rezepte.lemenu.ch/recipes/LM201910_42_AOP_IGP/brioche-au-saucisson-neuchatelois-igp?locale=fr",
  magazine: "https://www.aop-igp.ch/fileadmin/Dokumente/Tradition___Terroir/Kundenmagazin_Nr_17_F.pdf",
  carpaccio: "https://www.canalalpha.ch/play/lidee-du-chef/episode/556/carpaccio-de-saucisson-neuchatelois-avec-des-cigares-au-britchon",
};

type RecipeIdea = {
  title: Record<Lang, string>;
  category: "heritage" | "modern";
  image: string;
  text: Record<Lang, string>;
  source: string;
  sourceName: string;
};

const recipeIdeas: RecipeIdea[] = [
  {
    title: { fr: "La torrée et sa salade de pommes de terre", de: "Torrée mit Kartoffelsalat" },
    category: "heritage", image: "/aop-saucisson-creux.webp",
    text: { fr: "Le saucisson cuit dans les braises se partage avec du pain ou une salade de pommes de terre — parfois une salade de cornettes — dans la tradition neuchâteloise.", de: "Der in der Glut gegarte Saucisson wird nach Neuenburger Tradition mit Brot, Kartoffelsalat oder manchmal Hörnlisalat geteilt." },
    source: sources.heritage, sourceName: "Patrimoine culinaire suisse",
  },
  {
    title: { fr: "Pommes de terre, carottes et poireaux", de: "Kartoffeln, Karotten und Lauch" },
    category: "heritage", image: "/aop-saucisson-planche.webp",
    text: { fr: "La préparation familiale la plus directe : les légumes cuisent avec la spécialité dans une eau maintenue autour de 80 °C.", de: "Die direkte Familienküche: Das Gemüse gart zusammen mit der Spezialität in etwa 80 °C warmem Wasser." },
    source: sources.heritage, sourceName: "Patrimoine culinaire suisse",
  },
  {
    title: { fr: "Salade de cornettes de la torrée", de: "Hörnlisalat zur Torrée" },
    category: "heritage", image: "/aop-saucissons.webp",
    text: { fr: "Une salade fraîche et légèrement acidulée accompagne volontiers le caractère fumé du saucisson lors de la torrée.", de: "Ein frischer, leicht säuerlicher Hörnlisalat begleitet den Rauchgeschmack bei der Torrée." },
    source: sources.heritage, sourceName: "Patrimoine culinaire suisse",
  },
  {
    title: { fr: "Brioche au Saucisson neuchâtelois IGP", de: "Brioche mit Neuenburger Saucisson IGP" },
    category: "heritage", image: "/aop-craft.webp",
    text: { fr: "Un grand classique de fête : le saucisson précuit est enveloppé d’une pâte à brioche dorée au four.", de: "Ein Festtagsklassiker: Der vorgegarte Saucisson wird in Briocheteig gehüllt und goldbraun gebacken." },
    source: sources.brioche, sourceName: "le menu",
  },
  {
    title: { fr: "Choucroute neuchâteloise", de: "Neuenburger Sauerkraut" },
    category: "heritage", image: "/aop-saucisson-creux.webp",
    text: { fr: "La spécialité fumée rejoint le chou, les pommes de terre et les autres garnitures d’un plat généreux associé aux tables neuchâteloises.", de: "Die geräucherte Spezialität verbindet sich mit Kohl, Kartoffeln und weiteren Beilagen zu einem grosszügigen Neuenburger Gericht." },
    source: sources.heritage, sourceName: "Patrimoine culinaire suisse",
  },
  {
    title: { fr: "Petcha, sourieb et poireaux à la crème", de: "Petcha, Sourieb und Rahmlauch" },
    category: "heritage", image: "/aop-saucisson-planche.webp",
    text: { fr: "Salade de dents-de-lion, compote de raves et poireaux à la crème forment un petit patrimoine d’accompagnements à redécouvrir.", de: "Löwenzahnsalat, Rübenkompott und Rahmlauch gehören zu den traditionellen Beilagen, die es neu zu entdecken gilt." },
    source: sources.heritage, sourceName: "Patrimoine culinaire suisse",
  },
  {
    title: { fr: "Riz aux poireaux et Saucisson neuchâtelois IGP", de: "Lauchreis mit Neuenburger Saucisson IGP" },
    category: "modern", image: "/aop-saucissons.webp",
    text: { fr: "Une interprétation crémeuse au riz et au poireau, publiée dans le magazine Tradition & Terroir.", de: "Eine cremige Interpretation mit Reis und Lauch aus dem Magazin Tradition & Terroir." },
    source: sources.magazine, sourceName: "AOP-IGP Suisse · Swissmilk",
  },
  {
    title: { fr: "Tarte au Gruyère AOP, poireau et saucisson", de: "Tarte mit Gruyère AOP, Lauch und Saucisson" },
    category: "modern", image: "/aop-saucisson-creux.webp",
    text: { fr: "Une rencontre entre deux spécialités suisses protégées, le poireau et une pâte croustillante.", de: "Zwei geschützte Schweizer Spezialitäten treffen auf Lauch und knusprigen Teig." },
    source: sources.magazine, sourceName: "AOP-IGP Suisse · Swissmilk",
  },
  {
    title: { fr: "Carpaccio de saucisson et cigares au Britchon", de: "Saucisson-Carpaccio mit Britchon-Röllchen" },
    category: "modern", image: "/aop-saucisson-planche.webp",
    text: { fr: "Une création de chef qui montre comment le produit peut quitter le registre rustique sans perdre son identité régionale.", de: "Eine Küchenkreation, die das Produkt modern interpretiert, ohne seine regionale Identität zu verlieren." },
    source: sources.carpaccio, sourceName: "Canal Alpha · L’idée du chef",
  },
];

export function RecipesPageContent({ lang }: { lang: Lang }) {
  const copy = lang === "fr" ? {
    eyebrow: "Recettes & patrimoine", title: "Toute une culture à cuisiner.",
    intro: "Les deux spécialités IGP vivent autant dans les recettes familiales que dans la cuisine contemporaine. Ce répertoire rassemble les usages documentés et conduit vers leurs sources.",
    traditional: "Tradition documentée", modern: "Création contemporaine", source: "Voir la source ou la recette",
    guideTitle: "Commencer par une cuisson juste", guideText: "Avant toute recette, la cuisson douce autour de 80 °C préserve la texture et le goût. Les indications figurant sur l’étiquette restent prioritaires.", guideLink: "Consulter le guide de cuisson",
    heritageTitle: "Que sert-on traditionnellement avec le saucisson ?",
    heritageText: "Pommes de terre, carottes, poireaux, salade de pommes de terre, salade de cornettes, petcha, sourieb et poireaux à la crème apparaissent dans les sources consacrées au patrimoine culinaire neuchâtelois.",
    methodTitle: "Pourquoi les recettes complètes restent-elles chez leurs auteurs ?",
    methodText: "Nous recensons et expliquons les usages sans recopier des textes ou photographies protégés. Chaque lien conduit vers la recette originale, son auteur et ses éventuelles conditions d’utilisation.",
    photoCredit: "Photographies produit : Association suisse des AOP-IGP.",
  } : {
    eyebrow: "Rezepte & Kulturerbe", title: "Eine ganze Kultur zum Kochen.",
    intro: "Die beiden IGP-Spezialitäten leben in der Familienküche ebenso wie in modernen Kreationen. Dieses Verzeichnis dokumentiert die Anwendungen und führt zu den Originalquellen.",
    traditional: "Dokumentierte Tradition", modern: "Moderne Kreation", source: "Quelle oder Rezept öffnen",
    guideTitle: "Mit der richtigen Garweise beginnen", guideText: "Sanftes Garen bei etwa 80 °C bewahrt Textur und Geschmack. Die Angaben auf der Etikette haben Vorrang.", guideLink: "Zubereitung ansehen",
    heritageTitle: "Was wird traditionell zum Saucisson serviert?",
    heritageText: "Kartoffeln, Karotten, Lauch, Kartoffel- und Hörnlisalat, Petcha, Sourieb und Rahmlauch werden in den Quellen zum Neuenburger Kulinarikerbe erwähnt.",
    methodTitle: "Warum bleiben vollständige Rezepte bei ihren Urhebern?",
    methodText: "Wir dokumentieren die Anwendungen, ohne geschützte Texte oder Fotografien zu kopieren. Jeder Link führt zum Originalrezept, dessen Urheber und allfälligen Nutzungsbedingungen.",
    photoCredit: "Produktfotografien: Schweizerische Vereinigung der AOP-IGP.",
  };

  const structuredData = {
    "@context": "https://schema.org", "@type": "ItemList", name: copy.title, numberOfItems: recipeIdeas.length,
    itemListElement: recipeIdeas.map((recipe, index) => ({ "@type": "ListItem", position: index + 1, name: recipe.title[lang], url: recipe.source })),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <section className="recipe-hero">
      <div><p className="eyebrow light">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.intro}</p></div>
      <figure><Image src={assetPath("/aop-saucisson-creux.webp")} alt={lang === "fr" ? "Saucisson neuchâtelois IGP tranché devant le Creux du Van" : "Aufgeschnittener Neuenburger Saucisson IGP vor dem Creux du Van"} fill priority sizes="(max-width: 760px) 100vw, 45vw" /><figcaption>{copy.photoCredit}</figcaption></figure>
    </section>
    <section className="recipe-guide section-pad"><UtensilsCrossed size={30} /><div><h2>{copy.guideTitle}</h2><p>{copy.guideText}</p></div><Link className="text-link" href={routes[lang].cooking}>{copy.guideLink}<ArrowRight size={16} /></Link></section>
    <section className="recipe-catalogue section-pad">
      <div className="section-heading"><p className="eyebrow">{lang === "fr" ? "Répertoire documenté" : "Dokumentiertes Verzeichnis"}</p><h2>{lang === "fr" ? "Neuf façons de faire vivre les deux IGP." : "Neun Arten, die zwei IGP zu geniessen."}</h2><p>{lang === "fr" ? "Les mentions historiques proviennent de sources patrimoniales; les interprétations contemporaines restent attribuées à leurs auteurs." : "Historische Angaben stammen aus Kulturerbequellen; moderne Interpretationen bleiben ihren Urhebern zugeordnet."}</p></div>
      <div className="recipe-catalogue-grid">{recipeIdeas.map((recipe, index) => <article className="recipe-catalogue-card" key={recipe.title.fr}>
        <figure><Image src={assetPath(recipe.image)} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /><span>{String(index + 1).padStart(2, "0")}</span></figure>
        <div><p className={`recipe-kind ${recipe.category}`}>{recipe.category === "heritage" ? <History size={15} /> : <Sparkles size={15} />}{recipe.category === "heritage" ? copy.traditional : copy.modern}</p><h3>{recipe.title[lang]}</h3><p>{recipe.text[lang]}</p><a href={recipe.source} target="_blank" rel="noreferrer">{copy.source}<ExternalLink size={15} /></a><small>{recipe.sourceName}</small></div>
      </article>)}</div>
      <p className="recipe-photo-credit">{copy.photoCredit}</p>
    </section>
    <section className="recipe-knowledge section-pad">
      <article><Flame size={28} /><h2>{copy.heritageTitle}</h2><p>{copy.heritageText}</p><a href={sources.heritage} target="_blank" rel="noreferrer">Patrimoine culinaire suisse<ExternalLink size={15} /></a></article>
      <article><BookOpen size={28} /><h2>{copy.methodTitle}</h2><p>{copy.methodText}</p></article>
    </section>
  </>;
}
