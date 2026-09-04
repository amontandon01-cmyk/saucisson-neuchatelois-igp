import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Check, Clock3, ExternalLink, Factory, Flame, Network, ShieldCheck, ShoppingBag, Store, Users, UtensilsCrossed } from "lucide-react";
import { alternateRoute, Lang, PageKey, pages, routes, ui } from "./content";
import { LocatorPage } from "./locator-page";
import { RecipesPageContent } from "./recipes-page";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const torreePhotoUrl = "https://unsplash.com/photos/campfire-burning-with-smoke-in-a-forest-setting-Z38mI0BC8g4";
const productSpecificationUrl = "https://www.aop-igp.ch/fileadmin/Dokumente/kampagne2025/Pflichtenhefte/SNE/Pflichtenheft%20FR%20Saucisson%20neuchatelois%20IGP.pdf";
const certificationControlsUrl = "https://www.aop-igp.ch/fr/au-sujet-des-aop-igp/aop-igp-en-suisse/controles-et-certification";

const detailVisuals: Record<Exclude<PageKey, "locator" | "recipes" | "members" | "committee" | "partners" | "privacy">, { src: string; alt: Record<Lang, string>; position?: string }> = {
  product: { src: "/aop-saucisson-planche.webp", alt: { fr: "Saucisson neuchâtelois IGP entier et tranché sur une planche", de: "Neuenburger Saucisson IGP, ganz und aufgeschnitten" } },
  cooking: { src: "/aop-saucissons.webp", alt: { fr: "Artisan présentant des Saucissons neuchâtelois IGP prêts à être cuits", de: "Handwerker mit Neuenburger Saucissons IGP, bereit zum Garen" }, position: "center 26%" },
  torree: { src: "/torree-hero.webp", alt: { fr: "Feu de bois et braises en forêt, évocation de la torrée", de: "Holzfeuer und Glut im Wald als Sinnbild der Torrée" } },
  pro: { src: "/aop-craft.webp", alt: { fr: "Artisan dans un fumoir de saucissons neuchâtelois", de: "Handwerker in einer Neuenburger Saucisson-Räucherkammer" }, position: "center 30%" },
  association: { src: "/aop-paysage.webp", alt: { fr: "Paysage rural du Jura neuchâtelois", de: "Ländliche Landschaft im Neuenburger Jura" } },
};

function Brand() {
  return <span className="brand" aria-label="Saucisson neuchâtelois IGP et Saucisse neuchâteloise IGP"><Image className="brand-official-mark" src={assetPath("/logo-igp-officiel.png")} alt="" width={54} height={52} /><span className="brand-name">Saucisson<small>neuchâtelois · IGP</small></span></span>;
}

const associationKeys: PageKey[] = ["association", "members", "committee", "partners"];

const committee = [
  { name: "Alexandre Léger", company: "Boucherie Léger", role: { fr: "Président", de: "Präsident" } },
  { name: "Fredy Frank", company: "Rochefort", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
  { name: "Jean-Paul Gremion", company: "Boucherie Gremion", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
  { name: "Pierre Montandon", company: "Montandon SA", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
  { name: "Bernard Perroud", company: "Boucherie-Charcuterie de la Prairie", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
  { name: "Pierre Stamm", company: "Boucherie Stamm", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
  { name: "Frédéric Troiano", company: "Boucherie de la Fontaine", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
];

const partnerGroups = [
  {
    title: { fr: "Réseaux professionnels", de: "Berufsnetzwerke" },
    note: { fr: "Organisations qui soutiennent la branche, la formation et l’économie cantonale.", de: "Organisationen für Branche, Berufsbildung und kantonale Wirtschaft." },
    partners: [
      { logo: "/logo-sff.svg", darkLogo: true, name: "SFF · Schweizer Fleisch-Fachverband", href: "https://sff.ch/fr", text: { fr: "Organisation nationale de la branche carnée.", de: "Nationale Organisation der Fleischbranche." } },
      { logo: "/logo-ren.svg", name: "Réseau d’entreprises formatrices neuchâteloises", href: "https://reneuchatel.ch/", text: { fr: "Réseau cantonal consacré à la formation professionnelle.", de: "Kantonales Netzwerk für die Berufsbildung." } },
      { logo: "/logo-cnci.png", darkLogo: true, name: "Chambre neuchâteloise du commerce et de l’industrie", href: "https://www.cnci.ch/", text: { fr: "Secrétariat patronal et relais économique cantonal.", de: "Arbeitgebersekretariat und kantonales Wirtschaftsnetzwerk." } },
    ],
  },
  {
    title: { fr: "Protection et certification de l’IGP", de: "Schutz und Zertifizierung der IGP" },
    note: { fr: "Sources institutionnelles pour le statut, le cahier des charges et les contrôles.", de: "Institutionelle Quellen für Status, Pflichtenheft und Kontrollen." },
    partners: [
      { logo: "/logo-igp-officiel.png", name: "Association suisse des AOP-IGP", href: "https://www.aop-igp.ch/fr/saucisson-neuchatelois-igp", text: { fr: "Fiche officielle des deux spécialités neuchâteloises IGP.", de: "Offizielle Produktseite der beiden Neuenburger IGP-Spezialitäten." } },
      { logo: "/logo-oic.svg", name: "Organisme intercantonal de certification", href: "https://www.oic-izs.ch/Prestations/AOP-IGP", text: { fr: "Organisme chargé du contrôle et de la certification.", de: "Stelle für Kontrolle und Zertifizierung." } },
      { logo: "/logo-ofag.svg", name: "Office fédéral de l’agriculture", href: "https://www.blw.admin.ch/fr/aop-igp-appellations-dorigine-et-indications-geographiques", text: { fr: "Registre fédéral des appellations AOP et IGP.", de: "Bundesregister der AOP- und IGP-Bezeichnungen." } },
    ],
  },
  {
    title: { fr: "Terroir et patrimoine culinaire", de: "Terroir und kulinarisches Erbe" },
    note: { fr: "Pages qui documentent ou valorisent directement la spécialité neuchâteloise.", de: "Seiten, die die Neuenburger Spezialität dokumentieren oder fördern." },
    partners: [
      { logo: "/logo-suisse-terroir.svg", name: "Suisse Terroir", href: "https://www.suisseterroir.ch/adresse/saucisson-neuchatelois-igp/2975/FR", text: { fr: "Présentation nationale du produit et de son aire d’origine.", de: "Nationale Präsentation des Produkts und seines Herkunftsgebiets." } },
      { logo: "/logo-patrimoine.svg", name: "Patrimoine culinaire suisse", href: "https://www.patrimoineculinaire.ch/Produit/Saucisson-neuchatelois-IGP-saucisse-neuchateloise-IGP/29", text: { fr: "Histoire, usages, fabrication et tradition de la torrée.", de: "Geschichte, Verwendung, Herstellung und Torrée-Tradition." } },
      { logo: "/logo-nvt.svg", name: "Neuchâtel Vins et Terroir", href: "https://neuchatel-vins-terroir.ch/", text: { fr: "Promotion des produits et vins du terroir neuchâtelois.", de: "Förderung der Neuenburger Weine und Regionalprodukte." } },
    ],
  },
  {
    title: { fr: "Filière et rayonnement touristique", de: "Branche und touristische Ausstrahlung" },
    note: { fr: "Relais utiles pour inscrire le produit dans la viande suisse et la destination Neuchâtel.", de: "Wichtige Plattformen für Schweizer Fleisch und die Destination Neuenburg." },
    partners: [
      { logo: "/logo-proviande.svg", name: "Proviande · Viande Suisse", href: "https://www.proviande.ch/fr", text: { fr: "Interprofession suisse de la filière viande.", de: "Schweizer Branchenorganisation der Fleischwirtschaft." } },
      { logo: "/logo-suisse-tourisme.svg", name: "Suisse Tourisme · Neuchâtel", href: "https://www.myswitzerland.com/fr-ch/destinations/neuchatel/", text: { fr: "Page officielle de la destination Neuchâtel.", de: "Offizielle Seite der Destination Neuenburg." } },
      { logo: "/logo-j3l.svg", name: "Jura & Trois-Lacs · Pays de Neuchâtel", href: "https://www.j3l.ch/fr/Z12892/a-faire/boire-manger/produits-regionaux/torree-neuchateloise", text: { fr: "Présentation touristique de la torrée neuchâteloise.", de: "Touristische Präsentation der Neuenburger Torrée." } },
    ],
  },
];

function Header({ lang, current }: { lang: Lang; current: "home" | PageKey }) {
  const t = ui[lang];
  const associationActive = current !== "home" && associationKeys.includes(current);
  return <>
    <a className="skip-link" href="#contenu">{lang === "fr" ? "Aller au contenu" : "Zum Inhalt"}</a>
    <div className="origin-strip"><span>{t.claim}</span><span>{lang === "fr" ? "Deux spécialités certifiées IGP" : "Zwei IGP-zertifizierte Spezialitäten"}</span></div>
    <header className="site-header">
      <Link href={routes[lang].home} className="brand-link"><Brand /></Link>
      <nav className="desktop-nav" aria-label={lang === "fr" ? "Navigation principale" : "Hauptnavigation"}>{t.nav.map(([key, label]) => <Link className={current === key ? "active" : ""} href={routes[lang][key]} key={key}>{label}</Link>)}</nav>
      <div className="header-actions"><Link className="association-link" aria-current={associationActive ? "page" : undefined} href={routes[lang].association}>ANMB</Link><Link className="pro-link" href={routes[lang].pro}>{t.pro}</Link><Link className="lang-link" href={alternateRoute(lang, current)} aria-label={t.language}>{t.short}</Link></div>
      <details className="mobile-menu"><summary>{t.menu}</summary><nav>{t.nav.map(([key, label]) => <Link href={routes[lang][key]} key={key}>{label}</Link>)}<Link href={routes[lang].pro}>{t.pro}</Link><Link href={routes[lang].association}>ANMB · {lang === "fr" ? "Association" : "Verband"}</Link><Link href={routes[lang].members}>{lang === "fr" ? "Adhésion ANMB" : "ANMB-Mitgliedschaft"}</Link><Link href={routes[lang].committee}>{lang === "fr" ? "Comité ANMB" : "ANMB-Vorstand"}</Link><Link href={routes[lang].partners}>{lang === "fr" ? "Réseau & références" : "Netzwerk & Referenzen"}</Link></nav></details>
    </header>
  </>;
}

function AssociationSubnav({ lang, current }: { lang: Lang; current: PageKey }) {
  const links: [PageKey, string][] = lang === "fr"
    ? [["association", "L’association"], ["members", "Adhésion"], ["committee", "Comité ANMB"], ["partners", "Réseau & références"]]
    : [["association", "Der Verband"], ["members", "Mitgliedschaft"], ["committee", "ANMB-Vorstand"], ["partners", "Netzwerk & Referenzen"]];
  return <nav className="association-subnav" aria-label={lang === "fr" ? "Navigation de l’ANMB" : "Navigation des Verbands"}>
    <Link className="association-subnav-brand" href={routes[lang].association}><Image src={assetPath("/logo-anmb-boucherie.png")} alt="" width={44} height={44} /><span><strong>ANMB</strong><small>{lang === "fr" ? "Association professionnelle" : "Berufsverband"}</small></span></Link>
    <div>{links.map(([key, label]) => <Link className={current === key ? "active" : ""} aria-current={current === key ? "page" : undefined} href={routes[lang][key]} key={key}>{label}</Link>)}</div>
  </nav>;
}

function ButtonLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link className={secondary ? "button button-secondary" : "button"} href={href}>{children}<ArrowRight size={17} /></Link>;
}

function Facts({ items }: { items: { value: string; label: string }[] }) {
  return <div className="facts">{items.map((item) => <div className="fact" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>;
}

function CertificationProof({ lang }: { lang: Lang }) {
  const criteria = lang === "fr"
    ? ["Aspect extérieur", "Aspect intérieur", "Consistance", "Saveur & odeur"]
    : ["Äusseres", "Schnittbild", "Konsistenz", "Geschmack & Geruch"];
  const stages = lang === "fr" ? [
    { number: "01", title: "Contrôler la fabrication", text: "Des inspections, analyses et vérifications de traçabilité contrôlent le respect du cahier des charges." },
    { number: "02", title: "Déguster le produit", text: "Le comité réunit la commission de contrôle de l’ANMB et peut faire appel à d’autres dégustateurs, professionnels ou non." },
    { number: "03", title: "Maintenir le droit d’usage", text: "L’OIC assure la certification indépendante. En cas de non-conformité, le droit d’utiliser la dénomination protégée peut être retiré." },
  ] : [
    { number: "01", title: "Herstellung kontrollieren", text: "Inspektionen, Analysen und Rückverfolgbarkeitsprüfungen sichern die Einhaltung des Pflichtenhefts." },
    { number: "02", title: "Produkt verkosten", text: "Das Komitee besteht aus der ANMB-Kontrollkommission und kann weitere, auch berufsfremde Verkoster beiziehen." },
    { number: "03", title: "Nutzungsrecht erhalten", text: "Die OIC zertifiziert unabhängig. Bei Nichtkonformität kann das Recht auf die geschützte Bezeichnung entzogen werden." },
  ];

  return <section className="certification-proof">
    <div className="certification-proof-inner section-pad">
      <div className="certification-proof-heading">
        <div><p className="eyebrow light">{lang === "fr" ? "Contrôles & dégustation" : "Kontrolle & Verkostung"}</p><h2>{lang === "fr" ? "L’IGP se mérite aussi à la dégustation." : "Die IGP muss auch bei der Verkostung überzeugen."}</h2></div>
        <div><p>{lang === "fr" ? "Chaque unité de production fait l’objet d’une évaluation organoleptique annuelle. Pour conserver le droit d’utiliser l’IGP, le produit et sa fabrication doivent rester conformes au cahier des charges." : "Jede Produktionseinheit wird jährlich sensorisch beurteilt. Damit das Recht auf die IGP erhalten bleibt, müssen Produkt und Herstellung dem Pflichtenheft entsprechen."}</p><div className="certification-links"><a href={productSpecificationUrl} target="_blank" rel="noreferrer">{lang === "fr" ? "Cahier des charges" : "Pflichtenheft"}<ExternalLink size={14} /></a><a href={certificationControlsUrl} target="_blank" rel="noreferrer">{lang === "fr" ? "Contrôles AOP-IGP" : "AOP-IGP-Kontrollen"}<ExternalLink size={14} /></a></div></div>
      </div>
      <div className="certification-scorecard">
        <div className="certification-score"><BadgeCheck size={30} /><strong>4<small>/6</small></strong><span>{lang === "fr" ? "minimum sur chacun des quatre critères" : "mindestens in jedem der vier Kriterien"}</span></div>
        <div className="certification-criteria">{criteria.map((criterion, index) => <span key={criterion}><b>{String(index + 1).padStart(2, "0")}</b>{criterion}</span>)}</div>
      </div>
      <div className="certification-stages">{stages.map((stage) => <article key={stage.number}><span>{stage.number}</span><h3>{stage.title}</h3><p>{stage.text}</p></article>)}</div>
    </div>
  </section>;
}

function Footer({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return <footer className="site-footer"><div className="footer-main">
    <div className="footer-identity"><Brand /><p>{lang === "fr" ? "Deux spécialités protégées, un canton à découvrir." : "Zwei geschützte Spezialitäten, ein Kanton zum Entdecken."}</p><div className="anmb-lockup"><Image src={assetPath("/logo-anmb-boucherie.png")} alt="Boucherie neuchâteloise" width={76} height={76} /><div><strong>ANMB</strong><span>{lang === "fr" ? "Association neuchâteloise des maîtres-bouchers" : "Neuenburger Metzgermeister-Verband"}</span><Image className="anmb-signature" src={assetPath("/logo-anmb-signature.png")} alt="Ma chair et tendre" width={188} height={21} /></div></div></div>
    <div><h2>{lang === "fr" ? "Découvrir" : "Entdecken"}</h2><Link href={routes[lang].product}>{t.nav[0][1]}</Link><Link href={routes[lang].cooking}>{t.nav[1][1]}</Link><Link href={routes[lang].torree}>{t.nav[3][1]}</Link><Link href={routes[lang].locator}>{t.nav[4][1]}</Link><Link href={routes[lang].pro}>{t.pro}</Link></div>
    <div><h2>{lang === "fr" ? "Association" : "Verband"}</h2><Link href={routes[lang].association}>ANMB</Link><Link href={routes[lang].members}>{lang === "fr" ? "Adhésion ANMB" : "ANMB-Mitgliedschaft"}</Link><Link href={routes[lang].committee}>{lang === "fr" ? "Comité ANMB" : "ANMB-Vorstand"}</Link><Link href={routes[lang].partners}>{lang === "fr" ? "Réseau & références" : "Netzwerk & Referenzen"}</Link></div>
    <div><h2>{lang === "fr" ? "Références" : "Quellen"}</h2><a href="https://www.aop-igp.ch/fr/saucisson-neuchatelois-igp" target="_blank" rel="noreferrer">AOP-IGP Suisse</a><a href="https://www.suisseterroir.ch/adresse/saucisson-neuchatelois-igp/2975/FR" target="_blank" rel="noreferrer">Suisse Terroir</a><a href="https://www.patrimoineculinaire.ch/Produit/Saucisson-neuchatelois-IGP-saucisse-neuchateloise-IGP/29" target="_blank" rel="noreferrer">Patrimoine culinaire suisse</a><Link href={routes[lang].privacy}>{lang === "fr" ? "Protection des données" : "Datenschutz"}</Link></div>
  </div><div className="footer-bottom"><span>{lang === "fr" ? "© 2026 · Saucisson neuchâtelois IGP & Saucisse neuchâteloise IGP · ANMB" : "© 2026 · Neuenburger Saucisson IGP & Saucisse IGP · ANMB"}</span><span>{lang === "fr" ? "Logotypes officiels ANMB et AOP-IGP Suisse · Photographies produit : Association suisse des AOP-IGP." : "Offizielle Logos von ANMB und AOP-IGP Schweiz · Produktfotos: Schweizerische Vereinigung der AOP-IGP."}</span></div></footer>;
}

export function HomePage({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const pathways = lang === "fr" ? [
    { icon: ShieldCheck, tag: "Comprendre", title: "Pourquoi l’IGP compte", text: "Origine, recette et fumaison expliquées sans jargon.", key: "product" as PageKey },
    { icon: UtensilsCrossed, tag: "Cuisiner", title: "30 à 40 minutes, bien guidé", text: "La méthode douce et des recettes qui donnent confiance.", key: "cooking" as PageKey },
    { icon: ShoppingBag, tag: "Acheter", title: "Une adresse fiable près de vous", text: "Fabricants certifiés et points de vente avec accès direct à Google.", key: "locator" as PageKey },
  ] : [
    { icon: ShieldCheck, tag: "Verstehen", title: "Warum die IGP zählt", text: "Herkunft, Rezeptur und Räucherung klar erklärt.", key: "product" as PageKey },
    { icon: UtensilsCrossed, tag: "Kochen", title: "30 bis 40 Minuten, gut geführt", text: "Sanfte Zubereitung und Rezepte, die Sicherheit geben.", key: "cooking" as PageKey },
    { icon: ShoppingBag, tag: "Kaufen", title: "Eine verlässliche Adresse", text: "Zertifizierte Hersteller und Verkaufsstellen mit direktem Google-Zugang.", key: "locator" as PageKey },
  ];
  const recipeCards = lang === "fr" ? [
    { number: "01", title: "La torrée & sa salade", text: "La tradition au cœur des braises", image: "/aop-saucisson-creux.webp" },
    { number: "02", title: "Brioche au saucisson", text: "Un classique de fête", image: "/aop-craft.webp" },
    { number: "03", title: "Poireaux, pommes de terre", text: "L’assiette familiale", image: "/aop-saucisson-planche.webp" },
  ] : [
    { number: "01", title: "Torrée & Kartoffelsalat", text: "Tradition aus der Glut", image: "/aop-saucisson-creux.webp" },
    { number: "02", title: "Saucisson in Brioche", text: "Ein Festtagsklassiker", image: "/aop-craft.webp" },
    { number: "03", title: "Lauch und Kartoffeln", text: "Der Familienteller", image: "/aop-saucisson-planche.webp" },
  ];
  return <>
    <Header lang={lang} current="home" />
    <main id="contenu">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow light">{t.heroEyebrow}</p><h1>{t.heroTitle}</h1><p className="hero-intro">{t.heroIntro}</p><div className="button-row"><ButtonLink href={routes[lang].locator}>{t.find}</ButtonLink><ButtonLink href={routes[lang].cooking} secondary>{t.cook}</ButtonLink></div><div className="hero-seal"><ShieldCheck size={22} /><span>{lang === "fr" ? "Certification IGP · origine et savoir-faire contrôlés" : "IGP-Zertifizierung · kontrollierte Herkunft und Herstellung"}</span></div></div>
        <figure className="hero-image"><Image src={assetPath("/torree-hero.webp")} alt={lang === "fr" ? "Feu de bois et braises en forêt, évocation de la torrée" : "Holzfeuer und Glut im Wald als Sinnbild der Torrée"} fill priority sizes="(max-width: 900px) 100vw, 55vw" /><figcaption>{t.imageCaption} <a href={torreePhotoUrl} target="_blank" rel="noreferrer">{lang === "fr" ? "Photo : Rasmus / Unsplash" : "Foto: Rasmus / Unsplash"}</a></figcaption></figure>
      </section>
      <Facts items={lang === "fr" ? [{ value: "2003", label: "IGP enregistrée" }, { value: "18–28 °C", label: "fumaison à froid" }, { value: "36 h", label: "procédé minimum" }, { value: "Neuchâtel", label: "lieu de fabrication" }] : [{ value: "2003", label: "IGP eingetragen" }, { value: "18–28 °C", label: "Kalträucherung" }, { value: "36 Std.", label: "Mindestverfahren" }, { value: "Neuenburg", label: "Herstellungsort" }]} />
      <section className="proof section-pad"><div><p className="eyebrow">IGP</p><h2>{t.proofTitle}</h2></div><div><p className="large-copy">{t.proofText}</p><ButtonLink href={routes[lang].product} secondary>{lang === "fr" ? "Découvrir le produit" : "Produkt entdecken"}</ButtonLink></div></section>
      <section className="pathways section-pad"><div className="section-heading"><p className="eyebrow">{lang === "fr" ? "Orientation" : "Orientierung"}</p><h2>{t.pathwayTitle}</h2><p>{t.pathwayText}</p></div><div className="pathway-grid">{pathways.map(({ icon: Icon, tag, title, text, key }) => <Link className="path-card" href={routes[lang][key]} key={key}><Icon size={24} /><span>{tag}</span><h3>{title}</h3><p>{text}</p><ArrowRight size={19} /></Link>)}</div></section>
      <section className="product-story section-pad"><figure className="product-photo"><Image src={assetPath("/aop-saucisson-planche.webp")} alt={lang === "fr" ? "Saucisson neuchâtelois IGP entier et tranché sur une planche" : "Neuenburger Saucisson IGP, ganz und aufgeschnitten"} fill sizes="(max-width: 760px) 100vw, 50vw" /><figcaption>{lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP"}</figcaption></figure><div className="story-copy"><p className="eyebrow">{t.storyKicker}</p><h2>{t.storyTitle}</h2><p>{t.storyText}</p><ul><li><Check size={17} />{lang === "fr" ? "Viande porcine suisse" : "Schweizer Schweinefleisch"}</li><li><Check size={17} />{lang === "fr" ? "Sel, poivre et ail" : "Salz, Pfeffer und Knoblauch"}</li><li><Check size={17} />{lang === "fr" ? "Fumé dans le canton" : "Im Kanton geräuchert"}</li></ul><ButtonLink href={routes[lang].product}>{lang === "fr" ? "Découvrir le produit" : "Produkt entdecken"}</ButtonLink></div></section>
      <section className="torree-band"><div className="torree-icon"><Flame size={34} /></div><div><p className="eyebrow light">{lang === "fr" ? "Culture populaire" : "Volkskultur"}</p><h2>{t.torreeTitle}</h2><p>{t.torreeText}</p></div><ButtonLink href={routes[lang].torree}>{lang === "fr" ? "Entrer dans la tradition" : "Tradition entdecken"}</ButtonLink></section>
      <section className="recipes section-pad"><div className="section-heading split"><div><p className="eyebrow">{lang === "fr" ? "À table" : "Zu Tisch"}</p><h2>{t.recipeTitle}</h2></div><div><p>{lang === "fr" ? "Un répertoire sourcé des usages historiques et des créations contemporaines." : "Ein belegtes Verzeichnis historischer Anwendungen und moderner Kreationen."}</p><ButtonLink href={routes[lang].recipes} secondary>{lang === "fr" ? "Explorer les recettes" : "Rezepte entdecken"}</ButtonLink></div></div><div className="recipe-grid">{recipeCards.map(({ number, title, text, image }) => <article className="recipe-card" key={number}><span>{number}</span><div className="recipe-card-image"><Image src={assetPath(image)} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="locator-preview section-pad"><div className="locator-copy"><p className="eyebrow">{lang === "fr" ? "Circuit de confiance" : "Vertrauenswürdige Adressen"}</p><h2>{t.locatorTitle}</h2><p>{t.locatorText}</p><div className="locator-preview-stats"><span><strong>9</strong>{lang === "fr" ? "fabricants certifiés" : "zertifizierte Hersteller"}</span><span><strong>14</strong>{lang === "fr" ? "points de vente" : "Verkaufsstellen"}</span></div><ButtonLink href={routes[lang].locator}>{lang === "fr" ? "Voir les fabricants" : "Hersteller ansehen"}</ButtonLink></div><figure className="locator-photo"><Image src={assetPath("/aop-paysage.webp")} alt={lang === "fr" ? "Paysage du canton de Neuchâtel" : "Landschaft des Kantons Neuenburg"} fill sizes="(max-width: 760px) 100vw, 55vw" /><figcaption>{lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP"}</figcaption></figure></section>
      <section className="award-banner"><div className="award-year">2026</div><div><p className="eyebrow light">{lang === "fr" ? "Première sélection cantonale" : "Erste kantonale Prämierung"}</p><h2>{lang === "fr" ? "Christen Delicatessen distingué." : "Christen Delicatessen ausgezeichnet."}</h2><p>{lang === "fr" ? "Claude-Alain Christen remporte la première Sélection du Saucisson neuchâtelois IGP, organisée le 25 août 2026 parmi neuf boucheries participantes." : "Claude-Alain Christen gewinnt die erste Prämierung des Neuenburger Saucisson IGP vom 25. August 2026 unter neun teilnehmenden Metzgereien."}</p></div><a className="button" href="https://cnci.ch/premiere-selection-du-saucisson-neuchatelois-igp" target="_blank" rel="noreferrer">{lang === "fr" ? "Lire l’actualité" : "Beitrag lesen"}<ArrowRight size={17} /></a></section>
      <section className="pro-banner"><div><p className="eyebrow light">{lang === "fr" ? "Commerce & gastronomie" : "Handel & Gastronomie"}</p><h2>{t.proTitle}</h2><p>{t.proText}</p></div><ButtonLink href={routes[lang].pro}>{lang === "fr" ? "Découvrir l’espace pro" : "Fachbereich öffnen"}</ButtonLink></section>
    </main>
    <Footer lang={lang} />
  </>;
}

function AssociationHero({ lang, pageKey }: { lang: Lang; pageKey: PageKey }) {
  const page = pages[lang][pageKey];
  return <>
    <section className="association-hero">
      <div className="association-hero-mark"><Image src={assetPath("/logo-anmb-boucherie.png")} alt="Boucherie neuchâteloise" width={150} height={150} /><Image className="association-hero-signature" src={assetPath("/logo-anmb-signature.png")} alt="Ma chair et tendre" width={230} height={28} /></div>
      <div><p className="eyebrow light">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></div>
    </section>
    <Facts items={page.facts} />
  </>;
}

function AssociationPage({ lang, pageKey }: { lang: Lang; pageKey: "association" | "members" | "committee" | "partners" }) {
  const page = pages[lang][pageKey];
  return <>
    <Header lang={lang} current={pageKey} />
    <AssociationSubnav lang={lang} current={pageKey} />
    <main id="contenu">
      <AssociationHero lang={lang} pageKey={pageKey} />
      {pageKey === "association" && <>
        <section className="detail-content section-pad association-overview">{page.sections.map((section, index) => <article className="detail-section" key={section.title}><div className="section-number">{String(index + 1).padStart(2, "0")}</div><div><p className="eyebrow">{section.kicker}</p><h2>{section.title}</h2><p>{section.text}</p></div></article>)}</section>
        <section className="association-paths section-pad">
          <Link href={routes[lang].members}><BriefcaseBusiness size={28} /><span>{lang === "fr" ? "Réseau professionnel" : "Berufsnetzwerk"}</span><h2>{lang === "fr" ? "Découvrir l’adhésion ANMB" : "ANMB-Mitgliedschaft entdecken"}</h2><ArrowRight size={20} /></Link>
          <Link href={routes[lang].committee}><Users size={28} /><span>{lang === "fr" ? "Gouvernance" : "Führung"}</span><h2>{lang === "fr" ? "Découvrir le comité" : "Vorstand kennenlernen"}</h2><ArrowRight size={20} /></Link>
          <Link href={routes[lang].partners}><Network size={28} /><span>{lang === "fr" ? "Écosystème" : "Netzwerk"}</span><h2>{lang === "fr" ? "Partenaires et références" : "Partner und Referenzen"}</h2><ArrowRight size={20} /></Link>
        </section>
        <section className="association-contact"><div><p className="eyebrow light">{lang === "fr" ? "Secrétariat" : "Sekretariat"}</p><h2>ANMB · c/o CNCI</h2></div><address>Rue de la Serre 4<br />2001 Neuchâtel<br /><a href="tel:+41327272423">+41 32 727 24 23</a><br /><a href="mailto:emmanuella.daverio@cnci.ch">emmanuella.daverio@cnci.ch</a></address></section>
      </>}
      {pageKey === "members" && <section className="members-section section-pad">
        <div className="taxonomy-intro"><div><p className="eyebrow">{lang === "fr" ? "Trois statuts distincts" : "Drei getrennte Rollen"}</p><h2>{lang === "fr" ? "Membre, fabricant, point de vente : ce n’est pas la même chose." : "Mitglied, Hersteller, Verkaufsstelle: nicht dasselbe."}</h2></div><p>{lang === "fr" ? "Cette séparation évite la confusion actuelle et permet de tenir chaque information à jour depuis sa source correcte." : "Diese Trennung verhindert die heutige Verwechslung und hält jede Information aus der richtigen Quelle aktuell."}</p></div>
        <div className="taxonomy-grid">
          <article><BriefcaseBusiness size={26} /><span>01</span><h3>{lang === "fr" ? "Membre ANMB" : "ANMB-Mitglied"}</h3><p>{lang === "fr" ? "Entreprise ou personne admise dans l’association professionnelle selon ses statuts." : "Unternehmen oder Person, die gemäss Statuten in den Berufsverband aufgenommen wurde."}</p></article>
          <article><Factory size={26} /><span>02</span><h3>{lang === "fr" ? "Fabricant IGP" : "IGP-Hersteller"}</h3><p>{lang === "fr" ? "Entreprise certifiée pour fabriquer l’une des deux spécialités. Elle peut être membre de l’ANMB ou ne pas l’être : la certification et l’adhésion sont indépendantes." : "Für eine der beiden Spezialitäten zertifizierter Betrieb. Er kann ANMB-Mitglied oder Nichtmitglied sein: Zertifizierung und Mitgliedschaft sind unabhängig."}</p><Link href={routes[lang].locator}>{lang === "fr" ? "Voir les fabricants certifiés" : "Zertifizierte Hersteller ansehen"}<ArrowRight size={16} /></Link></article>
          <article><Store size={26} /><span>03</span><h3>{lang === "fr" ? "Point de vente" : "Verkaufsstelle"}</h3><p>{lang === "fr" ? "Magasin, succursale ou revendeur où le produit est proposé au public; ce n’est pas nécessairement un lieu de fabrication." : "Geschäft, Filiale oder Händler mit Produktverkauf; nicht zwingend ein Herstellungsort."}</p></article>
        </div>
        <section className="membership-panel">
          <div><p className="eyebrow light">{lang === "fr" ? "Adhérer à l’ANMB" : "Der ANMB beitreten"}</p><h2>{lang === "fr" ? "Représenter le métier, préparer la relève, partager un réseau." : "Den Beruf vertreten, Nachwuchs fördern, das Netzwerk stärken."}</h2><p>{lang === "fr" ? "L’adhésion concerne la vie de la branche professionnelle. Elle ne donne pas automatiquement le droit d’utiliser les dénominations IGP, qui relève d’une certification séparée." : "Die Mitgliedschaft betrifft den Berufsverband. Sie berechtigt nicht automatisch zur Verwendung der IGP-Bezeichnungen; dafür gilt ein eigenes Zertifizierungsverfahren."}</p></div>
          <div className="membership-benefits"><span><Check size={17} />{lang === "fr" ? "Représentation professionnelle" : "Berufliche Interessenvertretung"}</span><span><Check size={17} />{lang === "fr" ? "Formation et apprentissage" : "Ausbildung und Nachwuchs"}</span><span><Check size={17} />{lang === "fr" ? "Information et réseau de branche" : "Information und Branchennetzwerk"}</span><a className="button" href="mailto:emmanuella.daverio@cnci.ch">{lang === "fr" ? "Demander les conditions d’adhésion" : "Aufnahmebedingungen anfragen"}<ArrowRight size={17} /></a></div>
        </section>
      </section>}
      {pageKey === "committee" && <section className="committee-section section-pad">
        <div className="committee-grid">{committee.map((member, index) => <article className={index === 0 ? "committee-card president" : "committee-card"} key={member.name}><span className="committee-index">{String(index + 1).padStart(2, "0")}</span><div className="committee-avatar" aria-hidden="true">{member.name.split(" ").map(part => part[0]).join("")}</div><p>{member.role[lang]}</p><h2>{member.name}</h2><span>{member.company}</span></article>)}</div>
        <section className="igp-governance"><div className="igp-governance-heading"><p className="eyebrow">{lang === "fr" ? "Responsabilités des deux IGP" : "Verantwortung für die zwei IGP"}</p><h2>{lang === "fr" ? "Le groupement, la coordination et la certification ont chacun leur rôle." : "Trägerschaft, Koordination und Zertifizierung haben je eine eigene Aufgabe."}</h2><p>{lang === "fr" ? "L’ANMB porte les deux dénominations. Leur coordination est assurée au sein du groupement, tandis que l’OIC demeure l’organisme indépendant de certification." : "Die ANMB trägt die beiden Bezeichnungen. Die Koordination erfolgt innerhalb der Trägerschaft; die OIC bleibt die unabhängige Zertifizierungsstelle."}</p></div><div className="responsibility-grid">
          <article><Users size={25} /><p>{lang === "fr" ? "Groupement et commission" : "Trägerschaft und Kommission"}</p><h3>ANMB</h3><span>{lang === "fr" ? "Contact officiel des deux IGP; sa commission de contrôle participe aux examens sensoriels." : "Offizielle Kontaktorganisation; ihre Kontrollkommission wirkt an den sensorischen Prüfungen mit."}</span></article>
          <article className="responsibility-person"><BadgeCheck size={25} /><p>{lang === "fr" ? "Coordination des deux IGP" : "Koordination der beiden IGP"}</p><h3>Arthur Montandon</h3><span>{lang === "fr" ? "Coordination du suivi et de la valorisation du Saucisson neuchâtelois IGP et de la Saucisse neuchâteloise IGP." : "Koordination der Betreuung und Förderung von Neuenburger Saucisson IGP und Neuenburger Saucisse IGP."}</span></article>
          <article><ShieldCheck size={25} /><p>{lang === "fr" ? "Certification indépendante" : "Unabhängige Zertifizierung"}</p><h3>OIC</h3><span>{lang === "fr" ? "Organisme de certification désigné par le cahier des charges fédéral." : "Im eidgenössischen Pflichtenheft bezeichnete Zertifizierungsstelle."}</span></article>
        </div><div className="governance-sources"><a href="https://www.aop-igp.ch/fr/saucisson-neuchatelois-igp" target="_blank" rel="noreferrer">AOP-IGP Suisse<ExternalLink size={14} /></a><a href="https://www.aop-igp.ch/fileadmin/Dokumente/kampagne2025/Pflichtenhefte/SNE/Pflichtenheft%20FR%20Saucisson%20neuchatelois%20IGP.pdf" target="_blank" rel="noreferrer">{lang === "fr" ? "Cahier des charges" : "Pflichtenheft"}<ExternalLink size={14} /></a></div></section>
      </section>}
      {pageKey === "partners" && <section className="partners-section section-pad">
        <aside className="network-note"><ShieldCheck size={24} /><p>{lang === "fr" ? "La présence d’un organisme ci-dessous indique son rôle dans l’écosystème ou comme source de référence. Elle ne signifie pas automatiquement l’existence d’un partenariat financier ou contractuel avec l’ANMB." : "Die Nennung einer Organisation bezeichnet ihre Rolle im Ökosystem oder als Referenzquelle. Sie bedeutet nicht automatisch eine finanzielle oder vertragliche Partnerschaft mit der ANMB."}</p></aside>
        {partnerGroups.map(group => <section className="partner-group" key={group.title.fr}><div className="partner-group-heading"><p className="eyebrow">{lang === "fr" ? "Réseau" : "Netzwerk"}</p><h2>{group.title[lang]}</h2><p>{group.note[lang]}</p></div><div className="partner-grid">{group.partners.map(partner => <a className="partner-card" href={partner.href} target="_blank" rel="noreferrer" key={partner.name}><span className={"darkLogo" in partner && partner.darkLogo ? "partner-mark official dark" : "partner-mark official"}><Image src={assetPath(partner.logo)} alt="" width={92} height={62} /></span><span className="partner-copy"><strong>{partner.name}</strong><small>{partner.text[lang]}</small></span><ExternalLink size={18} /></a>)}</div></section>)}
      </section>}
    </main>
    <Footer lang={lang} />
  </>;
}

function PrivacyPage({ lang }: { lang: Lang }) {
  const page = pages[lang].privacy;
  const copy = lang === "fr" ? {
    noBannerTitle: "Pourquoi aucun bandeau cookies n’apparaît ?",
    noBannerText: "Dans sa configuration actuelle, le site ne dépose aucun cookie publicitaire, ne mesure pas les visiteurs avec un outil d’analyse et n’intègre ni carte Google, ni vidéo, ni contenu social. Aucun consentement n’est donc demandé inutilement.",
    dataTitle: "Données techniques et hébergement",
    dataText: "Le site est publié avec GitHub Pages. Comme tout hébergeur, GitHub peut traiter les données techniques nécessaires à la transmission et à la sécurité du service, notamment l’adresse IP et les journaux de connexion, selon sa propre politique de confidentialité.",
    linksTitle: "Liens vers des services externes",
    linksText: "Les fiches Google, sites de fabricants et sources documentaires ne sont chargés qu’après un clic. À partir de ce moment, les règles de confidentialité du service externe s’appliquent.",
    contactTitle: "Responsable et contact",
    contactText: "Association neuchâteloise des maîtres-bouchers (ANMB), c/o CNCI, Rue de la Serre 4, 2001 Neuchâtel.",
    github: "Politique de confidentialité de GitHub",
    legal: "Loi fédérale sur les télécommunications · art. 45c",
  } : {
    noBannerTitle: "Warum erscheint kein Cookie-Banner?",
    noBannerText: "In der aktuellen Konfiguration setzt die Website keine Werbe-Cookies ein, verwendet kein Besucheranalyse-Tool und bindet weder Google Maps noch Videos oder soziale Inhalte ein. Daher wird keine unnötige Einwilligung verlangt.",
    dataTitle: "Technische Daten und Hosting",
    dataText: "Die Website wird mit GitHub Pages veröffentlicht. Wie jeder Hosting-Anbieter kann GitHub die für Übertragung und Sicherheit erforderlichen technischen Daten verarbeiten, insbesondere IP-Adressen und Verbindungsprotokolle, gemäss der eigenen Datenschutzerklärung.",
    linksTitle: "Links zu externen Diensten",
    linksText: "Google-Einträge, Hersteller-Websites und Dokumentationsquellen werden erst nach einem Klick geladen. Ab diesem Zeitpunkt gelten die Datenschutzbestimmungen des externen Dienstes.",
    contactTitle: "Verantwortliche Stelle und Kontakt",
    contactText: "Association neuchâteloise des maîtres-bouchers (ANMB), c/o CNCI, Rue de la Serre 4, 2001 Neuchâtel.",
    github: "Datenschutzerklärung von GitHub",
    legal: "Fernmeldegesetz · Art. 45c",
  };

  return <><Header lang={lang} current="privacy" /><main id="contenu">
    <section className="legal-hero"><p className="eyebrow light">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></section>
    <Facts items={page.facts} />
    <section className="legal-content section-pad">
      <article><ShieldCheck size={28} /><div><h2>{copy.noBannerTitle}</h2><p>{copy.noBannerText}</p></div></article>
      <article><Network size={28} /><div><h2>{copy.dataTitle}</h2><p>{copy.dataText}</p><a href="https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">{copy.github}<ExternalLink size={15} /></a></div></article>
      <article><ExternalLink size={28} /><div><h2>{copy.linksTitle}</h2><p>{copy.linksText}</p></div></article>
      <article><BriefcaseBusiness size={28} /><div><h2>{copy.contactTitle}</h2><p>{copy.contactText}</p><a href="mailto:emmanuella.daverio@cnci.ch">emmanuella.daverio@cnci.ch</a></div></article>
      <p className="legal-reference"><a href="https://www.fedlex.admin.ch/eli/cc/1997/2187_2187_2187/fr" target="_blank" rel="noreferrer">{copy.legal}<ExternalLink size={14} /></a></p>
    </section>
  </main><Footer lang={lang} /></>;
}

export function DetailPage({ lang, pageKey }: { lang: Lang; pageKey: PageKey }) {
  if (pageKey === "locator") return <><Header lang={lang} current={pageKey} /><main id="contenu"><LocatorPage lang={lang} /></main><Footer lang={lang} /></>;
  if (pageKey === "recipes") return <><Header lang={lang} current={pageKey} /><main id="contenu"><RecipesPageContent lang={lang} /></main><Footer lang={lang} /></>;
  if (pageKey === "privacy") return <PrivacyPage lang={lang} />;
  if (pageKey === "association" || pageKey === "members" || pageKey === "committee" || pageKey === "partners") return <AssociationPage lang={lang} pageKey={pageKey} />;
  const page = pages[lang][pageKey];
  const visual = detailVisuals[pageKey];
  return <><Header lang={lang} current={pageKey} /><main id="contenu"><section className="detail-hero"><div><p className="eyebrow light">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></div><figure className="detail-visual"><Image src={assetPath(visual.src)} alt={visual.alt[lang]} fill sizes="(max-width: 760px) 100vw, 420px" style={{ objectPosition: visual.position }} /><figcaption>{visual.src === "/torree-hero.webp" ? <a href={torreePhotoUrl} target="_blank" rel="noreferrer">{lang === "fr" ? "Photo : Rasmus / Unsplash" : "Foto: Rasmus / Unsplash"}</a> : (lang === "fr" ? "Photo : Association suisse des AOP-IGP" : "Foto: Schweizerische Vereinigung der AOP-IGP")}</figcaption></figure></section><Facts items={page.facts} /><section className="detail-content section-pad">{page.sections.map((section, index) => <article className="detail-section" key={section.title}><div className="section-number">{String(index + 1).padStart(2, "0")}</div><div><p className="eyebrow">{section.kicker}</p><h2>{section.title}</h2><p>{section.text}</p>{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><Check size={18} />{bullet}</li>)}</ul>}</div></article>)}{page.note && <aside className="editorial-note"><Clock3 size={23} /><p>{page.note}</p></aside>}</section>{pageKey === "product" && <CertificationProof lang={lang} />}<section className="next-step"><div><p className="eyebrow light">{lang === "fr" ? "À vous de jouer" : "Jetzt sind Sie dran"}</p><h2>{lang === "fr" ? "Du savoir au plaisir, il n’y a qu’un pas." : "Vom Wissen zum Genuss ist es nur ein Schritt."}</h2></div><ButtonLink href={routes[lang].locator}>{ui[lang].find}</ButtonLink></section></main><Footer lang={lang} /></>;
}

export function titleFor(lang: Lang, key: "home" | PageKey) {
  if (key === "home") return lang === "fr" ? "Saucisson neuchâtelois IGP & Saucisse neuchâteloise IGP" : "Neuenburger Saucisson IGP & Saucisse IGP";
  return `${pages[lang][key].title} · ${lang === "fr" ? "Saucisson neuchâtelois IGP & Saucisse neuchâteloise IGP" : "Neuenburger Saucisson IGP & Neuenburger Saucisse IGP"}`;
}
