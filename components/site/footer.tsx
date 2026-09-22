import Image from "next/image";
import Link from "next/link";
import { routes, ui, type Lang } from "@/content/site";
import { association } from "@/data/association";
import { sources } from "@/data/sources";
import { assetPath } from "@/lib/site-config";
import { Brand } from "./brand";

export function Footer({ lang }: { lang: Lang }) {
  const copy = ui[lang];
  const year = new Date().getUTCFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-identity">
          <Brand lang={lang} />
          <p>{lang === "fr" ? "Deux spécialités protégées, un canton à découvrir." : "Zwei geschützte Spezialitäten, ein Kanton zum Entdecken."}</p>
          <div className="anmb-lockup">
            <Image src={assetPath("/logo-anmb-boucherie.png")} alt="" width={76} height={76} />
            <div>
              <strong>ANMB</strong>
              <span>{association.igpRole[lang]}</span>
              <Image className="anmb-signature" src={assetPath("/logo-anmb-signature.png")} alt="Ma chair et tendre" width={188} height={21} />
            </div>
          </div>
        </div>
        <div>
          <h2>{lang === "fr" ? "Découvrir" : "Entdecken"}</h2>
          <Link href={routes[lang].overview}>{copy.nav[0][1]}</Link>
          <Link href={routes[lang].saucisson}>Saucisson neuchâtelois IGP</Link>
          <Link href={routes[lang].saucisse}>Saucisse neuchâteloise IGP</Link>
          <Link href={routes[lang].cooking}>{copy.nav[1][1]}</Link>
          <Link href={routes[lang].torree}>{copy.nav[3][1]}</Link>
          <Link href={routes[lang].locator}>{copy.nav[4][1]}</Link>
        </div>
        <div>
          <h2>{lang === "fr" ? "Filière" : "Branche"}</h2>
          <Link href={routes[lang].pro}>{copy.pro}</Link>
          <Link href={routes[lang].news}>{lang === "fr" ? "Actualités" : "Aktuell"}</Link>
          <Link href={routes[lang].association}>ANMB</Link>
          <Link href={routes[lang].committee}>{lang === "fr" ? "Comité ANMB" : "ANMB-Vorstand"}</Link>
          <Link href={routes[lang].partners}>{lang === "fr" ? "Réseau & références" : "Netzwerk & Referenzen"}</Link>
        </div>
        <div>
          <h2>{lang === "fr" ? "Sources officielles" : "Offizielle Quellen"}</h2>
          <a href={sources.federalRegister} target="_blank" rel="noreferrer">OFAG</a>
          <a href={lang === "fr" ? sources.aopProductFr : sources.aopProductDe} target="_blank" rel="noreferrer">AOP-IGP Suisse</a>
          <a href={sources.oicDirectory} target="_blank" rel="noreferrer">OIC</a>
          <a href={sources.heritage} target="_blank" rel="noreferrer">Patrimoine culinaire suisse</a>
          <Link href={routes[lang].privacy}>{lang === "fr" ? "Protection des données" : "Datenschutz"}</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} · Saucisson neuchâtelois IGP & Saucisse neuchâteloise IGP</span>
        <span>{lang === "fr" ? "ANMB · groupement officiel des deux IGP" : "ANMB · offizielle Trägerschaft der zwei IGP"}</span>
      </div>
    </footer>
  );
}
