import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { routes, type Lang } from "@/content/site";
import { events } from "@/data/events";
import { newsItems, type NewsItem } from "@/data/news";
import { newsArticleRoute } from "@/lib/routes";
import { JsonLd } from "@/lib/seo";
import { absoluteUrl, assetPath } from "@/lib/site-config";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Breadcrumbs, ButtonLink, SourceLink } from "@/components/site/shared";

export function NewsIndexPage({ lang }: { lang: Lang }) {
  return (
    <>
      <Header lang={lang} current="news" />
      <main id="contenu">
        <Breadcrumbs
          label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
          items={[
            { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
            { name: lang === "fr" ? "Actualités" : "Aktuell", path: routes[lang].news },
          ]}
        />
        <section className="news-index-hero">
          <Newspaper aria-hidden="true" size={34} />
          <p className="eyebrow light">{lang === "fr" ? "Filière des deux IGP" : "Branche der zwei IGP"}</p>
          <h1>{lang === "fr" ? "Actualités vérifiées." : "Geprüfte Meldungen."}</h1>
          <p>{lang === "fr" ? "Chaque publication s’appuie sur une source datée. Aucun événement ni palmarès n’est inventé pour remplir l’agenda." : "Jede Meldung stützt sich auf eine datierte Quelle. Weder Veranstaltungen noch Ranglisten werden zum Füllen des Kalenders erfunden."}</p>
        </section>
        <section className="news-list section-pad">
          {newsItems.map((item) => (
            <article className="news-card" key={item.id}>
              <figure><Image src={assetPath(item.image)} alt="" fill sizes="(max-width: 760px) 100vw, 44vw" /></figure>
              <div>
                <time dateTime={item.publishedAt}>{formatDate(item.publishedAt, lang)}</time>
                <h2>{item.title[lang]}</h2>
                <p>{item.summary[lang]}</p>
                <Link className="text-link" href={newsArticleRoute(lang, item)}>{lang === "fr" ? "Lire l’article" : "Artikel lesen"}<ArrowRight aria-hidden="true" size={16} /></Link>
              </div>
            </article>
          ))}
        </section>
        <section className="agenda-status section-pad">
          <CalendarDays aria-hidden="true" size={28} />
          <div>
            <p className="eyebrow">Agenda</p>
            <h2>{events.length === 0 ? (lang === "fr" ? "Aucun rendez-vous officiel publié." : "Keine offizielle Veranstaltung veröffentlicht.") : (lang === "fr" ? "Prochains rendez-vous" : "Nächste Veranstaltungen")}</h2>
            <p>{lang === "fr" ? "La structure est prête. Un événement sera affiché dès qu’une source officielle donnera sa date, son lieu et son organisateur." : "Die Struktur ist bereit. Eine Veranstaltung erscheint, sobald eine offizielle Quelle Datum, Ort und Veranstalter nennt."}</p>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

export function NewsArticlePage({ lang, item }: { lang: Lang; item: NewsItem }) {
  const currentPath = newsArticleRoute(lang, item);
  const alternatePath = newsArticleRoute(lang === "fr" ? "de" : "fr", item);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title[lang],
    description: item.summary[lang],
    datePublished: item.publishedAt,
    dateModified: item.updatedAt,
    inLanguage: lang,
    mainEntityOfPage: absoluteUrl(currentPath),
    image: absoluteUrl(item.image),
    publisher: { "@type": "Organization", name: "ANMB", url: absoluteUrl(routes[lang].association) },
    citation: item.source,
  };

  return (
    <>
      <Header lang={lang} current="news" alternateHref={alternatePath} />
      <main id="contenu">
        <JsonLd data={articleJsonLd} />
        <Breadcrumbs
          label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
          items={[
            { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
            { name: lang === "fr" ? "Actualités" : "Aktuell", path: routes[lang].news },
            { name: item.title[lang], path: currentPath },
          ]}
        />
        <article className="news-article">
          <header>
            <p className="eyebrow light">{lang === "fr" ? "Actualité sourcée" : "Belegte Meldung"}</p>
            <h1>{item.title[lang]}</h1>
            <p className="news-lead">{item.summary[lang]}</p>
            <time dateTime={item.publishedAt}>{formatDate(item.publishedAt, lang)}</time>
          </header>
          <figure>
            <Image src={assetPath(item.image)} alt={lang === "fr" ? "Saucisson neuchâtelois IGP entier et tranché" : "Saucisson neuchâtelois IGP, ganz und aufgeschnitten"} fill priority sizes="(max-width: 900px) 100vw, 900px" />
            <figcaption>{lang === "fr" ? "Photo d’illustration : Association suisse des AOP-IGP" : "Illustrationsfoto: Schweizerische Vereinigung der AOP-IGP"}</figcaption>
          </figure>
          <div className="news-body">
            {item.body[lang].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <aside>
              <h2>{lang === "fr" ? "Transparence éditoriale" : "Redaktionelle Transparenz"}</h2>
              <p>{lang === "fr" ? "Ce texte est une synthèse rédigée pour ce site à partir de la publication de la CNCI. Pour les détails et la formulation originale, consultez la source." : "Dieser Text ist eine für diese Website verfasste Zusammenfassung der CNCI-Publikation. Einzelheiten und Originalwortlaut stehen in der Quelle."}</p>
              <SourceLink href={item.source}>{lang === "fr" ? "Publication originale de la CNCI" : "Originalbeitrag der CNCI"}</SourceLink>
            </aside>
          </div>
        </article>
        <section className="next-step">
          <div><p className="eyebrow light">{lang === "fr" ? "Annuaire" : "Verzeichnis"}</p><h2>{lang === "fr" ? "Retrouver les fabricants certifiés." : "Zertifizierte Hersteller finden."}</h2></div>
          <ButtonLink href={routes[lang].locator}>{lang === "fr" ? "Voir les fabricants" : "Hersteller ansehen"}</ButtonLink>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

function formatDate(value: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-CH" : "de-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
