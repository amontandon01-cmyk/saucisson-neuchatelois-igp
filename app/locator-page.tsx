"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Factory, MapPin, Search, ShieldCheck, Store, Trophy } from "lucide-react";
import { googlePlaceUrl, locations, producerCount, RegionKey } from "./locations";
import { Lang } from "./content";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const regionLabels: Record<Lang, Record<"all" | RegionKey, string>> = {
  fr: { all: "Tout le canton", mountains: "Montagnes", littoral: "Littoral", "val-de-ruz": "Val-de-Ruz" },
  de: { all: "Ganzer Kanton", mountains: "Bergregion", littoral: "Seeufer", "val-de-ruz": "Val-de-Ruz" },
};

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function GoogleMark() {
  return <span className="google-mark" aria-hidden="true"><svg viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.716v2.258h2.909c1.702-1.567 2.684-3.878 2.684-6.614Z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.468-.806 5.956-2.18l-2.909-2.258c-.806.54-1.835.859-3.047.859-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18Z" />
    <path fill="#FBBC05" d="M3.963 10.707A5.41 5.41 0 0 1 3.682 9c0-.592.102-1.168.281-1.707V4.961H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.039l3.007-2.332Z" />
    <path fill="#EA4335" d="M9 3.579c1.321 0 2.507.454 3.441 1.346l2.581-2.581C13.464.892 11.43 0 9 0A9 9 0 0 0 .956 4.961l3.007 2.332C4.672 5.164 6.656 3.579 9 3.579Z" />
  </svg></span>;
}

export function LocatorPage({ lang }: { lang: Lang }) {
  const [region, setRegion] = useState<"all" | RegionKey>("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    return locations.filter((item) => {
      const matchesRegion = region === "all" || item.region === region;
      const haystack = normalize(`${item.producer} ${item.location} ${item.city}`);
      return matchesRegion && (!term || haystack.includes(term));
    });
  }, [query, region]);

  const copy = lang === "fr" ? {
    eyebrow: "Fabricants certifiés & points de vente", title: "Le Saucisson neuchâtelois IGP près de chez vous.",
    intro: "Neuf fabricants certifiés et leurs points de vente publics. Les fiches Google donnent directement les coordonnées, les horaires et les avis les plus récents.",
    producers: "fabricants certifiés", locations: "points de vente", regions: "régions", products: "produits IGP",
    search: "Rechercher un fabricant ou une localité", results: "points de vente affichés", maps: "Fiche Google", website: "Site officiel",
    award: "Meilleur Saucisson neuchâtelois IGP 2026", manufacturerStatus: "Fabricant certifié IGP",
    dataNote: "Les coordonnées et horaires ne sont pas recopiés : ouvrez la fiche Google pour obtenir l’information à jour.", empty: "Aucun point de vente ne correspond à cette recherche.",
  } : {
    eyebrow: "Zertifizierte Hersteller & Verkaufsstellen", title: "Neuenburger Saucisson IGP in Ihrer Nähe.",
    intro: "Neun zertifizierte Hersteller und ihre öffentlichen Verkaufsstellen. Aktuelle Kontaktdaten, Öffnungszeiten und Bewertungen finden Sie direkt im Google-Eintrag.",
    producers: "zertifizierte Hersteller", locations: "Verkaufsstellen", regions: "Regionen", products: "IGP-Produkte",
    search: "Hersteller oder Ort suchen", results: "Verkaufsstellen angezeigt", maps: "Google-Eintrag", website: "Offizielle Website",
    award: "Bester Neuenburger Saucisson IGP 2026", manufacturerStatus: "IGP-zertifizierter Hersteller",
    dataNote: "Kontaktdaten und Öffnungszeiten werden nicht kopiert: Der Google-Eintrag enthält den aktuellen Stand.", empty: "Keine Verkaufsstelle entspricht dieser Suche.",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "fr" ? "Fabricants certifiés et points de vente" : "Zertifizierte Hersteller und Verkaufsstellen",
    numberOfItems: locations.length,
    itemListElement: locations.map((item, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "Organization", name: `${item.producer} · ${item.location}`, addressLocality: item.city, url: item.website ?? googlePlaceUrl(item), sameAs: [googlePlaceUrl(item), ...(item.website ? [item.website] : [])] },
    })),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <section className="locator-hero" style={{ backgroundImage: `linear-gradient(118deg, rgba(23,35,30,.96), rgba(23,35,30,.82)), url('${assetPath("/aop-paysage.webp")}')` }}>
      <div><p className="eyebrow light">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.intro}</p></div>
      <div className="locator-stats" aria-label={lang === "fr" ? "Chiffres du répertoire" : "Verzeichnis in Zahlen"}>
        <div><strong>{producerCount}</strong><span>{copy.producers}</span></div><div><strong>{locations.length}</strong><span>{copy.locations}</span></div><div><strong>3</strong><span>{copy.regions}</span></div><div><strong>2</strong><span>{copy.products}</span></div>
      </div>
    </section>
    <section className="directory-section section-pad">
      <aside className="directory-validation"><ShieldCheck size={24} /><p>{lang === "fr" ? "La certification IGP et l’adhésion à l’ANMB sont deux statuts indépendants. Cette page réunit les fabricants certifiés, qu’ils soient membres de l’association ou non." : "IGP-Zertifizierung und ANMB-Mitgliedschaft sind unabhängig. Diese Seite umfasst alle zertifizierten Hersteller, ob Verbandsmitglied oder nicht."}</p></aside>
      <div className="directory-toolbar">
        <label className="directory-search"><Search size={20} /><span className="sr-only">{copy.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} /></label>
        <div className="directory-filters" aria-label={lang === "fr" ? "Filtrer par région" : "Nach Region filtern"}>{(Object.keys(regionLabels[lang]) as ("all" | RegionKey)[]).map((key) => <button type="button" className={region === key ? "active" : ""} onClick={() => setRegion(key)} key={key}>{regionLabels[lang][key]}</button>)}</div>
      </div>
      <div className="directory-result-head"><p aria-live="polite"><strong>{filtered.length}</strong> {copy.results}</p><p>{copy.dataNote}</p></div>
      <div className="location-grid">{filtered.map((item, index) => <article className="location-card" id={`location-${item.id}`} key={item.id}>
        <div className="location-card-head"><span className="location-number">{index + 1}</span><div><p className="location-producer"><Store size={16} />{item.producer}</p><h2>{item.location}</h2></div></div>
        <span className="location-city"><MapPin size={17} />{item.city}</span><span className="location-status igp"><ShieldCheck size={14} />{copy.manufacturerStatus}</span>
        {item.award && <p className="location-award"><Trophy size={17} />{copy.award}</p>}
        <div className="location-actions"><a href={googlePlaceUrl(item)} target="_blank" rel="noreferrer"><GoogleMark />{copy.maps}</a>{item.website && <a href={item.website} target="_blank" rel="noreferrer"><ExternalLink size={17} />{copy.website}</a>}</div>
      </article>)}</div>
      {filtered.length === 0 && <div className="directory-empty"><Factory size={28} /><p>{copy.empty}</p></div>}
    </section>
  </>;
}
