import Image from "next/image";
import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";
import { routes, type Lang } from "@/content/site";
import { commonProductFacts, products, type ProductId } from "@/data/products";
import { sources } from "@/data/sources";
import { absoluteUrl, assetPath } from "@/lib/site-config";
import { JsonLd } from "@/lib/seo";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Breadcrumbs, ButtonLink, Facts, SourceLink } from "@/components/site/shared";
import { CertificationProof } from "./certification-proof";

export function ProductPage({ lang, productId }: { lang: Lang; productId: ProductId }) {
  const product = products[productId];
  const otherId: ProductId = productId === "saucisson" ? "saucisse" : "saucisson";
  const other = products[otherId];
  const routeKey = productId;
  const copy = productPageCopy[lang];
  const productSpecific = productId === "saucisson" ? copy.saucisson : copy.saucisse;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.officialName,
    description: product.identity[lang],
    image: absoluteUrl(product.image),
    category: lang === "fr" ? "Charcuterie crue fumée IGP" : "Roh geräucherte IGP-Fleischspezialität",
    countryOfOrigin: { "@type": "Country", name: "Switzerland" },
    additionalProperty: [
      { "@type": "PropertyValue", name: lang === "fr" ? "Forme" : "Form", value: product.shape[lang] },
      { "@type": "PropertyValue", name: lang === "fr" ? "Zone d’élaboration" : "Herstellungsgebiet", value: lang === "fr" ? "Canton de Neuchâtel" : "Kanton Neuenburg" },
      { "@type": "PropertyValue", name: lang === "fr" ? "Origine des porcs" : "Herkunft der Schweine", value: lang === "fr" ? "Suisse" : "Schweiz" },
      { "@type": "PropertyValue", name: lang === "fr" ? "Cuisson" : "Garzeit", value: lang === "fr" ? "30 à 40 minutes dans l’eau frémissante selon la taille" : "Je nach Grösse 30 bis 40 Minuten in siedendem Wasser" },
    ],
    isSimilarTo: { "@type": "Product", name: other.officialName, url: absoluteUrl(routes[lang][otherId]) },
  };

  return (
    <>
      <Header lang={lang} current={routeKey} />
      <main id="contenu">
        <JsonLd data={productJsonLd} />
        <Breadcrumbs
          label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
          items={[
            { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
            { name: lang === "fr" ? "Les deux IGP" : "Die zwei IGP", path: routes[lang].overview },
            { name: product.officialName, path: routes[lang][routeKey] },
          ]}
        />
        <section className="detail-hero product-detail-hero">
          <div>
            <p className="eyebrow light">{lang === "fr" ? "Appellation protégée" : "Geschützte Bezeichnung"}</p>
            <h1>{product.officialName}</h1>
            <p>{product.identity[lang]}</p>
          </div>
          <figure className="detail-visual">
            <Image src={assetPath(product.image)} alt={product.imageAlt[lang]} fill priority sizes="(max-width: 760px) 100vw, 440px" />
            <figcaption>{lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP"}</figcaption>
          </figure>
        </section>
        <Facts
          label={lang === "fr" ? "Caractéristiques essentielles" : "Wesentliche Merkmale"}
          items={[
            { value: product.shape[lang], label: lang === "fr" ? "forme distinctive" : "typische Form" },
            { value: `${commonProductFacts.casingDiameterMillimeters} mm`, label: lang === "fr" ? "calibre autorisé" : "zugelassenes Kaliber" },
            { value: `${commonProductFacts.weightGrams} g`, label: lang === "fr" ? "poids autorisé" : "zugelassenes Gewicht" },
            { value: "2003", label: lang === "fr" ? "inscription IGP" : "IGP-Eintragung" },
          ]}
        />
        <section className="detail-content section-pad">
          <article className="detail-section">
            <div className="section-number">01</div>
            <div>
              <p className="eyebrow">{lang === "fr" ? "Identité & aspect" : "Identität & Aussehen"}</p>
              <h2>{productSpecific.identityTitle}</h2>
              <p>{productSpecific.identityText}</p>
            </div>
          </article>
          <article className="detail-section">
            <div className="section-number">02</div>
            <div>
              <p className="eyebrow">{lang === "fr" ? "Origine" : "Herkunft"}</p>
              <h2>{copy.originTitle}</h2>
              <p>{copy.originText}</p>
              <ul>
                <li><Check aria-hidden="true" size={18} />{copy.originPigs}</li>
                <li><Check aria-hidden="true" size={18} />{copy.originMaking}</li>
              </ul>
            </div>
          </article>
          <article className="detail-section">
            <div className="section-number">03</div>
            <div>
              <p className="eyebrow">{lang === "fr" ? "Fabrication" : "Herstellung"}</p>
              <h2>{copy.makingTitle}</h2>
              <p>{copy.makingText}</p>
              <ul>
                <li><Check aria-hidden="true" size={18} />{copy.makingLean}</li>
                <li><Check aria-hidden="true" size={18} />{copy.makingRest}</li>
                <li><Check aria-hidden="true" size={18} />{copy.makingSmoke}</li>
                <li><Check aria-hidden="true" size={18} />{copy.makingDuration}</li>
              </ul>
            </div>
          </article>
          <article className="detail-section">
            <div className="section-number">04</div>
            <div>
              <p className="eyebrow">{lang === "fr" ? "Goût & histoire" : "Geschmack & Geschichte"}</p>
              <h2>{copy.tasteTitle}</h2>
              <p>{copy.tasteText}</p>
            </div>
          </article>
          <article className="detail-section">
            <div className="section-number">05</div>
            <div>
              <p className="eyebrow">{lang === "fr" ? "Utilisation & cuisson" : "Verwendung & Zubereitung"}</p>
              <h2>{productSpecific.useTitle}</h2>
              <p>{product.use[lang]} {copy.cookingText}</p>
              <div className="inline-actions">
                <ButtonLink href={routes[lang].cooking}>{lang === "fr" ? "Voir la cuisson officielle" : "Offizielle Zubereitung"}</ButtonLink>
                <ButtonLink href={routes[lang].recipes} secondary>{lang === "fr" ? "Explorer les inspirations" : "Inspirationen ansehen"}</ButtonLink>
              </div>
            </div>
          </article>
          <article className="detail-section">
            <div className="section-number">06</div>
            <div>
              <p className="eyebrow">{lang === "fr" ? "Sources primaires" : "Primärquellen"}</p>
              <h2>{lang === "fr" ? "Vérifier directement les exigences." : "Anforderungen direkt nachlesen."}</h2>
              <p>{lang === "fr" ? "Les caractéristiques présentées sur cette page découlent du registre fédéral et du cahier des charges." : "Die Angaben auf dieser Seite beruhen auf dem Bundesregister und dem Pflichtenheft."}</p>
              <div className="source-list">
                <SourceLink href={sources.federalRegister}>OFAG · {lang === "fr" ? "registre fédéral" : "Bundesregister"}</SourceLink>
                <SourceLink href={sources.specification}>{lang === "fr" ? "Cahier des charges" : "Pflichtenheft"}</SourceLink>
                <SourceLink href={lang === "fr" ? sources.aopProductFr : sources.aopProductDe}>AOP-IGP Suisse</SourceLink>
                <SourceLink href={sources.heritage}>{lang === "fr" ? "Patrimoine culinaire suisse" : "Kulinarisches Erbe der Schweiz"}</SourceLink>
              </div>
            </div>
          </article>
        </section>
        <CertificationProof lang={lang} />
        <section className="product-crosslink section-pad">
          <div>
            <p className="eyebrow">{lang === "fr" ? "L’autre forme" : "Die andere Form"}</p>
            <h2>{other.officialName}</h2>
            <p>{other.identity[lang]} {lang === "fr" ? "Le boyau est la seule différence de préparation entre les deux." : "Der Darm ist der einzige Unterschied in der Zubereitung."}</p>
          </div>
          <Link className="button" href={routes[lang][otherId]}>
            {lang === "fr" ? "Découvrir l’autre IGP" : "Andere IGP entdecken"}
            <ExternalLink aria-hidden="true" size={16} />
          </Link>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

const productPageCopy = {
  fr: {
    originTitle: "Un produit neuchâtelois, une matière première suisse.",
    originText: "Le lien géographique repose sur le savoir-faire de transformation et d’élaboration dans le canton de Neuchâtel. Le cahier des charges encadre aussi l’origine suisse des porcs.",
    originPigs: "Naissance, engraissement, abattage et découpe exclusivement en Suisse",
    originMaking: "Transformation et élaboration dans le canton de Neuchâtel",
    makingTitle: "Une fabrication précise, sans fumée liquide.",
    makingText: "La viande est hachée en grains de 5 à 8 mm, pétrie, embossée dans un boyau de bœuf, puis égouttée, maturée et fumée à froid.",
    makingLean: "Au minimum 60 % de viande maigre et au maximum 35 % de matière grasse",
    makingRest: "Égouttage et maturation pendant au moins 12 heures à température ambiante",
    makingSmoke: "Fumage entre 18 et 28 °C ; fumée liquide interdite",
    makingDuration: "Au moins 36 heures du hachage à la vente au magasin",
    tasteTitle: "Un goût de viande et d’épices souligné par le fumé.",
    tasteText: "La fiche officielle décrit une couleur extérieure brun doré, une coupe nette, une consistance compacte et ferme ainsi qu’un goût typique de viande et d’épices. Les dénominations sont attestées dès la fin du XIXe siècle.",
    cookingText: "Pour un produit cru, l’indication officielle est une cuisson dans de l’eau frémissante pendant 30 à 40 minutes selon la taille.",
    saucisson: {
      identityTitle: "La forme droite du patrimoine neuchâtelois.",
      identityText: "Le Saucisson neuchâtelois IGP est embossé exclusivement dans un boyau de bœuf droit. Il est cru, fumé à froid et se consomme cuit.",
      useTitle: "De la table familiale à la torrée.",
    },
    saucisse: {
      identityTitle: "La forme courbe de la même tradition.",
      identityText: "La Saucisse neuchâteloise IGP est embossée exclusivement dans un boyau de bœuf courbe. Sa recette et son procédé sont ceux du Saucisson neuchâtelois IGP.",
      useTitle: "Une autre forme pour le même savoir-faire.",
    },
  },
  de: {
    originTitle: "Ein Neuenburger Produkt aus Schweizer Rohstoff.",
    originText: "Der geografische Bezug liegt im Verarbeitungs- und Herstellungswissen des Kantons Neuenburg. Das Pflichtenheft regelt zudem die Schweizer Herkunft der Schweine.",
    originPigs: "Geburt, Mast, Schlachtung und Zerlegung ausschliesslich in der Schweiz",
    originMaking: "Verarbeitung und Herstellung im Kanton Neuenburg",
    makingTitle: "Präzise Herstellung ohne Flüssigrauch.",
    makingText: "Das Fleisch wird auf 5 bis 8 mm zerkleinert, geknetet, in einen Rinderdarm gefüllt, anschliessend abgetropft, gereift und kalt geräuchert.",
    makingLean: "Mindestens 60 % Magerfleisch und höchstens 35 % Fett",
    makingRest: "Mindestens 12 Stunden Abtropfen und Reifen bei Raumtemperatur",
    makingSmoke: "Räuchern bei 18 bis 28 °C; Flüssigrauch ist verboten",
    makingDuration: "Mindestens 36 Stunden vom Zerkleinern bis zum Verkauf",
    tasteTitle: "Fleisch- und Gewürzgeschmack mit Rauchnote.",
    tasteText: "Die offizielle Produktseite beschreibt eine goldbraune Aussenfarbe, ein sauberes Schnittbild, eine kompakte und feste Konsistenz sowie einen typischen Fleisch- und Gewürzgeschmack. Die Bezeichnungen sind seit dem Ende des 19. Jahrhunderts belegt.",
    cookingText: "Für ein rohes Produkt lautet die offizielle Angabe: je nach Grösse 30 bis 40 Minuten in siedendem Wasser garen.",
    saucisson: {
      identityTitle: "Die gerade Form des Neuenburger Kulturerbes.",
      identityText: "Der Saucisson neuchâtelois IGP wird ausschliesslich in einen geraden Rinderdarm gefüllt. Er ist roh, kalt geräuchert und wird gekocht gegessen.",
      useTitle: "Vom Familientisch bis zur Torrée.",
    },
    saucisse: {
      identityTitle: "Die gebogene Form derselben Tradition.",
      identityText: "Die Saucisse neuchâteloise IGP wird ausschliesslich in einen gebogenen Rinderdarm gefüllt. Rezeptur und Verfahren entsprechen dem Saucisson neuchâtelois IGP.",
      useTitle: "Eine andere Form für dasselbe Können.",
    },
  },
} as const;
