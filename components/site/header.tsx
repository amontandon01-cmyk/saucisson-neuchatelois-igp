import Link from "next/link";
import {
  alternateRoute,
  associationKeys,
  routes,
  ui,
  type Lang,
  type PageKey,
  type RouteKey,
} from "@/content/site";
import { Brand } from "./brand";
import { MobileMenu } from "./mobile-menu";

export function Header({
  lang,
  current,
  alternateHref,
}: {
  lang: Lang;
  current: RouteKey;
  alternateHref?: string;
}) {
  const copy = ui[lang];
  const associationActive = current !== "home" && associationKeys.includes(current as PageKey);
  const mobileLinks = [
    ...copy.nav.map(([key, label]) => ({ href: routes[lang][key], label })),
    { href: routes[lang].saucisson, label: "Saucisson neuchâtelois IGP" },
    { href: routes[lang].saucisse, label: "Saucisse neuchâteloise IGP" },
    { href: routes[lang].pro, label: copy.pro },
    { href: routes[lang].news, label: lang === "fr" ? "Actualités" : "Aktuell" },
    {
      href: routes[lang].association,
      label: lang === "fr" ? "ANMB · Groupement officiel" : "ANMB · Offizielle Trägerschaft",
    },
  ];

  return (
    <>
      <a className="skip-link" href="#contenu">
        {lang === "fr" ? "Aller au contenu" : "Zum Inhalt"}
      </a>
      <div className="origin-strip">
        <span>{copy.claim}</span>
        <span>{lang === "fr" ? "Deux spécialités protégées" : "Zwei geschützte Spezialitäten"}</span>
      </div>
      <header className="site-header">
        <Link href={routes[lang].home} className="brand-link">
          <Brand lang={lang} />
        </Link>
        <nav className="desktop-nav" aria-label={lang === "fr" ? "Navigation principale" : "Hauptnavigation"}>
          {copy.nav.map(([key, label]) => (
            <Link
              className={current === key ? "active" : ""}
              aria-current={current === key ? "page" : undefined}
              href={routes[lang][key]}
              key={key}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            className="association-link"
            aria-current={associationActive ? "page" : undefined}
            href={routes[lang].association}
          >
            ANMB
          </Link>
          <Link className="pro-link" href={routes[lang].pro}>
            {copy.pro}
          </Link>
          <Link
            className="lang-link"
            href={alternateHref ?? alternateRoute(lang, current)}
            hrefLang={lang === "fr" ? "de" : "fr"}
            aria-label={copy.language}
          >
            {copy.short}
          </Link>
        </div>
        <MobileMenu
          lang={lang}
          label={copy.menu}
          closeLabel={copy.closeMenu}
          links={mobileLinks}
        />
      </header>
    </>
  );
}
