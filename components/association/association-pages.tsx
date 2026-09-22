import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ExternalLink,
  Factory,
  Network,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";
import { routes, type Lang } from "@/content/site";
import { association, committee, committeeSource } from "@/data/association";
import { referenceGroups } from "@/data/partners";
import { sources } from "@/data/sources";
import { JsonLd } from "@/lib/seo";
import { absoluteUrl, assetPath } from "@/lib/site-config";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Breadcrumbs, Facts, SourceLink } from "@/components/site/shared";

type AssociationPageKey = "association" | "members" | "committee" | "partners";

const associationLabels: Record<Lang, Record<AssociationPageKey, string>> = {
  fr: { association: "L’association", members: "Adhésion", committee: "Comité", partners: "Réseau & références" },
  de: { association: "Der Verband", members: "Mitgliedschaft", committee: "Vorstand", partners: "Netzwerk & Referenzen" },
};

function AssociationSubnav({ lang, current }: { lang: Lang; current: AssociationPageKey }) {
  return (
    <nav className="association-subnav" aria-label={lang === "fr" ? "Navigation de l’ANMB" : "Navigation der ANMB"}>
      <Link className="association-subnav-brand" href={routes[lang].association}>
        <Image src={assetPath("/logo-anmb-boucherie.png")} alt="" width={44} height={44} />
        <span><strong>ANMB</strong><small>{lang === "fr" ? "Groupement officiel des deux IGP" : "Offizielle Trägerschaft der zwei IGP"}</small></span>
      </Link>
      <div>
        {(Object.keys(associationLabels[lang]) as AssociationPageKey[]).map((key) => (
          <Link className={current === key ? "active" : undefined} aria-current={current === key ? "page" : undefined} href={routes[lang][key]} key={key}>
            {associationLabels[lang][key]}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function AssociationHero({ lang, pageKey }: { lang: Lang; pageKey: AssociationPageKey }) {
  const hero = heroCopy[lang][pageKey];
  return (
    <>
      <Breadcrumbs
        label={lang === "fr" ? "Fil d’Ariane" : "Brotkrümelnavigation"}
        items={[
          { name: lang === "fr" ? "Accueil" : "Startseite", path: routes[lang].home },
          ...(pageKey === "association" ? [] : [{ name: "ANMB", path: routes[lang].association }]),
          { name: hero.title, path: routes[lang][pageKey] },
        ]}
      />
      <section className="association-hero">
        <div className="association-hero-mark">
          <Image src={assetPath("/logo-anmb-boucherie.png")} alt="Boucherie neuchâteloise" width={150} height={150} />
          <Image className="association-hero-signature" src={assetPath("/logo-anmb-signature.png")} alt="Ma chair et tendre" width={230} height={28} />
        </div>
        <div><p className="eyebrow light">{hero.eyebrow}</p><h1>{hero.title}</h1><p>{hero.intro}</p></div>
      </section>
    </>
  );
}

export function AssociationPage({ lang, pageKey }: { lang: Lang; pageKey: AssociationPageKey }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl(routes[lang].association)}#organization`,
    name: association.name,
    alternateName: "ANMB",
    url: absoluteUrl(routes[lang].association),
    telephone: association.phone,
    email: association.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue de la Serre 4",
      postalCode: "2001",
      addressLocality: "Neuchâtel",
      addressCountry: "CH",
    },
  };

  return (
    <>
      <Header lang={lang} current={pageKey} />
      <AssociationSubnav lang={lang} current={pageKey} />
      <main id="contenu">
        <JsonLd data={organizationJsonLd} />
        <AssociationHero lang={lang} pageKey={pageKey} />
        {pageKey === "association" && <AssociationOverview lang={lang} />}
        {pageKey === "members" && <MembershipPage lang={lang} />}
        {pageKey === "committee" && <CommitteePage lang={lang} />}
        {pageKey === "partners" && <PartnersPage lang={lang} />}
      </main>
      <Footer lang={lang} />
    </>
  );
}

function AssociationOverview({ lang }: { lang: Lang }) {
  const sections = lang === "fr"
    ? [
        ["Statut", "Le groupement reconnu par le registre fédéral", "L’Office fédéral de l’agriculture indique l’ANMB comme groupement demandeur et responsable des deux dénominations protégées."],
        ["Rôle", "Porter les intérêts collectifs de la filière", "Le groupement défend et fait évoluer les intérêts collectifs liés aux deux IGP. La certification des entreprises reste confiée à un organisme indépendant."],
        ["Distinction", "Groupement et certificateur : deux fonctions", "L’ANMB porte les dénominations. L’OIC inspecte et certifie les fabricants selon le cahier des charges."],
      ]
    : [
        ["Status", "Die im Bundesregister anerkannte Trägerschaft", "Das Bundesamt für Landwirtschaft nennt die ANMB als antragstellende und verantwortliche Trägerschaft der zwei geschützten Bezeichnungen."],
        ["Aufgabe", "Die gemeinsamen Brancheninteressen vertreten", "Die Trägerschaft wahrt und entwickelt die gemeinsamen Interessen rund um die zwei IGP. Die Zertifizierung der Betriebe bleibt einer unabhängigen Stelle übertragen."],
        ["Abgrenzung", "Trägerschaft und Zertifizierer: zwei Funktionen", "Die ANMB trägt die Bezeichnungen. Die OIC kontrolliert und zertifiziert Hersteller gemäss Pflichtenheft."],
      ];

  return (
    <>
      <Facts items={lang === "fr" ? [
        { value: "2", label: "dénominations protégées" },
        { value: "ANMB", label: "groupement officiel" },
        { value: "OIC", label: "certification indépendante" },
        { value: "2003", label: "inscription IGP" },
      ] : [
        { value: "2", label: "geschützte Bezeichnungen" },
        { value: "ANMB", label: "offizielle Trägerschaft" },
        { value: "OIC", label: "unabhängige Zertifizierung" },
        { value: "2003", label: "IGP-Eintragung" },
      ]} />
      <section className="detail-content section-pad association-overview">
        {sections.map(([kicker, title, text], index) => (
          <article className="detail-section" key={title}>
            <div className="section-number">{String(index + 1).padStart(2, "0")}</div>
            <div><p className="eyebrow">{kicker}</p><h2>{title}</h2><p>{text}</p></div>
          </article>
        ))}
        <div className="source-list"><SourceLink href={sources.federalRegister}>OFAG · {lang === "fr" ? "registre fédéral" : "Bundesregister"}</SourceLink><SourceLink href={sources.specification}>{lang === "fr" ? "Cahier des charges" : "Pflichtenheft"}</SourceLink></div>
      </section>
      <section className="association-paths section-pad">
        <Link href={routes[lang].members}><BriefcaseBusiness aria-hidden="true" size={28} /><span>{lang === "fr" ? "Réseau professionnel" : "Berufsnetzwerk"}</span><h2>{lang === "fr" ? "Comprendre l’adhésion" : "Mitgliedschaft verstehen"}</h2><ArrowRight aria-hidden="true" size={20} /></Link>
        <Link href={routes[lang].committee}><Users aria-hidden="true" size={28} /><span>{lang === "fr" ? "Gouvernance" : "Führung"}</span><h2>{lang === "fr" ? "Voir le comité vérifié" : "Geprüften Vorstand ansehen"}</h2><ArrowRight aria-hidden="true" size={20} /></Link>
        <Link href={routes[lang].partners}><Network aria-hidden="true" size={28} /><span>{lang === "fr" ? "Écosystème" : "Netzwerk"}</span><h2>{lang === "fr" ? "Sources et organismes" : "Quellen und Organisationen"}</h2><ArrowRight aria-hidden="true" size={20} /></Link>
      </section>
      <section className="association-contact">
        <div><p className="eyebrow light">{lang === "fr" ? "Secrétariat" : "Sekretariat"}</p><h2>ANMB · c/o CNCI</h2></div>
        <address>{association.address.map((line) => <span key={line}>{line}<br /></span>)}<a href={`tel:${association.phone.replaceAll(" ", "")}`}>{association.phone}</a><br /><a href={`mailto:${association.email}`}>{association.email}</a></address>
      </section>
    </>
  );
}

function MembershipPage({ lang }: { lang: Lang }) {
  return (
    <section className="members-section section-pad">
      <div className="taxonomy-intro">
        <div><p className="eyebrow">{lang === "fr" ? "Trois statuts distincts" : "Drei getrennte Rollen"}</p><h2>{lang === "fr" ? "Membre, fabricant, point de vente : ce n’est pas la même chose." : "Mitglied, Hersteller, Verkaufsstelle: nicht dasselbe."}</h2></div>
        <p>{lang === "fr" ? "Cette distinction protège la fiabilité de l’annuaire et évite d’attribuer une certification à un simple lieu de vente." : "Diese Unterscheidung schützt die Verlässlichkeit des Verzeichnisses und verhindert, dass einer Verkaufsstelle eine Zertifizierung zugeschrieben wird."}</p>
      </div>
      <div className="taxonomy-grid">
        <article><BriefcaseBusiness aria-hidden="true" size={26} /><span>01</span><h3>{lang === "fr" ? "Membre ANMB" : "ANMB-Mitglied"}</h3><p>{lang === "fr" ? "Statut professionnel au sein de l’association, selon les conditions qu’elle communique." : "Berufsverbandsstatus gemäss den von der ANMB mitgeteilten Bedingungen."}</p></article>
        <article><Factory aria-hidden="true" size={26} /><span>02</span><h3>{lang === "fr" ? "Fabricant IGP" : "IGP-Hersteller"}</h3><p>{lang === "fr" ? "Entreprise disposant d’un certificat OIC publié pour les dénominations protégées." : "Betrieb mit einem veröffentlichten OIC-Zertifikat für die geschützten Bezeichnungen."}</p><Link href={routes[lang].locator}>{lang === "fr" ? "Voir les fabricants" : "Hersteller ansehen"}<ArrowRight aria-hidden="true" size={16} /></Link></article>
        <article><Store aria-hidden="true" size={26} /><span>03</span><h3>{lang === "fr" ? "Point de vente" : "Verkaufsstelle"}</h3><p>{lang === "fr" ? "Magasin, succursale ou revendeur. Il ne s’agit pas nécessairement d’un lieu de fabrication certifié." : "Geschäft, Filiale oder Wiederverkäufer; nicht zwingend ein zertifizierter Herstellungsort."}</p></article>
      </div>
      <section className="membership-panel">
        <div><p className="eyebrow light">{lang === "fr" ? "Adhérer à l’ANMB" : "Der ANMB beitreten"}</p><h2>{lang === "fr" ? "Demander les conditions au secrétariat." : "Bedingungen beim Sekretariat anfragen."}</h2><p>{lang === "fr" ? "Le site ne publie pas de conditions d’adhésion non confirmées. Le secrétariat répond avec la procédure à jour." : "Die Website veröffentlicht keine unbestätigten Beitrittsbedingungen. Das Sekretariat informiert über das aktuelle Verfahren."}</p></div>
        <div className="membership-benefits"><span><Check aria-hidden="true" size={17} />{lang === "fr" ? "Réponse officielle de l’association" : "Offizielle Antwort des Verbands"}</span><span><Check aria-hidden="true" size={17} />{lang === "fr" ? "Conditions à jour" : "Aktuelle Bedingungen"}</span><a className="button" href={`mailto:${association.email}`}>{lang === "fr" ? "Contacter le secrétariat" : "Sekretariat kontaktieren"}<ArrowRight aria-hidden="true" size={17} /></a></div>
      </section>
    </section>
  );
}

function CommitteePage({ lang }: { lang: Lang }) {
  return (
    <section className="committee-section section-pad">
      <div className="network-note"><ShieldCheck aria-hidden="true" size={24} /><p>{lang === "fr" ? `Composition reprise de la page officielle de l’ANMB et vérifiée le ${formatDate(committeeSource.verifiedAt)}. Aucun rôle non publié n’est ajouté.` : `Zusammensetzung von der offiziellen ANMB-Seite, geprüft am ${formatDate(committeeSource.verifiedAt)}. Nicht veröffentlichte Rollen werden nicht ergänzt.`}</p></div>
      <div className="committee-grid">
        {committee.map((member, index) => (
          <article className={index === 0 ? "committee-card president" : "committee-card"} key={member.name}>
            <span className="committee-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="committee-avatar" aria-hidden="true">{member.name.split(" ").map((part) => part[0]).join("")}</div>
            <p>{member.role[lang]}</p><h2>{member.name}</h2>{member.company && <span>{member.company}</span>}
          </article>
        ))}
      </div>
      <section className="igp-governance">
        <div className="igp-governance-heading"><div><p className="eyebrow">{lang === "fr" ? "Responsabilités" : "Verantwortlichkeiten"}</p><h2>{lang === "fr" ? "Deux organismes, des rôles documentés." : "Zwei Organisationen, dokumentierte Rollen."}</h2></div><p>{lang === "fr" ? "Le registre fédéral identifie le groupement et le cahier des charges désigne l’organisme de certification." : "Das Bundesregister nennt die Trägerschaft, das Pflichtenheft die Zertifizierungsstelle."}</p></div>
        <div className="responsibility-grid">
          <article><Users aria-hidden="true" size={25} /><p>{lang === "fr" ? "Groupement officiel" : "Offizielle Trägerschaft"}</p><h3>ANMB</h3><span>{association.igpRole[lang]}</span></article>
          <article><ShieldCheck aria-hidden="true" size={25} /><p>{lang === "fr" ? "Certification indépendante" : "Unabhängige Zertifizierung"}</p><h3>OIC</h3><span>{lang === "fr" ? "Organisme désigné par le cahier des charges pour certifier la conformité." : "Im Pflichtenheft bezeichnete Stelle zur Zertifizierung der Konformität."}</span></article>
          <article><BadgeCheck aria-hidden="true" size={25} /><p>{lang === "fr" ? "Validation éditoriale" : "Redaktionelle Freigabe"}</p><h3>{lang === "fr" ? "À confirmer" : "Zu bestätigen"}</h3><span>{lang === "fr" ? "Les fonctions individuelles liées à la coordination ne sont publiées qu’après confirmation de l’ANMB." : "Individuelle Koordinationsfunktionen werden erst nach Bestätigung durch die ANMB veröffentlicht."}</span></article>
        </div>
        <div className="governance-sources"><SourceLink href={committeeSource.url}>{lang === "fr" ? "Comité officiel ANMB" : "Offizieller ANMB-Vorstand"}</SourceLink><SourceLink href={sources.federalRegister}>OFAG</SourceLink><SourceLink href={sources.specification}>{lang === "fr" ? "Cahier des charges" : "Pflichtenheft"}</SourceLink></div>
      </section>
    </section>
  );
}

function PartnersPage({ lang }: { lang: Lang }) {
  return (
    <section className="partners-section section-pad">
      <aside className="network-note"><ShieldCheck aria-hidden="true" size={24} /><p>{lang === "fr" ? "La présence d’un organisme indique une fonction dans l’écosystème ou une source de référence. Elle ne prouve pas un partenariat financier ou contractuel avec l’ANMB." : "Die Nennung bezeichnet eine Funktion im Ökosystem oder eine Referenzquelle. Sie belegt keine finanzielle oder vertragliche Partnerschaft mit der ANMB."}</p></aside>
      {referenceGroups.map((group) => (
        <section className="partner-group" key={group.title.fr}>
          <div className="partner-group-heading"><p className="eyebrow">{lang === "fr" ? "Réseau" : "Netzwerk"}</p><h2>{group.title[lang]}</h2><p>{group.note[lang]}</p></div>
          <div className="partner-grid">
            {group.organisations.map((organisation) => (
              <a className="partner-card" href={organisation.href} target="_blank" rel="noreferrer" key={organisation.name}>
                <span className={organisation.darkLogo ? "partner-mark official dark" : "partner-mark official"}><Image src={assetPath(organisation.logo)} alt="" width={92} height={62} /></span>
                <span className="partner-copy"><strong>{organisation.name}</strong><small>{organisation.text[lang]}</small></span>
                <ExternalLink aria-hidden="true" size={18} />
              </a>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

const heroCopy: Record<Lang, Record<AssociationPageKey, { eyebrow: string; title: string; intro: string }>> = {
  fr: {
    association: { eyebrow: "Groupement officiel", title: "L’ANMB et les deux IGP.", intro: "L’Association neuchâteloise des maîtres-bouchers est le groupement inscrit au registre fédéral pour le Saucisson neuchâtelois IGP et la Saucisse neuchâteloise IGP." },
    members: { eyebrow: "Association professionnelle", title: "Adhésion à l’ANMB.", intro: "Une adhésion professionnelle est distincte de la certification IGP et du statut de point de vente." },
    committee: { eyebrow: "Gouvernance", title: "Le comité de l’ANMB.", intro: "Sept membres publiés par l’association, sans fonction extrapolée ni biographie inventée." },
    partners: { eyebrow: "Écosystème", title: "Réseau et organismes de référence.", intro: "Protection, certification, patrimoine, branche et tourisme : chaque organisme est présenté selon son rôle documenté." },
  },
  de: {
    association: { eyebrow: "Offizielle Trägerschaft", title: "Die ANMB und die zwei IGP.", intro: "Die Association neuchâteloise des maîtres-bouchers ist die im Bundesregister eingetragene Trägerschaft für Saucisson neuchâtelois IGP und Saucisse neuchâteloise IGP." },
    members: { eyebrow: "Berufsverband", title: "Mitgliedschaft bei der ANMB.", intro: "Eine Berufsverbandsmitgliedschaft ist von IGP-Zertifizierung und Verkaufsstellenstatus getrennt." },
    committee: { eyebrow: "Führung", title: "Der Vorstand der ANMB.", intro: "Sieben vom Verband veröffentlichte Mitglieder — ohne abgeleitete Funktion oder erfundene Biografie." },
    partners: { eyebrow: "Ökosystem", title: "Netzwerk und Referenzorganisationen.", intro: "Schutz, Zertifizierung, Kulturerbe, Branche und Tourismus: Jede Organisation erscheint mit ihrer dokumentierten Rolle." },
  },
};

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

export type { AssociationPageKey };
