import Image from "next/image";
import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";
import { overviewContent, routes, type Lang } from "@/content/site";
import { commonProductFacts, products } from "@/data/products";
import { sources } from "@/data/sources";
import { assetPath } from "@/lib/site-config";
import { JsonLd } from "@/lib/seo";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Breadcrumbs, ButtonLink, Facts, SourceLink } from "@/components/site/shared";
import { CertificationProof } from "./certification-proof";

export function OverviewPage({ lang }: { lang: Lang }) {
  const page = overviewContent[lang];
  const faq = faqItems[lang];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <Header lang={lang} current="overview" />
      <main id="contenu">
        <JsonLd data={faqJsonLd} />
        <Breadcrumbs
          label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
          items={[
            { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
            { name: lang === "fr" ? "Les deux IGP" : "Die zwei IGP", path: routes[lang].overview },
          ]}
        />
        <section className="detail-hero">
          <div>
            <p className="eyebrow light">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
          </div>
          <figure className="detail-visual">
            <Image src={assetPath("/aop-saucisson-planche.webp")} alt={products.saucisson.imageAlt[lang]} fill priority sizes="(max-width: 760px) 100vw, 440px" />
            <figcaption>{lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP"}</figcaption>
          </figure>
        </section>
        <Facts
          items={[
            { value: Object.keys(products).length, label: lang === "fr" ? "dénominations protégées" : "geschützte Bezeichnungen" },
            { value: `${commonProductFacts.leanMeatMinimumPercent} %`, label: lang === "fr" ? "minimum de viande maigre" : "Mindestanteil Magerfleisch" },
            { value: `${commonProductFacts.coldSmokingCelsius} °C`, label: lang === "fr" ? "fumage à froid" : "Kalträucherung" },
            { value: `${commonProductFacts.processMinimumHours} h`, label: lang === "fr" ? "processus minimum" : "Mindestverfahren" },
          ]}
        />
        <section className="product-pillar-grid section-pad">
          {(Object.values(products)).map((product) => (
            <Link className="product-pillar-card" href={routes[lang][product.id]} key={product.id}>
              <figure><Image src={assetPath(product.image)} alt={product.imageAlt[lang]} fill sizes="(max-width: 760px) 100vw, 50vw" /></figure>
              <div>
                <p className="eyebrow">{product.shape[lang]}</p>
                <h2>{product.officialName}</h2>
                <p>{product.identity[lang]}</p>
                <span>{lang === "fr" ? "Voir la page complète" : "Vollständige Seite"}</span>
              </div>
            </Link>
          ))}
        </section>
        <section className="detail-content section-pad">
          {page.sections.map((section, index) => (
            <article className="detail-section" key={section.title}>
              <div className="section-number">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <p className="eyebrow">{section.kicker}</p>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><Check aria-hidden="true" size={18} />{bullet}</li>)}</ul>}
              </div>
            </article>
          ))}
          <div className="source-list">
            <SourceLink href={sources.federalRegister}>OFAG</SourceLink>
            <SourceLink href={sources.specification}>{lang === "fr" ? "Cahier des charges" : "Pflichtenheft"}</SourceLink>
            <SourceLink href={lang === "fr" ? sources.aopProductFr : sources.aopProductDe}>AOP-IGP Suisse</SourceLink>
          </div>
        </section>
        <CertificationProof lang={lang} />
        <section className="faq-section section-pad">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>{lang === "fr" ? "Les réponses essentielles." : "Die wichtigsten Antworten."}</h2>
          </div>
          <div className="faq-grid">
            {faq.map((item) => (
              <article key={item.question}>
                <HelpCircle aria-hidden="true" size={22} />
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="next-step">
          <div>
            <p className="eyebrow light">{lang === "fr" ? "Passer à table" : "Jetzt geniessen"}</p>
            <h2>{lang === "fr" ? "Une consigne de cuisson simple et officielle." : "Eine einfache, offizielle Garangabe."}</h2>
          </div>
          <ButtonLink href={routes[lang].cooking}>{lang === "fr" ? "Voir la cuisson" : "Zubereitung ansehen"}</ButtonLink>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

const faqItems = {
  fr: [
    { question: "Quelle différence entre les deux IGP ?", answer: "Le boyau de bœuf est droit pour le Saucisson neuchâtelois IGP et courbe pour la Saucisse neuchâteloise IGP. Le cahier des charges précise qu’il s’agit de la seule différence de préparation." },
    { question: "Que garantit l’IGP ?", answer: "L’usage des dénominations est réservé aux produits conformes au cahier des charges. Un organisme indépendant contrôle notamment la provenance, la fabrication, la traçabilité et la typicité." },
    { question: "Où sont-ils fabriqués ?", answer: "La transformation et l’élaboration ont lieu dans le canton de Neuchâtel." },
    { question: "D’où provient la viande ?", answer: "La naissance, l’engraissement, l’abattage et la découpe des porcs ont lieu exclusivement en Suisse." },
    { question: "Comment les cuire ?", answer: "Le produit cru doit porter l’indication : cuire dans de l’eau frémissante pendant 30 à 40 minutes, selon sa taille." },
    { question: "Faut-il les piquer ?", answer: "Le cahier des charges ne donne aucune consigne sur ce point. Il faut suivre l’étiquette ou les indications du fabricant." },
    { question: "Où les acheter ?", answer: "Le répertoire distingue les fabricants certifiés OIC de leurs points de vente liés. Les futurs revendeurs externes seront ajoutés seulement après validation." },
    { question: "Qu’est-ce qu’une torrée ?", answer: "Une tradition neuchâteloise consistant à faire cuire sous la cendre le Saucisson neuchâtelois IGP et des pommes de terre, sous réserve des règles de sécurité incendie du jour." },
  ],
  de: [
    { question: "Worin unterscheiden sich die zwei IGP-Spezialitäten?", answer: "Der Rinderdarm ist beim Saucisson neuchâtelois IGP gerade und bei der Saucisse neuchâteloise IGP gebogen. Laut Pflichtenheft ist dies der einzige Unterschied in der Zubereitung." },
    { question: "Was garantiert die IGP?", answer: "Die Bezeichnungen dürfen nur für Produkte verwendet werden, die dem Pflichtenheft entsprechen. Eine unabhängige Stelle kontrolliert unter anderem Herkunft, Herstellung, Rückverfolgbarkeit und Typizität." },
    { question: "Wo werden sie hergestellt?", answer: "Verarbeitung und Herstellung erfolgen im Kanton Neuenburg." },
    { question: "Woher stammt das Fleisch?", answer: "Geburt, Mast, Schlachtung und Zerlegung der Schweine finden ausschliesslich in der Schweiz statt." },
    { question: "Wie werden sie gegart?", answer: "Ein rohes Produkt muss die Angabe tragen: je nach Grösse 30 bis 40 Minuten in siedendem Wasser garen." },
    { question: "Muss man sie einstechen?", answer: "Das Pflichtenheft enthält dazu keine Anweisung. Massgebend sind die Etikette und die Hinweise des Herstellers." },
    { question: "Wo kann man sie kaufen?", answer: "Das Verzeichnis trennt OIC-zertifizierte Hersteller von ihren Verkaufsstellen. Externe Wiederverkäufer werden erst nach offizieller Bestätigung ergänzt." },
    { question: "Was ist eine Torrée?", answer: "Eine Neuenburger Tradition, bei der Saucisson neuchâtelois IGP und Kartoffeln unter der Asche garen — immer unter Beachtung der aktuellen Brandschutzvorschriften." },
  ],
} as const;
