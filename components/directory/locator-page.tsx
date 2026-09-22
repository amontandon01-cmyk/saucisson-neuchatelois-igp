import Image from "next/image";
import { BadgeCheck, Store } from "lucide-react";
import { routes, type Lang } from "@/content/site";
import { manufacturerCount, regionCount, salePointCount } from "@/data/manufacturers";
import { sources } from "@/data/sources";
import { assetPath } from "@/lib/site-config";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Breadcrumbs } from "@/components/site/shared";
import { LocatorDirectory } from "./locator-directory";

export function LocatorPage({ lang }: { lang: Lang }) {
  return (
    <>
      <Header lang={lang} current="locator" />
      <main id="contenu">
        <Breadcrumbs
          label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
          items={[
            { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
            { name: lang === "fr" ? "Fabricants et points de vente" : "Hersteller und Verkaufsstellen", path: routes[lang].locator },
          ]}
        />
        <section className="locator-hero locator-reference-hero">
          <div>
            <p className="eyebrow light">{lang === "fr" ? "Répertoire vérifié le 22 septembre 2026" : "Verzeichnis geprüft am 22. September 2026"}</p>
            <h1>{lang === "fr" ? "Fabricants certifiés et points de vente." : "Zertifizierte Hersteller und Verkaufsstellen."}</h1>
            <p>
              {lang === "fr"
                ? "Les entreprises ci-dessous disposent d’un certificat OIC publié. Leurs points de vente sont présentés séparément : vendre le produit ne signifie pas le fabriquer."
                : "Die untenstehenden Betriebe verfügen über ein veröffentlichtes OIC-Zertifikat. Ihre Verkaufsstellen sind separat aufgeführt: Ein Produkt zu verkaufen bedeutet nicht, es herzustellen."}
            </p>
          </div>
          <div className="locator-stats" aria-label={lang === "fr" ? "Chiffres de l’annuaire" : "Zahlen zum Verzeichnis"}>
            <div><strong>{manufacturerCount}</strong><span>{lang === "fr" ? "fabricants certifiés" : "zertifizierte Hersteller"}</span></div>
            <div><strong>{salePointCount}</strong><span>{lang === "fr" ? "points de vente liés" : "zugeordnete Verkaufsstellen"}</span></div>
            <div><strong>{regionCount}</strong><span>{lang === "fr" ? "régions" : "Regionen"}</span></div>
            <div><strong>OIC</strong><span>{lang === "fr" ? "source de certification" : "Zertifizierungsquelle"}</span></div>
          </div>
          <Image className="locator-hero-background" src={assetPath("/aop-paysage.webp")} alt="" fill priority sizes="100vw" />
        </section>
        <aside className="directory-validation section-pad compact-pad">
          <BadgeCheck aria-hidden="true" size={24} />
          <p>
            {lang === "fr"
              ? "Source primaire : annuaire public de l’Organisme intercantonal de certification (dossier SNE). Les dates de validité sont affichées sur chaque fiche."
              : "Primärquelle: öffentliches Verzeichnis der interkantonalen Zertifizierungsstelle (Dossier SNE). Die Gültigkeitsdaten stehen in jedem Eintrag."}
            {" "}<a href={sources.oicDirectory} target="_blank" rel="noreferrer">{lang === "fr" ? "Consulter l’OIC" : "OIC-Verzeichnis öffnen"}</a>
          </p>
        </aside>
        <LocatorDirectory lang={lang} />
        <section className="retailer-note section-pad">
          <Store aria-hidden="true" size={26} />
          <div>
            <p className="eyebrow">{lang === "fr" ? "Revendeurs externes" : "Externe Wiederverkäufer"}</p>
            <h2>{lang === "fr" ? "Une catégorie prête, aucune adresse non vérifiée." : "Kategorie vorbereitet, keine ungeprüfte Adresse."}</h2>
            <p>{lang === "fr" ? "Les enseignes, commerces spécialisés et restaurants seront ajoutés lorsqu’une source datée permettra de confirmer la disponibilité réelle des deux produits." : "Detailhandel, Fachgeschäfte und Restaurants werden ergänzt, sobald eine datierte Quelle die tatsächliche Verfügbarkeit der zwei Produkte bestätigt."}</p>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
