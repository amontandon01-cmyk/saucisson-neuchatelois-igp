import { BadgeCheck, ExternalLink, MapPin, Store } from "lucide-react";
import { routes, type Lang } from "@/content/site";
import { googlePlaceUrl, salePointsForManufacturer, type Manufacturer } from "@/data/manufacturers";
import { sources } from "@/data/sources";
import { manufacturerRoute } from "@/lib/routes";
import { JsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Breadcrumbs, ButtonLink, Facts, SourceLink } from "@/components/site/shared";

export function ManufacturerPage({ lang, manufacturer }: { lang: Lang; manufacturer: Manufacturer }) {
  const points = salePointsForManufacturer(manufacturer.id);
  const canonical = manufacturerRoute(lang, manufacturer.slug);
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: manufacturer.legalName,
    url: absoluteUrl(canonical),
    address: {
      "@type": "PostalAddress",
      addressLocality: manufacturer.locality,
      addressRegion: "NE",
      addressCountry: "CH",
    },
    sameAs: [manufacturer.website, manufacturer.source].filter(Boolean),
  };

  return (
    <>
      <Header lang={lang} current="locator" alternateHref={manufacturerRoute(lang === "fr" ? "de" : "fr", manufacturer.slug)} />
      <main id="contenu">
        <JsonLd data={organizationJsonLd} />
        <Breadcrumbs
          label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
          items={[
            { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
            { name: lang === "fr" ? "Fabricants" : "Hersteller", path: routes[lang].locator },
            { name: manufacturer.name, path: canonical },
          ]}
        />
        <section className="manufacturer-hero">
          <div>
            <p className="directory-badge certified"><BadgeCheck aria-hidden="true" size={16} />{lang === "fr" ? "Fabricant certifié IGP" : "IGP-zertifizierter Hersteller"}</p>
            <h1>{manufacturer.name}</h1>
            <p><MapPin aria-hidden="true" size={18} />{manufacturer.locality} · Canton de Neuchâtel</p>
          </div>
        </section>
        <Facts
          items={[
            { value: "OIC", label: lang === "fr" ? "organisme certificateur" : "Zertifizierungsstelle" },
            { value: points.length, label: lang === "fr" ? "point(s) de vente lié(s)" : "zugeordnete Verkaufsstelle(n)" },
            { value: "2", label: lang === "fr" ? "dénominations couvertes" : "abgedeckte Bezeichnungen" },
            { value: formatDate(manufacturer.certificateValidUntil), label: lang === "fr" ? "certificat valable jusqu’au" : "Zertifikat gültig bis" },
          ]}
        />
        <section className="manufacturer-profile section-pad">
          <article>
            <p className="eyebrow">{lang === "fr" ? "Preuve de certification" : "Zertifizierungsnachweis"}</p>
            <h2>{manufacturer.certificateNumber}</h2>
            <dl className="profile-facts">
              <div><dt>{lang === "fr" ? "Raison sociale publiée" : "Veröffentlichter Firmenname"}</dt><dd>{manufacturer.legalName}</dd></div>
              <div><dt>{lang === "fr" ? "Délivré le" : "Ausgestellt am"}</dt><dd>{formatDate(manufacturer.certificateIssuedAt)}</dd></div>
              <div><dt>{lang === "fr" ? "Valable jusqu’au" : "Gültig bis"}</dt><dd>{formatDate(manufacturer.certificateValidUntil)}</dd></div>
              <div><dt>{lang === "fr" ? "Dossier" : "Dossier"}</dt><dd>SNE</dd></div>
            </dl>
            <div className="source-list">
              <SourceLink href={manufacturer.source}>{lang === "fr" ? "Vérifier dans l’annuaire OIC" : "Im OIC-Verzeichnis prüfen"}</SourceLink>
              <SourceLink href={sources.specification}>{lang === "fr" ? "Cahier des charges" : "Pflichtenheft"}</SourceLink>
            </div>
          </article>
          <article>
            <p className="eyebrow"><Store aria-hidden="true" size={16} />{lang === "fr" ? "Points de vente liés" : "Zugeordnete Verkaufsstellen"}</p>
            <h2>{lang === "fr" ? "Où rencontrer ce fabricant." : "Wo dieser Hersteller zu finden ist."}</h2>
            <ul className="profile-points">
              {points.map((point) => (
                <li key={point.id}>
                  <div><strong>{point.name}</strong><span>{point.locality} · NE</span></div>
                  <a href={googlePlaceUrl(point)} target="_blank" rel="noreferrer">Google Maps <ExternalLink aria-hidden="true" size={14} /></a>
                </li>
              ))}
            </ul>
            {manufacturer.website && <a className="text-link" href={manufacturer.website} target="_blank" rel="noreferrer">{lang === "fr" ? "Site du fabricant" : "Website des Herstellers"}<ExternalLink aria-hidden="true" size={14} /></a>}
          </article>
        </section>
        <aside className="profile-caution section-pad compact-pad">
          <p>{lang === "fr" ? "Cette fiche ne déduit aucun récit, horaire ou disponibilité de produit. Pour ces informations variables, consultez directement le fabricant." : "Dieser Eintrag leitet keine Geschichte, Öffnungszeit oder Produktverfügbarkeit ab. Für veränderliche Angaben wenden Sie sich direkt an den Hersteller."}</p>
        </aside>
        <section className="next-step">
          <div><p className="eyebrow light">{lang === "fr" ? "Tous les fabricants" : "Alle Hersteller"}</p><h2>{lang === "fr" ? "Comparer les neuf certificats publiés." : "Die neun veröffentlichten Zertifikate vergleichen."}</h2></div>
          <ButtonLink href={routes[lang].locator}>{lang === "fr" ? "Retour à l’annuaire" : "Zurück zum Verzeichnis"}</ButtonLink>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}
