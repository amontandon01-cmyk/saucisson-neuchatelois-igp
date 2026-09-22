import Image from "next/image";
import { BriefcaseBusiness, Check, Clock3, ExternalLink, Flame, Network, ShieldCheck } from "lucide-react";
import {
  cookingContent,
  privacyContent,
  routes,
  torreeContent,
  type DetailContent,
  type Lang,
} from "@/content/site";
import { association } from "@/data/association";
import { sources } from "@/data/sources";
import { assetPath } from "@/lib/site-config";
import { Footer } from "./footer";
import { Header } from "./header";
import { Breadcrumbs, ButtonLink, Facts, SourceLink } from "./shared";

type SupportedDetailKey = "cooking" | "torree";

const details: Record<SupportedDetailKey, Record<Lang, DetailContent>> = {
  cooking: cookingContent,
  torree: torreeContent,
};

const visuals = {
  cooking: {
    src: "/aop-saucissons.webp",
    alt: {
      fr: "Artisan présentant les deux spécialités neuchâteloises IGP",
      de: "Handwerker mit den zwei Neuenburger IGP-Spezialitäten",
    },
  },
  torree: {
    src: "/torree-hero.webp",
    alt: {
      fr: "Feu et braises en forêt, illustration d’ambiance de la torrée",
      de: "Feuer und Glut im Wald, stimmungsvolle Illustration der Torrée",
    },
  },
};

export function DetailPage({ lang, pageKey }: { lang: Lang; pageKey: SupportedDetailKey }) {
  const page = details[pageKey][lang];
  const visual = visuals[pageKey];
  const facts =
    pageKey === "cooking"
      ? lang === "fr"
        ? [
            { value: "30–40 min", label: "selon la taille" },
            { value: "Eau", label: "frémissante" },
            { value: "Étiquette", label: "consigne prioritaire" },
            { value: "2", label: "produits concernés" },
          ]
        : [
            { value: "30–40 Min.", label: "je nach Grösse" },
            { value: "Wasser", label: "siedend" },
            { value: "Etikette", label: "vorrangige Angabe" },
            { value: "2", label: "betroffene Produkte" },
          ]
      : lang === "fr"
        ? [
            { value: "Automne", label: "saison traditionnelle" },
            { value: "Cendres", label: "cuisson traditionnelle" },
            { value: "Canton", label: "ancrage neuchâtelois" },
            { value: "Jour J", label: "danger d’incendie à vérifier" },
          ]
        : [
            { value: "Herbst", label: "traditionelle Saison" },
            { value: "Asche", label: "traditionelles Garen" },
            { value: "Kanton", label: "Neuenburger Verankerung" },
            { value: "Am Tag", label: "Brandgefahr prüfen" },
          ];

  return (
    <>
      <Header lang={lang} current={pageKey} />
      <main id="contenu">
        <Breadcrumbs
          label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
          items={[
            { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
            { name: page.title, path: routes[lang][pageKey] },
          ]}
        />
        <section className="detail-hero">
          <div>
            <p className="eyebrow light">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
          </div>
          <figure className="detail-visual">
            <Image src={assetPath(visual.src)} alt={visual.alt[lang]} fill priority sizes="(max-width: 760px) 100vw, 440px" />
            <figcaption>
              {pageKey === "torree"
                ? lang === "fr"
                  ? "Image d’ambiance : Rasmus / Unsplash"
                  : "Stimmungsbild: Rasmus / Unsplash"
                : lang === "fr"
                  ? "Photo : Association suisse des AOP-IGP"
                  : "Foto: Schweizerische Vereinigung der AOP-IGP"}
            </figcaption>
          </figure>
        </section>
        <Facts items={facts} />
        <section className="detail-content section-pad">
          {page.sections.map((section, index) => (
            <article className="detail-section" key={section.title}>
              <div className="section-number">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <p className="eyebrow">{section.kicker}</p>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}><Check aria-hidden="true" size={18} />{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
          {page.note && (
            <aside className="editorial-note">
              {pageKey === "torree" ? <Flame aria-hidden="true" size={23} /> : <Clock3 aria-hidden="true" size={23} />}
              <p>{page.note}</p>
            </aside>
          )}
          <div className="source-list">
            {pageKey === "cooking" ? (
              <SourceLink href={sources.specification}>{lang === "fr" ? "Cahier des charges officiel" : "Offizielles Pflichtenheft"}</SourceLink>
            ) : (
              <>
                <SourceLink href={sources.heritage}>{lang === "fr" ? "Patrimoine culinaire suisse" : "Kulinarisches Erbe der Schweiz"}</SourceLink>
                <SourceLink href={sources.torreeTourism}>Jura & Trois-Lacs</SourceLink>
                <SourceLink href={sources.fireRisk}>{lang === "fr" ? "Danger d’incendie · canton" : "Brandgefahr · Kanton"}</SourceLink>
                <SourceLink href={sources.federalFireRisk}>{lang === "fr" ? "Vue nationale" : "Nationale Übersicht"}</SourceLink>
              </>
            )}
          </div>
        </section>
        <section className="next-step">
          <div>
            <p className="eyebrow light">{lang === "fr" ? "Prochaine étape" : "Nächster Schritt"}</p>
            <h2>{lang === "fr" ? "Trouver un fabricant certifié." : "Zertifizierten Hersteller finden."}</h2>
          </div>
          <ButtonLink href={routes[lang].locator}>{lang === "fr" ? "Consulter l’annuaire" : "Verzeichnis öffnen"}</ButtonLink>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

export function PrivacyPage({ lang }: { lang: Lang }) {
  const page = privacyContent[lang];
  const copy =
    lang === "fr"
      ? {
          noBannerTitle: "Aucun suivi publicitaire",
          noBannerText: "Le site n’intègre ni publicité, ni outil d’analyse, ni carte, vidéo ou réseau social embarqué. Aucun bandeau de consentement n’est donc affiché inutilement.",
          hostingTitle: "Données techniques et hébergement",
          hostingText: "Le site est publié avec GitHub Pages. GitHub peut traiter les données techniques nécessaires à la transmission et à la sécurité du service selon sa propre politique de confidentialité.",
          linksTitle: "Liens externes",
          linksText: "Les fiches Google, sites de fabricants et sources documentaires ne sont chargés qu’après un clic. Les règles du service externe s’appliquent alors.",
          contactTitle: "Responsable et contact",
        }
      : {
          noBannerTitle: "Kein Werbe-Tracking",
          noBannerText: "Die Website bindet weder Werbung noch Analysedienste, Karten, Videos oder soziale Netzwerke ein. Deshalb erscheint kein unnötiger Einwilligungsbanner.",
          hostingTitle: "Technische Daten und Hosting",
          hostingText: "Die Website wird mit GitHub Pages veröffentlicht. GitHub kann die für Übertragung und Sicherheit erforderlichen technischen Daten gemäss der eigenen Datenschutzerklärung verarbeiten.",
          linksTitle: "Externe Links",
          linksText: "Google-Einträge, Herstellerseiten und Dokumentationsquellen werden erst nach einem Klick geladen. Dann gelten die Regeln des externen Dienstes.",
          contactTitle: "Verantwortliche Stelle und Kontakt",
        };

  return (
    <>
      <Header lang={lang} current="privacy" />
      <main id="contenu">
        <Breadcrumbs
          label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
          items={[
            { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
            { name: page.title, path: routes[lang].privacy },
          ]}
        />
        <section className="legal-hero">
          <p className="eyebrow light">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </section>
        <Facts
          items={
            lang === "fr"
              ? [
                  { value: "0", label: "publicité" },
                  { value: "0", label: "outil d’analyse" },
                  { value: "0", label: "contenu embarqué" },
                  { value: "ANMB", label: "responsable" },
                ]
              : [
                  { value: "0", label: "Werbung" },
                  { value: "0", label: "Analysedienste" },
                  { value: "0", label: "eingebettete Inhalte" },
                  { value: "ANMB", label: "Verantwortliche Stelle" },
                ]
          }
        />
        <section className="legal-content section-pad">
          <article><ShieldCheck aria-hidden="true" size={28} /><div><h2>{copy.noBannerTitle}</h2><p>{copy.noBannerText}</p></div></article>
          <article><Network aria-hidden="true" size={28} /><div><h2>{copy.hostingTitle}</h2><p>{copy.hostingText}</p><a href={sources.privacyGitHub} target="_blank" rel="noreferrer">GitHub Privacy Statement <ExternalLink aria-hidden="true" size={15} /></a></div></article>
          <article><ExternalLink aria-hidden="true" size={28} /><div><h2>{copy.linksTitle}</h2><p>{copy.linksText}</p></div></article>
          <article><BriefcaseBusiness aria-hidden="true" size={28} /><div><h2>{copy.contactTitle}</h2><p>{association.name}, {association.address.join(", ")}.</p><a href={`mailto:${association.email}`}>{association.email}</a></div></article>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

export type { SupportedDetailKey };
