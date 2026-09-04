import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

test("exports the complete French and German structure", async () => {
  await Promise.all([
    access("out/index.html"), access("out/de/index.html"),
    access("out/le-produit/index.html"), access("out/de/das-produkt/index.html"),
    access("out/recettes/index.html"), access("out/de/rezepte/index.html"),
    access("out/ou-acheter/index.html"), access("out/de/verkaufsstellen/index.html"),
    access("out/anmb/index.html"), access("out/anmb/membres/index.html"),
    access("out/anmb/comite/index.html"), access("out/anmb/reseau/index.html"),
    access("out/protection-des-donnees/index.html"), access("out/de/datenschutz/index.html"),
  ]);
});

test("uses the configured GitHub Pages base path", async () => {
  const html = await readFile("out/index.html", "utf8");
  if (basePath) {
    const escaped = basePath.replaceAll("/", "\\/");
    assert.match(html, new RegExp(`${escaped}\\/_next\\/`));
    assert.match(html, new RegExp(`${escaped}\\/torree-hero\\.webp`));
  }
});

test("publishes certified manufacturers without stale contact data or ANMB badges", async () => {
  const html = await readFile("out/ou-acheter/index.html", "utf8");
  assert.match(html, /Neuf fabricants certifiés/);
  assert.match(html, /Boucherie Graf/);
  assert.match(html, /Boucherie Schneiter/);
  assert.match(html, /Christen Delicatessen/);
  assert.match(html, /Fabricant certifié IGP/);
  assert.match(html, /google\.com\/maps\/search/);
  assert.match(html, /"@type":"ItemList"/);
  assert.doesNotMatch(html, /Grande-Rue 13|\+41 32 934 30 10|GeoCoordinates|telephone/);
  assert.doesNotMatch(html, /Annuaire public ANMB|Publié dans l’annuaire ANMB|Non répertorié/);
  assert.doesNotMatch(html, /Leaflet|tile\.openstreetmap|directory-map/);
});

test("documents history, annual tasting and IGP scoring", async () => {
  const french = await readFile("out/le-produit/index.html", "utf8");
  const german = await readFile("out/de/das-produkt/index.html", "utf8");
  assert.match(french, /fin du XIXe siècle/);
  assert.match(french, /évaluation organoleptique annuelle/);
  assert.match(french, /Aspect extérieur/);
  assert.match(french, /Saveur &amp; odeur/);
  assert.match(french, /4<small>\/6/);
  assert.match(french, /Contrôles AOP-IGP/);
  assert.match(german, /jährlich sensorisch beurteilt/);
});

test("uses official marks and names both protected products", async () => {
  const home = await readFile("out/index.html", "utf8");
  const recipes = await readFile("out/recettes/index.html", "utf8");
  assert.match(home, /logo-igp-officiel\.png/);
  assert.match(home, /favicon\.png/);
  assert.match(home, /Saucisson neuchâtelois IGP &amp; Saucisse neuchâteloise IGP/);
  assert.match(recipes, /Saucisse neuchâteloise IGP/);
  assert.match(recipes, /logo-anmb-boucherie\.png/);
});

test("credits the real torrée atmosphere photograph", async () => {
  const html = await readFile("out/torree/index.html", "utf8");
  assert.match(html, /Rasmus \/ Unsplash/);
  assert.doesNotMatch(html, /Illustration originale/);
});

test("exports a distinct ANMB area without an unverified member directory", async () => {
  const committee = await readFile("out/anmb/comite/index.html", "utf8");
  const membership = await readFile("out/anmb/membres/index.html", "utf8");
  assert.match(committee, /Alexandre Léger/);
  assert.match(committee, /Pierre Montandon/);
  assert.match(committee, /Arthur Montandon/);
  assert.match(committee, /Coordination des deux IGP/);
  assert.match(membership, /Devenir membre de l’ANMB/);
  assert.match(membership, /Fabricant IGP/);
  assert.match(membership, /certification et l’adhésion sont indépendantes/);
  assert.doesNotMatch(membership, /Boucherie Au Gourmet|21 organisations|Membres-actifs|Publié comme membre actif/);
});

test("shows official clickable logos for reference organisations", async () => {
  const html = await readFile("out/anmb/reseau/index.html", "utf8");
  for (const logo of ["logo-sff.svg", "logo-ren.svg", "logo-cnci.png", "logo-oic.svg", "logo-ofag.svg", "logo-suisse-terroir.svg", "logo-patrimoine.svg", "logo-nvt.svg", "logo-proviande.svg", "logo-suisse-tourisme.svg", "logo-j3l.svg"]) {
    assert.match(html, new RegExp(logo.replace(".", "\\.")));
  }
  assert.match(html, /https:\/\/www\.aop-igp\.ch\/fr\/saucisson-neuchatelois-igp/);
  assert.match(html, /https:\/\/www\.myswitzerland\.com\/fr-ch\/destinations\/neuchatel\//);
  assert.match(html, /ne signifie pas automatiquement/);
});

test("exports a sourced recipe catalogue with real product photography", async () => {
  const html = await readFile("out/recettes/index.html", "utf8");
  assert.match(html, /Neuf façons de faire vivre les deux IGP/);
  assert.match(html, /La torrée et sa salade de pommes de terre/);
  assert.match(html, /Salade de cornettes/);
  assert.match(html, /Brioche au Saucisson/);
  assert.match(html, /Choucroute neuchâteloise/);
  assert.match(html, /Petcha, sourieb et poireaux/);
  assert.match(html, /Tarte au Gruyère AOP/);
  assert.match(html, /aop-saucisson-creux\.webp/);
  assert.match(html, /"numberOfItems":9/);
  assert.doesNotMatch(html, /"@type":"Recipe"/);
});

test("explains the current cookie-free configuration", async () => {
  const html = await readFile("out/protection-des-donnees/index.html", "utf8");
  assert.match(html, /aucun bandeau cookies/);
  assert.match(html, /aucun cookie publicitaire/);
  assert.match(html, /GitHub Pages/);
  assert.match(html, /services externes/);
  assert.match(html, /art\. 45c/);
});

test("removes obsolete map copy from the homepage", async () => {
  const html = await readFile("out/index.html", "utf8");
  assert.doesNotMatch(html, /abstract-map|map-card|Ouvrir la carte à jour/);
  assert.match(html, /Voir les fabricants/);
});
