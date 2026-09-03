import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

test("exports the main French and German pages", async () => {
  await Promise.all([
    access("out/index.html"),
    access("out/de/index.html"),
    access("out/le-produit/index.html"),
    access("out/de/das-produkt/index.html"),
    access("out/ou-acheter/index.html"),
  ]);
});

test("uses the configured GitHub Pages base path", async () => {
  const html = await readFile("out/index.html", "utf8");
  if (basePath) {
    assert.match(html, new RegExp(`${basePath.replaceAll("/", "\\/")}\\/_next\\/`));
    assert.match(html, new RegExp(`${basePath.replaceAll("/", "\\/")}\\/torree-hero\\.webp`));
  }
});

test("exports the complete producer directory and live map links", async () => {
  const html = await readFile("out/ou-acheter/index.html", "utf8");
  assert.match(html, /Neuf maisons productrices/);
  assert.match(html, /Boucherie Schneiter/);
  assert.match(html, /Christen Delicatessen/);
  assert.match(html, /google\.com\/maps\/search/);
  assert.match(html, /application\/ld\+json/);
});

test("exports official AOP-IGP photography", async () => {
  const html = await readFile("out/le-produit/index.html", "utf8");
  assert.match(html, /aop-saucisson-planche\.webp/);
});

test("uses transparent official marks and names both protected products", async () => {
  const home = await readFile("out/index.html", "utf8");
  const recipes = await readFile("out/recettes/index.html", "utf8");
  assert.match(home, /logo-igp-officiel\.png/);
  assert.match(home, /favicon\.png/);
  assert.match(home, /Saucisson neuchâtelois IGP &amp; Saucisse neuchâteloise IGP/);
  assert.match(recipes, /Saucisse neuchâteloise IGP/);
  assert.match(recipes, /2<\/strong><span>produits IGP/);
  assert.match(recipes, /logo-anmb-boucherie\.png/);
});

test("credits the real torrée atmosphere photograph", async () => {
  const html = await readFile("out/torree/index.html", "utf8");
  assert.match(html, /Rasmus \/ Unsplash/);
  assert.doesNotMatch(html, /Illustration originale/);
});

test("exports a distinct ANMB area and committee", async () => {
  await Promise.all([
    access("out/anmb/index.html"),
    access("out/anmb/comite/index.html"),
    access("out/anmb/reseau/index.html"),
    access("out/de/anmb/vorstand/index.html"),
    access("out/de/anmb/netzwerk/index.html"),
  ]);
  const html = await readFile("out/anmb/comite/index.html", "utf8");
  assert.match(html, /Alexandre Léger/);
  assert.match(html, /Pierre Montandon/);
  assert.match(html, /Membre du comité/);
});

test("exports classified and clickable reference organisations", async () => {
  const html = await readFile("out/anmb/reseau/index.html", "utf8");
  assert.match(html, /Partenaires professionnels de l’ANMB/);
  assert.match(html, /Proviande/);
  assert.match(html, /Suisse Terroir/);
  assert.match(html, /Suisse Tourisme/);
  assert.match(html, /https:\/\/www\.aop-igp\.ch\/fr\/saucisson-neuchatelois-igp/);
  assert.match(html, /https:\/\/www\.myswitzerland\.com\/fr-ch\/destinations\/neuchatel\//);
  assert.match(html, /ne signifie pas automatiquement/);
});

test("removes the obsolete schematic map from the homepage", async () => {
  const html = await readFile("out/index.html", "utf8");
  assert.doesNotMatch(html, /abstract-map|map-card/);
  assert.match(html, /Ouvrir la carte à jour/);
});
