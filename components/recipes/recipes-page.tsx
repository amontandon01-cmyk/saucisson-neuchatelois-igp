import Image from "next/image";
import { BookOpen, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { routes, type Lang } from "@/content/site";
import { externalRecipeIdeas, hostedRecipes } from "@/data/recipes";
import { products } from "@/data/products";
import { sources } from "@/data/sources";
import { JsonLd } from "@/lib/seo";
import { assetPath } from "@/lib/site-config";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Breadcrumbs, ButtonLink, SourceLink } from "@/components/site/shared";

export function RecipesPage({ lang }: { lang: Lang }) {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "fr" ? "Inspirations culinaires sourcées" : "Belegte kulinarische Inspirationen",
    numberOfItems: externalRecipeIdeas.length,
    itemListElement: externalRecipeIdeas.map((idea, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: idea.title[lang],
      url: idea.source,
    })),
  };

  return (
    <>
      <Header lang={lang} current="recipes" />
      <main id="contenu">
        <JsonLd data={itemListJsonLd} />
        <Breadcrumbs
          label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
          items={[
            { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
            { name: lang === "fr" ? "Recettes" : "Rezepte", path: routes[lang].recipes },
          ]}
        />
        <section className="recipe-hero">
          <div>
            <p className="eyebrow light">{lang === "fr" ? "Répertoire éditorial" : "Redaktionelles Verzeichnis"}</p>
            <h1>{lang === "fr" ? "Recettes, usages et inspirations." : "Rezepte, Verwendungen und Inspirationen."}</h1>
            <p>
              {lang === "fr"
                ? "Un point d’entrée vers des recettes publiées par leurs auteurs et vers les usages documentés du patrimoine neuchâtelois."
                : "Ein Einstieg in von ihren Urhebern veröffentlichte Rezepte und in dokumentierte Neuenburger Verwendungen."}
            </p>
            <ButtonLink href={routes[lang].cooking} secondary>{lang === "fr" ? "Commencer par la cuisson" : "Mit der Zubereitung beginnen"}</ButtonLink>
          </div>
          <figure>
            <Image src={assetPath("/aop-saucisson-creux.webp")} alt={lang === "fr" ? "Saucisson neuchâtelois IGP présenté dans le paysage neuchâtelois" : "Saucisson neuchâtelois IGP in der Neuenburger Landschaft"} fill priority sizes="(max-width: 760px) 100vw, 48vw" />
            <figcaption>{lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP"}</figcaption>
          </figure>
        </section>

        <section className="recipe-guide section-pad compact-pad">
          <ShieldCheck aria-hidden="true" size={28} />
          <div>
            <h2>{lang === "fr" ? "Une séparation nette entre contenu publié et idée externe." : "Klare Trennung zwischen eigenem Inhalt und externer Idee."}</h2>
            <p>
              {lang === "fr"
                ? `Aucune recette complète n’est hébergée ici avant validation culinaire et confirmation des droits d’image par l’ANMB (${hostedRecipes.length} publiée à ce jour).`
                : `Vor kulinarischer Prüfung und Bestätigung der Bildrechte durch die ANMB wird hier kein vollständiges Rezept gehostet (derzeit ${hostedRecipes.length} veröffentlicht).`}
            </p>
          </div>
          <SourceLink href={sources.heritage}>{lang === "fr" ? "Source patrimoniale" : "Quelle zum Kulturerbe"}</SourceLink>
        </section>

        <section className="recipe-catalogue section-pad">
          <div className="section-heading">
            <p className="eyebrow">{lang === "fr" ? "Neuf pistes documentées" : "Neun dokumentierte Ideen"}</p>
            <h2>{lang === "fr" ? "Choisissez une idée, lisez la source." : "Idee wählen, Quelle lesen."}</h2>
            <p>
              {lang === "fr"
                ? "Les descriptions sont des résumés originaux. Ingrédients, quantités et étapes restent disponibles chez la source citée."
                : "Die Beschreibungen sind eigenständige Zusammenfassungen. Zutaten, Mengen und Schritte stehen bei der genannten Quelle."}
            </p>
          </div>
          <div className="recipe-catalogue-grid">
            {externalRecipeIdeas.map((idea, index) => (
              <article className="recipe-catalogue-card" key={`${idea.title.fr}-${idea.source}`}>
                <figure>
                  <Image src={assetPath(idea.image)} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </figure>
                <div>
                  <p className={`recipe-kind ${idea.category}`}>
                    {idea.category === "heritage" ? <BookOpen aria-hidden="true" size={15} /> : <Sparkles aria-hidden="true" size={15} />}
                    {idea.category === "heritage"
                      ? lang === "fr" ? "Usage patrimonial" : "Überlieferte Verwendung"
                      : lang === "fr" ? "Interprétation contemporaine" : "Moderne Interpretation"}
                  </p>
                  <h2>{idea.title[lang]}</h2>
                  <p>{idea.text[lang]}</p>
                  <div className="recipe-products" aria-label={lang === "fr" ? "Produits concernés" : "Verwendete Produkte"}>
                    {idea.productIds.map((id) => <span key={id}>{products[id].officialName}</span>)}
                  </div>
                  <a href={idea.source} target="_blank" rel="noreferrer">
                    {lang === "fr" ? "Lire chez la source" : "Bei der Quelle lesen"}<ExternalLink aria-hidden="true" size={14} />
                  </a>
                  <small>{lang === "fr" ? "Source" : "Quelle"} : {idea.sourceName}</small>
                </div>
              </article>
            ))}
          </div>
          <p className="recipe-photo-credit">
            {lang === "fr" ? "Images d’illustration : Association suisse des AOP-IGP ; elles ne représentent pas nécessairement la recette citée." : "Illustrationsbilder: Schweizerische Vereinigung der AOP-IGP; sie zeigen nicht zwingend das genannte Rezept."}
          </p>
        </section>

        <section className="next-step">
          <div>
            <p className="eyebrow light">{lang === "fr" ? "Les deux produits" : "Die zwei Produkte"}</p>
            <h2>{lang === "fr" ? "Choisir la forme qui convient à votre table." : "Die passende Form für Ihren Tisch wählen."}</h2>
          </div>
          <ButtonLink href={routes[lang].overview}>{lang === "fr" ? "Comparer les deux IGP" : "Die zwei IGP vergleichen"}</ButtonLink>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
