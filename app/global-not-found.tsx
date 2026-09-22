import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page introuvable · Seite nicht gefunden",
  description:
    "La page demandée n’existe pas. Die gesuchte Seite ist nicht verfügbar.",
};

export default function GlobalNotFound() {
  return (
    <html lang="fr-CH">
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu · Zum Inhalt
        </a>
        <main id="contenu" className="not-found-page">
          <p className="eyebrow light">404 · Page introuvable / Seite nicht gefunden</p>
          <h1>
            Cette page n’existe pas.
            <span>Diese Seite existiert nicht.</span>
          </h1>
          <p>
            Retrouvez les deux spécialités neuchâteloises IGP depuis la page
            d’accueil, en français ou en allemand.
          </p>
          <div className="button-row">
            <Link className="button" href="/">
              Accueil
            </Link>
            <Link className="button button-secondary" href="/de">
              Startseite
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
