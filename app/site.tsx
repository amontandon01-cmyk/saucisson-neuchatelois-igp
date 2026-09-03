import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock3, Flame, MapPin, ShieldCheck, ShoppingBag, Sparkles, UtensilsCrossed } from "lucide-react";
import { alternateRoute, Lang, PageKey, pages, routes, ui } from "./content";
import { LocatorPage } from "./locator-page";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const detailVisuals: Record<Exclude<PageKey, "locator">, { src: string; alt: Record<Lang, string>; position?: string }> = {
  product: { src: "/aop-saucisson-planche.webp", alt: { fr: "Saucisson neuchâtelois IGP entier et tranché sur une planche", de: "Neuenburger Saucisson IGP, ganz und aufgeschnitten" } },
  cooking: { src: "/aop-saucissons.webp", alt: { fr: "Saucissons neuchâtelois IGP prêts à être cuits", de: "Neuenburger Saucissons IGP, bereit zum Garen" }, position: "center 48%" },
  recipes: { src: "/aop-saucisson-creux.webp", alt: { fr: "Saucisson neuchâtelois IGP présenté avec le Creux du Van", de: "Neuenburger Saucisson IGP vor dem Creux du Van" } },
  torree: { src: "/torree-hero.webp", alt: { fr: "Saucisson près des braises lors d’une torrée", de: "Saucisson an der Glut einer Torrée" } },
  pro: { src: "/aop-craft.webp", alt: { fr: "Artisan dans un fumoir de saucissons neuchâtelois", de: "Handwerker in einer Neuenburger Saucisson-Räucherkammer" }, position: "center 30%" },
  association: { src: "/aop-paysage.webp", alt: { fr: "Paysage rural du Jura neuchâtelois", de: "Ländliche Landschaft im Neuenburger Jura" } },
};

function Brand() {
  return <span className="brand" aria-label="Saucisson neuchâtelois IGP"><Image className="brand-official-mark" src={assetPath("/logo-igp-officiel.jpg")} alt="" width={54} height={52} /><span className="brand-name">Saucisson<small>neuchâtelois · IGP</small></span></span>;
}

function Header({ lang, current }: { lang: Lang; current: "home" | PageKey }) {
  const t = ui[lang];
  return <>
    <a className="skip-link" href="#contenu">{lang === "fr" ? "Aller au contenu" : "Zum Inhalt"}</a>
    <div className="origin-strip"><span>{t.claim}</span><span>IGP · AOP-IGP Suisse</span></div>
    <header className="site-header">
      <Link href={routes[lang].home} className="brand-link"><Brand /></Link>
      <nav className="desktop-nav" aria-label={lang === "fr" ? "Navigation principale" : "Hauptnavigation"}>{t.nav.map(([key, label]) => <Link className={current === key ? "active" : ""} href={routes[lang][key]} key={key}>{label}</Link>)}</nav>
      <div className="header-actions"><Link className="pro-link" href={routes[lang].pro}>{t.pro}</Link><Link className="lang-link" href={alternateRoute(lang, current)} aria-label={t.language}>{t.short}</Link></div>
      <details className="mobile-menu"><summary>{t.menu}</summary><nav>{t.nav.map(([key, label]) => <Link href={routes[lang][key]} key={key}>{label}</Link>)}<Link href={routes[lang].pro}>{t.pro}</Link></nav></details>
    </header>
  </>;
}

function ButtonLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link className={secondary ? "button button-secondary" : "button"} href={href}>{children}<ArrowRight size={17} /></Link>;
}

function Facts({ items }: { items: { value: string; label: string }[] }) {
  return <div className="facts">{items.map((item) => <div className="fact" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>;
}

function Footer({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return <footer className="site-footer"><div className="footer-main">
    <div className="footer-identity"><Brand /><p>{lang === "fr" ? "Une spécialité protégée, un canton à découvrir." : "Eine geschützte Spezialität, ein Kanton zum Entdecken."}</p><div className="anmb-lockup"><Image src={assetPath("/logo-anmb-boucherie.svg")} alt="Boucherie neuchâteloise" width={76} height={76} /><div><strong>ANMB</strong><span>{lang === "fr" ? "Association neuchâteloise des maîtres-bouchers" : "Neuenburger Metzgermeister-Verband"}</span><Image className="anmb-signature" src={assetPath("/logo-anmb-signature.svg")} alt="Ma chair et tendre" width={188} height={21} /></div></div></div>
    <div><h2>{lang === "fr" ? "Découvrir" : "Entdecken"}</h2><Link href={routes[lang].product}>{t.nav[0][1]}</Link><Link href={routes[lang].cooking}>{t.nav[1][1]}</Link><Link href={routes[lang].torree}>{t.nav[3][1]}</Link><Link href={routes[lang].locator}>{t.nav[4][1]}</Link></div>
    <div><h2>{lang === "fr" ? "Profession" : "Beruf"}</h2><Link href={routes[lang].pro}>{t.pro}</Link><Link href={routes[lang].association}>ANMB</Link><a href="https://www.boucheries-neuchatel.ch/" target="_blank" rel="noreferrer">Site actuel ANMB</a></div>
    <div><h2>{lang === "fr" ? "Références" : "Quellen"}</h2><a href="https://www.patrimoineculinaire.ch/Produit/Saucisson-neuchatelois-IGP-saucisse-neuchateloise-IGP/29" target="_blank" rel="noreferrer">Patrimoine culinaire suisse</a><a href="https://www.aop-igp.ch/fr/au-sujet-des-aop-igp/index.php?id=303&L=2" target="_blank" rel="noreferrer">AOP-IGP Suisse</a><a href="https://www.aop-igp.ch/fileadmin/Dokumente/kampagne2025/Pflichtenhefte/SNE/Pflichtenheft%20FR%20Saucisson%20neuchatelois%20IGP.pdf" target="_blank" rel="noreferrer">{lang === "fr" ? "Cahier des charges" : "Pflichtenheft"}</a></div>
  </div><div className="footer-bottom"><span>Projet 2026 · Saucisson neuchâtelois IGP</span><span>{lang === "fr" ? "Logotypes officiels ANMB et AOP-IGP Suisse · Photographies produit : Association suisse des AOP-IGP." : "Offizielle Logos von ANMB und AOP-IGP Schweiz · Produktfotos: Schweizerische Vereinigung der AOP-IGP."}</span></div></footer>;
}

export function HomePage({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const pathways = lang === "fr" ? [
    { icon: ShieldCheck, tag: "Comprendre", title: "Pourquoi l’IGP compte", text: "Origine, recette et fumaison expliquées sans jargon.", key: "product" as PageKey },
    { icon: UtensilsCrossed, tag: "Cuisiner", title: "30 à 40 minutes, bien guidé", text: "La méthode douce et des recettes qui donnent confiance.", key: "cooking" as PageKey },
    { icon: ShoppingBag, tag: "Acheter", title: "Une adresse fiable près de vous", text: "Producteurs et revendeurs dans un annuaire validé.", key: "locator" as PageKey },
  ] : [
    { icon: ShieldCheck, tag: "Verstehen", title: "Warum die IGP zählt", text: "Herkunft, Rezeptur und Räucherung klar erklärt.", key: "product" as PageKey },
    { icon: UtensilsCrossed, tag: "Kochen", title: "30 bis 40 Minuten, gut geführt", text: "Sanfte Zubereitung und Rezepte, die Sicherheit geben.", key: "cooking" as PageKey },
    { icon: ShoppingBag, tag: "Kaufen", title: "Eine verlässliche Adresse", text: "Produzenten und Händler im geprüften Verzeichnis.", key: "locator" as PageKey },
  ];
  const recipeCards = lang === "fr" ? [["01", "Pommes de terre & poireaux", "Le classique réconfortant"], ["02", "Lentilles & herbes", "La cocotte généreuse"], ["03", "Pickles & pain de seigle", "L’apéritif contemporain"]] : [["01", "Kartoffeln & Lauch", "Der wohltuende Klassiker"], ["02", "Linsen & Kräuter", "Der grosszügige Eintopf"], ["03", "Pickles & Roggenbrot", "Der moderne Apéro"]];
  return <>
    <Header lang={lang} current="home" />
    <main id="contenu">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow light">{t.heroEyebrow}</p><h1>{t.heroTitle}</h1><p className="hero-intro">{t.heroIntro}</p><div className="button-row"><ButtonLink href={routes[lang].locator}>{t.find}</ButtonLink><ButtonLink href={routes[lang].cooking} secondary>{t.cook}</ButtonLink></div><div className="hero-seal"><ShieldCheck size={22} /><span>{lang === "fr" ? "Indication géographique protégée" : "Geschützte geografische Angabe"}</span></div></div>
        <figure className="hero-image"><Image src={assetPath("/torree-hero.webp")} alt={lang === "fr" ? "Saucisson fumé tranché près des braises lors d’une torrée" : "Geräucherter Saucisson neben der Glut einer Torrée"} fill priority sizes="(max-width: 900px) 100vw, 55vw" /><figcaption>{t.imageCaption}</figcaption></figure>
      </section>
      <Facts items={lang === "fr" ? [{ value: "2003", label: "IGP enregistrée" }, { value: "18–28 °C", label: "fumaison à froid" }, { value: "36 h", label: "procédé minimum" }, { value: "Neuchâtel", label: "lieu de fabrication" }] : [{ value: "2003", label: "IGP eingetragen" }, { value: "18–28 °C", label: "Kalträucherung" }, { value: "36 Std.", label: "Mindestverfahren" }, { value: "Neuenburg", label: "Herstellungsort" }]} />
      <section className="proof section-pad"><div><p className="eyebrow">IGP</p><h2>{t.proofTitle}</h2></div><div><p className="large-copy">{t.proofText}</p><ButtonLink href={routes[lang].product} secondary>{lang === "fr" ? "Découvrir le produit" : "Produkt entdecken"}</ButtonLink></div></section>
      <section className="pathways section-pad"><div className="section-heading"><p className="eyebrow">{lang === "fr" ? "Orientation" : "Orientierung"}</p><h2>{t.pathwayTitle}</h2><p>{t.pathwayText}</p></div><div className="pathway-grid">{pathways.map(({ icon: Icon, tag, title, text, key }) => <Link className="path-card" href={routes[lang][key]} key={key}><Icon size={24} /><span>{tag}</span><h3>{title}</h3><p>{text}</p><ArrowRight size={19} /></Link>)}</div></section>
      <section className="product-story section-pad"><figure className="product-photo"><Image src={assetPath("/aop-saucisson-planche.webp")} alt={lang === "fr" ? "Saucisson neuchâtelois IGP entier et tranché sur une planche" : "Neuenburger Saucisson IGP, ganz und aufgeschnitten"} fill sizes="(max-width: 760px) 100vw, 50vw" /><figcaption>{lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP"}</figcaption></figure><div className="story-copy"><p className="eyebrow">{t.storyKicker}</p><h2>{t.storyTitle}</h2><p>{t.storyText}</p><ul><li><Check size={17} />{lang === "fr" ? "Viande porcine suisse" : "Schweizer Schweinefleisch"}</li><li><Check size={17} />{lang === "fr" ? "Sel, poivre et ail" : "Salz, Pfeffer und Knoblauch"}</li><li><Check size={17} />{lang === "fr" ? "Fumé dans le canton" : "Im Kanton geräuchert"}</li></ul><ButtonLink href={routes[lang].product}>{lang === "fr" ? "Découvrir le produit" : "Produkt entdecken"}</ButtonLink></div></section>
      <section className="torree-band"><div className="torree-icon"><Flame size={34} /></div><div><p className="eyebrow light">{lang === "fr" ? "Culture populaire" : "Volkskultur"}</p><h2>{t.torreeTitle}</h2><p>{t.torreeText}</p></div><ButtonLink href={routes[lang].torree}>{lang === "fr" ? "Entrer dans la tradition" : "Tradition entdecken"}</ButtonLink></section>
      <section className="recipes section-pad"><div className="section-heading split"><div><p className="eyebrow">{lang === "fr" ? "À table" : "Zu Tisch"}</p><h2>{t.recipeTitle}</h2></div><div><p>{lang === "fr" ? "Des idées accessibles pour donner envie d’acheter le produit — puis de revenir." : "Einfache Ideen, die Lust auf das Produkt machen — und auf ein Wiedersehen."}</p><ButtonLink href={routes[lang].recipes} secondary>{lang === "fr" ? "Voir les recettes" : "Rezepte ansehen"}</ButtonLink></div></div><div className="recipe-grid">{recipeCards.map(([number, title, text]) => <article className="recipe-card" key={number}><span>{number}</span><div className="recipe-plate"><Sparkles size={26} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="locator-preview section-pad"><div className="locator-copy"><p className="eyebrow">{lang === "fr" ? "Circuit de confiance" : "Vertrauenswürdige Adressen"}</p><h2>{t.locatorTitle}</h2><p>{t.locatorText}</p><ButtonLink href={routes[lang].locator}>{lang === "fr" ? "Explorer l’annuaire" : "Verzeichnis erkunden"}</ButtonLink></div><div className="map-card"><div className="map-top"><span>{lang === "fr" ? "Filtrer la région" : "Region filtern"}</span><span>NE · CH</span></div><div className="abstract-map"><i className="pin pin-one"><MapPin size={24} /></i><i className="pin pin-two"><MapPin size={24} /></i><i className="pin pin-three"><MapPin size={24} /></i><span>Le Locle</span><span>Neuchâtel</span><span>Val-de-Travers</span></div><div className="map-bottom"><span><i></i>{lang === "fr" ? "Producteurs IGP" : "IGP-Produzenten"}</span><span><i></i>{lang === "fr" ? "Points de vente" : "Verkaufsstellen"}</span></div></div></section>
      <section className="award-banner"><div className="award-year">2026</div><div><p className="eyebrow light">{lang === "fr" ? "Première sélection cantonale" : "Erste kantonale Prämierung"}</p><h2>{lang === "fr" ? "Christen Delicatessen distingué." : "Christen Delicatessen ausgezeichnet."}</h2><p>{lang === "fr" ? "Claude-Alain Christen remporte la première Sélection du Saucisson neuchâtelois IGP, organisée le 25 août 2026 parmi neuf producteurs." : "Claude-Alain Christen gewinnt die erste Prämierung des Neuenburger Saucisson IGP vom 25. August 2026 unter neun Produzenten."}</p></div><a className="button" href="https://cnci.ch/premiere-selection-du-saucisson-neuchatelois-igp" target="_blank" rel="noreferrer">{lang === "fr" ? "Lire l’actualité" : "Beitrag lesen"}<ArrowRight size={17} /></a></section>
      <section className="pro-banner"><div><p className="eyebrow light">{lang === "fr" ? "Commerce & gastronomie" : "Handel & Gastronomie"}</p><h2>{t.proTitle}</h2><p>{t.proText}</p></div><ButtonLink href={routes[lang].pro}>{lang === "fr" ? "Découvrir l’espace pro" : "Fachbereich öffnen"}</ButtonLink></section>
    </main>
    <Footer lang={lang} />
  </>;
}

export function DetailPage({ lang, pageKey }: { lang: Lang; pageKey: PageKey }) {
  if (pageKey === "locator") return <><Header lang={lang} current={pageKey} /><main id="contenu"><LocatorPage lang={lang} /></main><Footer lang={lang} /></>;
  const page = pages[lang][pageKey];
  const visual = detailVisuals[pageKey];
  return <><Header lang={lang} current={pageKey} /><main id="contenu"><section className="detail-hero"><div><p className="eyebrow light">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></div><figure className="detail-visual"><Image src={assetPath(visual.src)} alt={visual.alt[lang]} fill sizes="(max-width: 760px) 100vw, 420px" style={{ objectPosition: visual.position }} /><figcaption>{visual.src === "/torree-hero.webp" ? (lang === "fr" ? "Visuel original de démonstration" : "Eigenständiges Demonstrationsmotiv") : (lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP")}</figcaption></figure></section><Facts items={page.facts} /><section className="detail-content section-pad">{page.sections.map((section, index) => <article className="detail-section" key={section.title}><div className="section-number">{String(index + 1).padStart(2, "0")}</div><div><p className="eyebrow">{section.kicker}</p><h2>{section.title}</h2><p>{section.text}</p>{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><Check size={18} />{bullet}</li>)}</ul>}</div></article>)}{page.note && <aside className="editorial-note"><Clock3 size={23} /><p>{page.note}</p></aside>}</section><section className="next-step"><div><p className="eyebrow light">{lang === "fr" ? "À vous de jouer" : "Jetzt sind Sie dran"}</p><h2>{lang === "fr" ? "Du savoir au plaisir, il n’y a qu’un pas." : "Vom Wissen zum Genuss ist es nur ein Schritt."}</h2></div><ButtonLink href={routes[lang].locator}>{ui[lang].find}</ButtonLink></section></main><Footer lang={lang} /></>;
}

export function titleFor(lang: Lang, key: "home" | PageKey) {
  if (key === "home") return lang === "fr" ? "Saucisson neuchâtelois IGP" : "Neuenburger Saucisson IGP";
  return `${pages[lang][key].title} · ${lang === "fr" ? "Saucisson neuchâtelois IGP" : "Neuenburger Saucisson IGP"}`;
}
