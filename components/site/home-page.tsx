import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Flame,
  Newspaper,
  ShieldCheck,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { routes, ui, type Lang } from "@/content/site";
import { association } from "@/data/association";
import { manufacturerCount, salePointCount } from "@/data/manufacturers";
import { newsItems } from "@/data/news";
import { products } from "@/data/products";
import { newsArticleRoute } from "@/lib/routes";
import { JsonLd, websiteJsonLd } from "@/lib/seo";
import { absoluteUrl, assetPath } from "@/lib/site-config";
import { Footer } from "./footer";
import { Header } from "./header";
import { ButtonLink } from "./shared";

const torreePhotoUrl =
  "https://unsplash.com/photos/campfire-burning-with-smoke-in-a-forest-setting-Z38mI0BC8g4";

export function HomePage({ lang }: { lang: Lang }) {
  const copy = ui[lang];
  const latestNews = newsItems[0];
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl(routes[lang].association)}#organization`,
    name: association.name,
    alternateName: association.shortName,
    url: absoluteUrl(routes[lang].association),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue de la Serre 4",
      postalCode: "2001",
      addressLocality: "Neuchâtel",
      addressCountry: "CH",
    },
    telephone: association.phone,
    email: association.email,
  };

  const reasons =
    lang === "fr"
      ? [
          ["Origine", "Porcs nés, élevés, abattus et découpés exclusivement en Suisse."],
          ["Territoire", "Transformation et élaboration dans le canton de Neuchâtel."],
          ["Contrôle", "Cahier des charges fédéral et certification indépendante par l’OIC."],
        ]
      : [
          ["Herkunft", "Schweine ausschliesslich in der Schweiz geboren, gemästet, geschlachtet und zerlegt."],
          ["Gebiet", "Verarbeitung und Herstellung im Kanton Neuenburg."],
          ["Kontrolle", "Eidgenössisches Pflichtenheft und unabhängige Zertifizierung durch die OIC."],
        ];

  return (
    <>
      <Header lang={lang} current="home" />
      <main id="contenu">
        <JsonLd data={websiteJsonLd(lang)} />
        <JsonLd data={organizationJsonLd} />
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow light">{copy.heroEyebrow}</p>
            <h1>{copy.heroTitle}</h1>
            <p className="hero-intro">{copy.heroIntro}</p>
            <div className="button-row">
              <ButtonLink href={routes[lang].overview}>
                {lang === "fr" ? "Découvrir les deux IGP" : "Die zwei IGP entdecken"}
              </ButtonLink>
              <ButtonLink href={routes[lang].locator} secondary>
                {copy.find}
              </ButtonLink>
            </div>
            <div className="hero-seal">
              <ShieldCheck aria-hidden="true" size={22} />
              <span>
                {lang === "fr"
                  ? "Dénominations protégées depuis 2003"
                  : "Seit 2003 geschützte Bezeichnungen"}
              </span>
            </div>
          </div>
          <figure className="hero-image">
            <Image
              src={assetPath("/torree-hero.webp")}
              alt={
                lang === "fr"
                  ? "Feu de bois et braises en forêt, illustration d’ambiance"
                  : "Holzfeuer und Glut im Wald, stimmungsvolle Illustration"
              }
              fill
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <figcaption>
              {lang === "fr" ? "Image d’ambiance · " : "Stimmungsbild · "}
              <a href={torreePhotoUrl} target="_blank" rel="noreferrer">
                Rasmus / Unsplash
              </a>
            </figcaption>
          </figure>
        </section>

        <section className="home-products section-pad" aria-labelledby="home-products-title">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">{lang === "fr" ? "Les deux dénominations" : "Die zwei Bezeichnungen"}</p>
              <h2 id="home-products-title">
                {lang === "fr" ? "Deux formes, la même protection." : "Zwei Formen, derselbe Schutz."}
              </h2>
            </div>
            <p>
              {lang === "fr"
                ? "Les deux spécialités partagent la même recette et le même procédé. Seule la forme du boyau de bœuf les distingue."
                : "Beide Spezialitäten teilen Rezeptur und Verfahren. Nur die Form des Rinderdarms unterscheidet sie."}
            </p>
          </div>
          <div className="product-pillar-grid home-product-grid">
            {Object.values(products).map((product) => (
              <Link className="product-pillar-card" href={routes[lang][product.id]} key={product.id}>
                <figure>
                  <Image src={assetPath(product.image)} alt={product.imageAlt[lang]} fill sizes="(max-width: 760px) 100vw, 50vw" />
                </figure>
                <div>
                  <p className="eyebrow">{product.shape[lang]}</p>
                  <h3>{product.officialName}</h3>
                  <p>{product.identity[lang]}</p>
                  <span>{lang === "fr" ? "Voir sa page de référence" : "Referenzseite öffnen"}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="igp-home-block section-pad">
          <div className="section-heading">
            <p className="eyebrow">IGP</p>
            <h2>{lang === "fr" ? "Ce que la protection établit." : "Was der Schutz festlegt."}</h2>
            <p>
              {lang === "fr"
                ? "L’IGP relie un produit à son territoire par des exigences vérifiables — pas par une simple promesse marketing."
                : "Die IGP verbindet ein Produkt durch überprüfbare Anforderungen mit seinem Gebiet — nicht durch ein blosses Werbeversprechen."}
            </p>
          </div>
          <div className="pathway-grid">
            {reasons.map(([title, text], index) => (
              <article className="path-card" key={title}>
                <BadgeCheck aria-hidden="true" size={24} />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="inline-actions">
            <ButtonLink href={routes[lang].overview} secondary>
              {lang === "fr" ? "Comprendre le cahier des charges" : "Pflichtenheft verstehen"}
            </ButtonLink>
          </div>
        </section>

        <section className="product-story section-pad">
          <figure className="product-photo">
            <Image
              src={assetPath("/aop-craft.webp")}
              alt={lang === "fr" ? "Artisan dans un fumoir" : "Handwerker in einer Räucherkammer"}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <figcaption>
              {lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP"}
            </figcaption>
          </figure>
          <div className="story-copy">
            <p className="eyebrow">{lang === "fr" ? "Savoir-faire" : "Handwerk"}</p>
            <h2>{lang === "fr" ? "Du hachage au fumage à froid." : "Vom Zerkleinern bis zum Kalträuchern."}</h2>
            <p>
              {lang === "fr"
                ? "La fabrication est cadrée : grain de 5 à 8 mm, maturation, fumage entre 18 et 28 °C et au moins 36 heures de processus."
                : "Die Herstellung ist klar geregelt: 5 bis 8 mm Körnung, Reifung, Räuchern bei 18 bis 28 °C und mindestens 36 Stunden Verfahren."}
            </p>
            <ul>
              <li><Check aria-hidden="true" size={17} />{lang === "fr" ? "Au moins 60 % de viande maigre" : "Mindestens 60 % Magerfleisch"}</li>
              <li><Check aria-hidden="true" size={17} />{lang === "fr" ? "Au moins 12 heures d’égouttage et maturation" : "Mindestens 12 Stunden Abtropfen und Reifen"}</li>
              <li><Check aria-hidden="true" size={17} />{lang === "fr" ? "Fumée liquide interdite" : "Flüssigrauch verboten"}</li>
            </ul>
            <ButtonLink href={routes[lang].overview}>{lang === "fr" ? "Voir la fabrication" : "Herstellung ansehen"}</ButtonLink>
          </div>
        </section>

        <section className="cooking-callout">
          <div>
            <UtensilsCrossed aria-hidden="true" size={30} />
            <p className="eyebrow light">{lang === "fr" ? "Cuisson officielle" : "Offizielle Garangabe"}</p>
            <h2>{lang === "fr" ? "Eau frémissante. 30 à 40 minutes." : "Siedendes Wasser. 30 bis 40 Minuten."}</h2>
            <p>
              {lang === "fr"
                ? "La durée dépend de la taille. L’étiquette du fabricant reste la référence pour chaque produit."
                : "Die Dauer hängt von der Grösse ab. Für das einzelne Produkt gilt die Etikette des Herstellers."}
            </p>
          </div>
          <ButtonLink href={routes[lang].cooking}>{copy.cook}</ButtonLink>
        </section>

        <section className="recipes section-pad">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">{lang === "fr" ? "À table" : "Zu Tisch"}</p>
              <h2>{lang === "fr" ? "Recettes attribuées, idées bien sourcées." : "Zugeordnete Rezepte, belegte Ideen."}</h2>
            </div>
            <div>
              <p>
                {lang === "fr"
                  ? "Les recettes externes restent chez leurs auteurs. Le site en résume l’idée et vous conduit vers la source originale."
                  : "Externe Rezepte bleiben bei ihren Urhebern. Die Website fasst die Idee zusammen und führt zur Originalquelle."}
              </p>
              <ButtonLink href={routes[lang].recipes} secondary>{lang === "fr" ? "Explorer les inspirations" : "Inspirationen entdecken"}</ButtonLink>
            </div>
          </div>
        </section>

        <section className="torree-band">
          <div className="torree-icon"><Flame aria-hidden="true" size={34} /></div>
          <div>
            <p className="eyebrow light">{lang === "fr" ? "Patrimoine vivant" : "Lebendiges Kulturerbe"}</p>
            <h2>{lang === "fr" ? "La torrée neuchâteloise." : "Die Neuenburger Torrée."}</h2>
            <p>
              {lang === "fr"
                ? "Une tradition de plein air, à pratiquer seulement après vérification des consignes incendie du jour."
                : "Eine Tradition im Freien — nur nach Prüfung der aktuellen Brandschutzvorschriften."}
            </p>
          </div>
          <ButtonLink href={routes[lang].torree}>{lang === "fr" ? "Comprendre la tradition" : "Tradition verstehen"}</ButtonLink>
        </section>

        <section className="locator-preview section-pad">
          <div className="locator-copy">
            <p className="eyebrow">{lang === "fr" ? "Annuaire vérifié" : "Geprüftes Verzeichnis"}</p>
            <h2>{lang === "fr" ? "Des fabricants certifiés, clairement identifiés." : "Zertifizierte Hersteller, klar gekennzeichnet."}</h2>
            <p>
              {lang === "fr"
                ? "L’annuaire distingue le fabricant certifié de ses magasins. Chaque certificat renvoie à l’OIC."
                : "Das Verzeichnis trennt zertifizierte Hersteller von ihren Geschäften. Jedes Zertifikat verweist auf die OIC."}
            </p>
            <div className="locator-preview-stats">
              <span><strong>{manufacturerCount}</strong>{lang === "fr" ? "fabricants certifiés" : "zertifizierte Hersteller"}</span>
              <span><strong>{salePointCount}</strong>{lang === "fr" ? "points de vente liés" : "zugeordnete Verkaufsstellen"}</span>
            </div>
            <ButtonLink href={routes[lang].locator}>{lang === "fr" ? "Consulter l’annuaire" : "Verzeichnis öffnen"}</ButtonLink>
          </div>
          <figure className="locator-photo">
            <Image src={assetPath("/aop-paysage.webp")} alt={lang === "fr" ? "Paysage rural du canton de Neuchâtel" : "Ländliche Landschaft im Kanton Neuenburg"} fill sizes="(max-width: 760px) 100vw, 55vw" />
            <figcaption>{lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP"}</figcaption>
          </figure>
        </section>

        <section className="pro-banner">
          <div>
            <BriefcaseBusiness aria-hidden="true" size={26} />
            <p className="eyebrow light">{lang === "fr" ? "Commerce · gastronomie · médias · tourisme" : "Handel · Gastronomie · Medien · Tourismus"}</p>
            <h2>{lang === "fr" ? "Des faits prêts à être cités." : "Zitierfähige Kerndaten."}</h2>
            <p>{lang === "fr" ? "Ressources officielles, formulation des noms protégés et contacts de la filière." : "Offizielle Ressourcen, korrekte Schreibweise der geschützten Namen und Branchenkontakte."}</p>
          </div>
          <ButtonLink href={routes[lang].pro}>{lang === "fr" ? "Ouvrir l’espace professionnel" : "Fachbereich öffnen"}</ButtonLink>
        </section>

        <section className="news-home section-pad">
          <div className="news-home-icon"><Newspaper aria-hidden="true" size={28} /></div>
          <div>
            <p className="eyebrow">{lang === "fr" ? "Actualité vérifiée" : "Geprüfte Meldung"}</p>
            <h2>{latestNews.title[lang]}</h2>
            <p>{latestNews.summary[lang]}</p>
          </div>
          <Link className="button button-secondary" href={newsArticleRoute(lang, latestNews)}>
            {lang === "fr" ? "Lire l’article" : "Artikel lesen"}<ArrowRight aria-hidden="true" size={17} />
          </Link>
        </section>

        <section className="association-home">
          <div>
            <ShoppingBag aria-hidden="true" size={26} />
            <p className="eyebrow light">ANMB</p>
            <h2>{lang === "fr" ? "Le groupement officiel des deux IGP." : "Die offizielle Trägerschaft der zwei IGP."}</h2>
            <p>{association.igpRole[lang]}</p>
          </div>
          <ButtonLink href={routes[lang].association}>{lang === "fr" ? "Découvrir l’ANMB" : "ANMB kennenlernen"}</ButtonLink>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
