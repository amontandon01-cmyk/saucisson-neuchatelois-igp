"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  Store,
  Trophy,
} from "lucide-react";
import {
  googleDirectionsUrl,
  googlePlaceUrl,
  locations,
  producerCount,
  RegionKey,
  SaleLocation,
} from "./locations";
import { Lang } from "./content";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const regionLabels: Record<Lang, Record<"all" | RegionKey, string>> = {
  fr: {
    all: "Tout le canton",
    mountains: "Montagnes",
    littoral: "Littoral",
    "val-de-ruz": "Val-de-Ruz",
  },
  de: {
    all: "Ganzer Kanton",
    mountains: "Bergregion",
    littoral: "Seeufer",
    "val-de-ruz": "Val-de-Ruz",
  },
};

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function GoogleMark() {
  return <span className="google-mark" aria-hidden="true"><svg viewBox="0 0 18 18" role="img">
    <path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.716v2.258h2.909c1.702-1.567 2.684-3.878 2.684-6.614Z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.468-.806 5.956-2.18l-2.909-2.258c-.806.54-1.835.859-3.047.859-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18Z" />
    <path fill="#FBBC05" d="M3.963 10.707A5.41 5.41 0 0 1 3.682 9c0-.592.102-1.168.281-1.707V4.961H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.039l3.007-2.332Z" />
    <path fill="#EA4335" d="M9 3.579c1.321 0 2.507.454 3.441 1.346l2.581-2.581C13.464.892 11.43 0 9 0A9 9 0 0 0 .956 4.961l3.007 2.332C4.672 5.164 6.656 3.579 9 3.579Z" />
  </svg></span>;
}

function DirectoryMap({ items, lang }: { items: SaleLocation[]; lang: Lang }) {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current) return;
    let disposed = false;
    let cleanup = () => {};

    void import("leaflet").then((L) => {
      if (disposed || !mapElement.current) return;

      const map = L.map(mapElement.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([47.035, 6.88], 10);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const bounds = L.latLngBounds([]);
      items.forEach((item, index) => {
        const icon = L.divIcon({
          className: "directory-marker-wrap",
          html: `<span class="directory-marker"><b>${index + 1}</b></span>`,
          iconSize: [34, 40],
          iconAnchor: [17, 38],
        });
        const marker = L.marker([item.latitude, item.longitude], { icon }).addTo(map);
        marker.bindTooltip(`${item.producer} · ${item.location}`, { direction: "top" });
        marker.on("click", () => document.getElementById(`location-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
        bounds.extend([item.latitude, item.longitude]);
      });

      if (items.length > 0) map.fitBounds(bounds, { padding: [34, 34], maxZoom: 13 });
      window.setTimeout(() => map.invalidateSize(), 50);
      cleanup = () => map.remove();
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [items]);

  return <div className="directory-map" ref={mapElement} role="region" aria-label={lang === "fr" ? "Carte des points de vente" : "Karte der Verkaufsstellen"} />;
}

export function LocatorPage({ lang }: { lang: Lang }) {
  const [region, setRegion] = useState<"all" | RegionKey>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    return locations.filter((item) => {
      const matchesRegion = region === "all" || item.region === region;
      const haystack = normalize(`${item.producer} ${item.location} ${item.address} ${item.city}`);
      return matchesRegion && (!term || haystack.includes(term));
    });
  }, [query, region]);

  const copy = lang === "fr" ? {
    eyebrow: "Producteurs & points de vente",
    title: "Le Saucisson neuchâtelois IGP près de chez vous.",
    intro: "Neuf maisons productrices et leurs adresses publiques réunies sur une seule carte. Pour les horaires, avis et fermetures exceptionnelles, la fiche Google reste la source la plus actuelle.",
    producers: "producteurs IGP",
    addresses: "adresses publiques",
    regions: "régions",
    updated: "mise à jour",
    search: "Rechercher une boucherie ou une localité",
    results: "adresses affichées",
    maps: "Voir la fiche Google",
    directions: "Itinéraire",
    website: "Site de la boucherie",
    award: "Meilleur Saucisson neuchâtelois IGP 2026",
    validation: "Version de travail : les neuf producteurs sont recoupés avec les sources publiques disponibles en 2026. L’ANMB ou l’organisme de certification doit confirmer la liste avant le lancement officiel.",
    source: "Source de l’adresse",
    dataNote: "Nous ne recopions pas les horaires ni les avis : ils évoluent et restent consultables directement sur Google.",
  } : {
    eyebrow: "Produzenten & Verkaufsstellen",
    title: "Neuenburger Saucisson IGP in Ihrer Nähe.",
    intro: "Neun produzierende Betriebe und ihre öffentlichen Adressen auf einer Karte. Aktuelle Öffnungszeiten, Bewertungen und Sonderöffnungen finden Sie direkt im Google-Eintrag.",
    producers: "IGP-Produzenten",
    addresses: "öffentliche Adressen",
    regions: "Regionen",
    updated: "aktualisiert",
    search: "Metzgerei oder Ort suchen",
    results: "Adressen angezeigt",
    maps: "Google-Eintrag öffnen",
    directions: "Route",
    website: "Website der Metzgerei",
    award: "Bester Neuenburger Saucisson IGP 2026",
    validation: "Arbeitsversion: Die neun Produzenten wurden mit den 2026 verfügbaren öffentlichen Quellen abgeglichen. Vor dem offiziellen Start muss die ANMB oder die Zertifizierungsstelle die Liste bestätigen.",
    source: "Adressquelle",
    dataNote: "Öffnungszeiten und Bewertungen werden nicht kopiert: Sie ändern sich und bleiben direkt bei Google aktuell.",
  };

  const structuredData = locations.map((item) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${item.producer} · ${item.location}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: item.address,
      postalCode: item.postalCode,
      addressLocality: item.city,
      addressCountry: "CH",
    },
    telephone: item.phone,
    url: item.website ?? googlePlaceUrl(item),
    geo: {
      "@type": "GeoCoordinates",
      latitude: item.latitude,
      longitude: item.longitude,
    },
    sameAs: [googlePlaceUrl(item), ...(item.website ? [item.website] : [])],
  }));

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <section className="locator-hero" style={{ backgroundImage: `linear-gradient(118deg, rgba(23,35,30,.96), rgba(23,35,30,.82)), url('${assetPath("/aop-paysage.webp")}')` }}>
      <div>
        <p className="eyebrow light">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </div>
      <div className="locator-stats" aria-label={lang === "fr" ? "Chiffres de l’annuaire" : "Verzeichnis in Zahlen"}>
        <div><strong>{producerCount}</strong><span>{copy.producers}</span></div>
        <div><strong>{locations.length}</strong><span>{copy.addresses}</span></div>
        <div><strong>3</strong><span>{copy.regions}</span></div>
        <div><strong>03.09.2026</strong><span>{copy.updated}</span></div>
      </div>
    </section>

    <section className="directory-section section-pad">
      <aside className="directory-validation"><ShieldCheck size={24} /><p>{copy.validation}</p></aside>
      <div className="directory-toolbar">
        <label className="directory-search">
          <Search size={20} />
          <span className="sr-only">{copy.search}</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} />
        </label>
        <div className="directory-filters" aria-label={lang === "fr" ? "Filtrer par région" : "Nach Region filtern"}>
          {(Object.keys(regionLabels[lang]) as ("all" | RegionKey)[]).map((key) => <button type="button" className={region === key ? "active" : ""} onClick={() => setRegion(key)} key={key}>{regionLabels[lang][key]}</button>)}
        </div>
      </div>

      <DirectoryMap items={filtered} lang={lang} />

      <div className="directory-result-head">
        <p aria-live="polite"><strong>{filtered.length}</strong> {copy.results}</p>
        <p>{copy.dataNote}</p>
      </div>

      <div className="location-grid">
        {filtered.map((item, index) => <article className="location-card" id={`location-${item.id}`} key={item.id}>
          <div className="location-card-head">
            <span className="location-number">{index + 1}</span>
            <div><p className="location-producer"><Store size={16} />{item.producer}</p><h2>{item.location}</h2></div>
          </div>
          {item.award && <p className="location-award"><Trophy size={17} />{copy.award}</p>}
          <address><MapPin size={19} /><span>{item.address}<br />{item.postalCode} {item.city}</span></address>
          <a className="location-phone" href={`tel:${item.phone.replace(/\s/g, "")}`}><Phone size={18} />{item.phone}</a>
          <div className="location-actions">
            <a href={googlePlaceUrl(item)} target="_blank" rel="noreferrer"><GoogleMark />{copy.maps}</a>
            <a href={googleDirectionsUrl(item)} target="_blank" rel="noreferrer"><Navigation size={17} />{copy.directions}</a>
            {item.website && <a href={item.website} target="_blank" rel="noreferrer"><ExternalLink size={17} />{copy.website}</a>}
          </div>
          <a className="location-source" href={item.sourceUrl} target="_blank" rel="noreferrer">{copy.source}</a>
        </article>)}
      </div>
      {filtered.length === 0 && <div className="directory-empty"><MapPin size={28} /><p>{lang === "fr" ? "Aucune adresse ne correspond à cette recherche." : "Keine Adresse entspricht dieser Suche."}</p></div>}
    </section>
  </>;
}
