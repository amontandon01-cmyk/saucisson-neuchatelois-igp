"use client";

import Link from "next/link";
import { BadgeCheck, ExternalLink, MapPin, Search, Store } from "lucide-react";
import type { Lang } from "@/content/site";
import {
  googlePlaceUrl,
  manufacturers,
  salePointsForManufacturer,
  type RegionKey,
} from "@/data/manufacturers";
import { manufacturerRoute } from "@/lib/routes";
import { useMemo, useState } from "react";

type RegionFilter = "all" | RegionKey;

const regionLabels: Record<Lang, Record<RegionFilter, string>> = {
  fr: { all: "Toutes les régions", mountains: "Montagnes", littoral: "Littoral", "val-de-ruz": "Val-de-Ruz" },
  de: { all: "Alle Regionen", mountains: "Berge", littoral: "Seeufer", "val-de-ruz": "Val-de-Ruz" },
};

export function LocatorDirectory({ lang }: { lang: Lang }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "fr" ? "fr-CH" : "de-CH");
    return manufacturers.filter((manufacturer) => {
      const points = salePointsForManufacturer(manufacturer.id);
      const regionMatch = region === "all" || points.some((point) => point.region === region);
      const searchable = [
        manufacturer.name,
        manufacturer.legalName,
        manufacturer.locality,
        ...points.flatMap((point) => [point.name, point.locality]),
      ].join(" ").toLocaleLowerCase(lang === "fr" ? "fr-CH" : "de-CH");
      return regionMatch && (!needle || searchable.includes(needle));
    });
  }, [lang, query, region]);

  return (
    <section className="directory-section section-pad" aria-labelledby="directory-title">
      <div className="directory-toolbar">
        <label className="directory-search">
          <Search aria-hidden="true" size={20} />
          <span className="sr-only">{lang === "fr" ? "Rechercher un fabricant ou une localité" : "Hersteller oder Ort suchen"}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={lang === "fr" ? "Fabricant, magasin ou localité…" : "Hersteller, Geschäft oder Ort…"}
          />
        </label>
        <div className="directory-filters" aria-label={lang === "fr" ? "Filtrer par région" : "Nach Region filtern"}>
          {(Object.keys(regionLabels[lang]) as RegionFilter[]).map((key) => (
            <button
              type="button"
              className={region === key ? "active" : undefined}
              aria-pressed={region === key}
              onClick={() => setRegion(key)}
              key={key}
            >
              {regionLabels[lang][key]}
            </button>
          ))}
        </div>
      </div>

      <div className="directory-result-head">
        <h2 id="directory-title">
          {lang === "fr" ? "Fabricants certifiés OIC" : "OIC-zertifizierte Hersteller"}
        </h2>
        <p aria-live="polite">
          <strong>{visible.length}</strong> {lang === "fr" ? "résultat(s)" : "Ergebnis(se)"}
        </p>
      </div>

      {visible.length > 0 ? (
        <div className="manufacturer-grid">
          {visible.map((manufacturer, index) => {
            const points = salePointsForManufacturer(manufacturer.id);
            return (
              <article className="manufacturer-card" key={manufacturer.id}>
                <div className="manufacturer-card-head">
                  <span className="location-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="directory-badge certified"><BadgeCheck aria-hidden="true" size={15} />{lang === "fr" ? "Fabricant certifié IGP" : "IGP-zertifizierter Hersteller"}</p>
                    <h3>{manufacturer.name}</h3>
                    <p className="manufacturer-locality"><MapPin aria-hidden="true" size={16} />{manufacturer.locality} · NE</p>
                  </div>
                </div>

                <dl className="certificate-data">
                  <div>
                    <dt>{lang === "fr" ? "Certificat OIC" : "OIC-Zertifikat"}</dt>
                    <dd>{manufacturer.certificateNumber}</dd>
                  </div>
                  <div>
                    <dt>{lang === "fr" ? "Valable jusqu’au" : "Gültig bis"}</dt>
                    <dd>{formatDate(manufacturer.certificateValidUntil)}</dd>
                  </div>
                </dl>

                <div className="manufacturer-points">
                  <p><Store aria-hidden="true" size={16} />{lang === "fr" ? "Points de vente du fabricant" : "Verkaufsstellen des Herstellers"}</p>
                  <ul>
                    {points.map((point) => (
                      <li key={point.id}>
                        <div>
                          <span>{point.name}</span>
                          <small>{point.locality}</small>
                        </div>
                        <a href={googlePlaceUrl(point)} target="_blank" rel="noreferrer" aria-label={`${point.name} · Google Maps`}>
                          <MapPin aria-hidden="true" size={16} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="location-actions">
                  <Link href={manufacturerRoute(lang, manufacturer.slug)}>
                    {lang === "fr" ? "Fiche vérifiée" : "Geprüfter Eintrag"}
                  </Link>
                  <a href={manufacturer.source} target="_blank" rel="noreferrer">
                    {lang === "fr" ? "Vérifier chez l’OIC" : "Bei der OIC prüfen"}<ExternalLink aria-hidden="true" size={14} />
                  </a>
                  {manufacturer.website && (
                    <a href={manufacturer.website} target="_blank" rel="noreferrer">
                      {lang === "fr" ? "Site" : "Website"}<ExternalLink aria-hidden="true" size={14} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="directory-empty" role="status">
          <Search aria-hidden="true" size={24} />
          <p>{lang === "fr" ? "Aucun fabricant ne correspond à ces critères." : "Kein Hersteller entspricht diesen Kriterien."}</p>
        </div>
      )}
    </section>
  );
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}
