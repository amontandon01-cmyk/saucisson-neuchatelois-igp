import Image from "next/image";
import { BriefcaseBusiness, Camera, ExternalLink, Newspaper, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { routes, type Lang } from "@/content/site";
import { association } from "@/data/association";
import { products } from "@/data/products";
import { sources } from "@/data/sources";
import { assetPath } from "@/lib/site-config";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Breadcrumbs, ButtonLink, Facts, SourceLink } from "@/components/site/shared";

export function ProfessionalPage({ lang }: { lang: Lang }) {
  const audiences = lang === "fr" ? [
    { icon: ShoppingBag, title: "Commerce", text: "Identifier le fabricant certifié, conserver les dénominations exactes et distinguer lieu de fabrication et point de vente.", link: routes.fr.locator, label: "Annuaire vérifié" },
    { icon: UtensilsCrossed, title: "Gastronomie", text: "Présenter les deux formes avec précision et appliquer d’abord la consigne de cuisson portée sur l’étiquette.", link: routes.fr.cooking, label: "Consigne de cuisson" },
    { icon: Newspaper, title: "Médias", text: "S’appuyer sur le registre fédéral, le cahier des charges et les sources primaires. Les noms protégés restent inchangés en allemand.", link: routes.fr.overview, label: "Faits essentiels" },
    { icon: Camera, title: "Tourisme", text: "Relier le produit au canton et à la torrée, en vérifiant les règles de feu le jour de toute activité en plein air.", link: routes.fr.torree, label: "Page torrée" },
  ] : [
    { icon: ShoppingBag, title: "Handel", text: "Zertifizierte Hersteller erkennen, die genauen Bezeichnungen beibehalten und Herstellungsort von Verkaufsstelle trennen.", link: routes.de.locator, label: "Geprüftes Verzeichnis" },
    { icon: UtensilsCrossed, title: "Gastronomie", text: "Die zwei Formen präzise präsentieren und zuerst die Garangabe auf der Etikette beachten.", link: routes.de.cooking, label: "Garangabe" },
    { icon: Newspaper, title: "Medien", text: "Bundesregister, Pflichtenheft und Primärquellen verwenden. Die geschützten französischen Namen werden nicht übersetzt.", link: routes.de.overview, label: "Kerndaten" },
    { icon: Camera, title: "Tourismus", text: "Produkt, Kanton und Torrée verbinden und bei Aktivitäten im Freien die aktuellen Feuerregeln prüfen.", link: routes.de.torree, label: "Torrée-Seite" },
  ];

  return (
    <>
      <Header lang={lang} current="pro" />
      <main id="contenu">
        <Breadcrumbs
          label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
          items={[
            { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
            { name: lang === "fr" ? "Professionnels" : "Fachleute", path: routes[lang].pro },
          ]}
        />
        <section className="detail-hero">
          <div>
            <p className="eyebrow light">{lang === "fr" ? "Ressources professionnelles" : "Ressourcen für Fachleute"}</p>
            <h1>{lang === "fr" ? "Des faits sûrs, prêts à être utilisés." : "Verlässliche Fakten für die Praxis."}</h1>
            <p>{lang === "fr" ? "Commerce, gastronomie, médias et tourisme disposent ici d’un socle commun fondé sur les sources officielles." : "Handel, Gastronomie, Medien und Tourismus finden hier eine gemeinsame, auf offiziellen Quellen beruhende Grundlage."}</p>
          </div>
          <figure className="detail-visual">
            <Image src={assetPath("/aop-craft.webp")} alt={lang === "fr" ? "Artisan dans un fumoir neuchâtelois" : "Handwerker in einer Neuenburger Räucherkammer"} fill priority sizes="(max-width: 760px) 100vw, 440px" />
            <figcaption>{lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP"}</figcaption>
          </figure>
        </section>
        <Facts items={lang === "fr" ? [
          { value: "2", label: "dénominations exactes" },
          { value: "Neuchâtel", label: "élaboration" },
          { value: "Suisse", label: "origine des porcs" },
          { value: "OIC", label: "certification" },
        ] : [
          { value: "2", label: "genaue Bezeichnungen" },
          { value: "Neuenburg", label: "Herstellung" },
          { value: "Schweiz", label: "Herkunft der Schweine" },
          { value: "OIC", label: "Zertifizierung" },
        ]} />

        <section className="professional-section section-pad">
          <div className="section-heading"><p className="eyebrow">{lang === "fr" ? "Quatre usages" : "Vier Anwendungen"}</p><h2>{lang === "fr" ? "La bonne ressource pour chaque métier." : "Die passende Ressource für jedes Berufsfeld."}</h2></div>
          <div className="professional-grid">
            {audiences.map(({ icon: Icon, title, text, link, label }) => (
              <article key={title}><Icon aria-hidden="true" size={27} /><h2>{title}</h2><p>{text}</p><ButtonLink href={link} secondary>{label}</ButtonLink></article>
            ))}
          </div>
        </section>

        <section className="press-facts section-pad">
          <div>
            <p className="eyebrow">{lang === "fr" ? "Formulation recommandée" : "Empfohlene Formulierung"}</p>
            <h2>{products.saucisson.officialName}<br />{products.saucisse.officialName}</h2>
          </div>
          <div>
            <p>{lang === "fr" ? "Les deux noms sont des dénominations protégées. Ils conservent accents, adjectifs et mention IGP dans tous les contextes éditoriaux, y compris en allemand." : "Beide Namen sind geschützte Bezeichnungen. Akzente, Adjektive und IGP-Zusatz bleiben in jedem redaktionellen Kontext erhalten, auch auf Deutsch."}</p>
            <div className="source-list"><SourceLink href={sources.federalRegister}>OFAG</SourceLink><SourceLink href={sources.specification}>{lang === "fr" ? "Cahier des charges" : "Pflichtenheft"}</SourceLink><SourceLink href={sources.oicDirectory}>OIC</SourceLink></div>
          </div>
        </section>

        <section className="media-rights section-pad">
          <Camera aria-hidden="true" size={29} />
          <div>
            <p className="eyebrow">{lang === "fr" ? "Images et logotypes" : "Bilder und Logos"}</p>
            <h2>{lang === "fr" ? "Télécharger n’est pas toujours republier." : "Herunterladen bedeutet nicht automatisch veröffentlichen."}</h2>
            <p>{lang === "fr" ? "Avant toute réutilisation, vérifiez les conditions de l’Association suisse des AOP-IGP et demandez l’accord nécessaire. Les fichiers présents sur ce site ne constituent pas une cession de droits." : "Prüfen Sie vor jeder Wiederverwendung die Bedingungen der Schweizerischen Vereinigung der AOP-IGP und holen Sie die nötige Zustimmung ein. Dateien auf dieser Website stellen keine Rechteübertragung dar."}</p>
            <div className="source-list"><SourceLink href={sources.aopCorporateDesign}>Corporate design AOP-IGP</SourceLink><SourceLink href={sources.aopGallery}>{lang === "fr" ? "Galerie officielle" : "Offizielle Galerie"}</SourceLink></div>
          </div>
        </section>

        <section className="pro-contact">
          <div><BriefcaseBusiness aria-hidden="true" size={27} /><p className="eyebrow light">{lang === "fr" ? "Contact officiel" : "Offizieller Kontakt"}</p><h2>ANMB · c/o CNCI</h2><p>{association.address.join(" · ")}</p></div>
          <a className="button" href={`mailto:${association.email}`}>{lang === "fr" ? "Écrire au secrétariat" : "Sekretariat schreiben"}<ExternalLink aria-hidden="true" size={16} /></a>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
