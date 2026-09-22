import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import test from "node:test";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const expectedStaticRoutes = [
  "le-produit",
  "saucisson-neuchatelois-igp",
  "saucisse-neuchateloise-igp",
  "cuisson",
  "recettes",
  "torree",
  "ou-acheter",
  "professionnels",
  "actualites",
  "anmb",
  "anmb/membres",
  "anmb/comite",
  "anmb/reseau",
  "protection-des-donnees",
  "de/die-zwei-igp",
  "de/saucisson-neuchatelois-igp",
  "de/saucisse-neuchateloise-igp",
  "de/zubereitung",
  "de/rezepte",
  "de/torree",
  "de/verkaufsstellen",
  "de/fachleute",
  "de/aktuell",
  "de/anmb",
  "de/anmb/mitgliedschaft",
  "de/anmb/vorstand",
  "de/anmb/netzwerk",
  "de/datenschutz",
];

const manufacturerSlugs = [
  "boucherie-schwartz",
  "boucherie-leger",
  "boucherie-margot",
  "boucherie-schneiter",
  "boucherie-de-la-fontaine",
  "boucherie-de-la-prairie",
  "boucherie-graf",
  "christen-delicatessen",
  "montandon-sa",
];

test("exports the complete bilingual route structure", async () => {
  const files = ["out/index.html", "out/de/index.html"];
  files.push(...expectedStaticRoutes.map((route) => `out/${route}/index.html`));
  for (const slug of manufacturerSlugs) {
    files.push(`out/fabricants/${slug}/index.html`, `out/de/hersteller/${slug}/index.html`);
  }
  files.push(
    "out/actualites/premiere-selection-2026/index.html",
    "out/de/aktuell/erste-selektion-2026/index.html",
    "out/robots.txt",
    "out/sitemap.xml",
  );
  await Promise.all(files.map((file) => access(file)));
});

test("sets a real document language for each language tree", async () => {
  const french = await readFile("out/index.html", "utf8");
  const german = await readFile("out/de/index.html", "utf8");
  assert.match(french, /<html lang="fr-CH">/);
  assert.match(german, /<html lang="de-CH">/);
  assert.match(french, /class="skip-link" href="#contenu"/);
  assert.match(german, /class="skip-link" href="#contenu"/);
});

test("keeps a basic accessibility contract on every public HTML page", async () => {
  for (const file of await htmlFiles("out")) {
    if (file.endsWith("404.html")) continue;
    const html = await readFile(file, "utf8");
    assert.match(html, /<html lang="(?:fr|de)-CH">/, `${file} needs a document language`);
    assert.match(
      html,
      /<main\b[^>]*\bid="contenu"[^>]*>/,
      `${file} needs the skip-link target`,
    );
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${file} needs exactly one h1`);
    for (const image of html.match(/<img\b[^>]*>/g) ?? []) {
      assert.match(image, /\balt="[^"]*"/, `${file} has an image without alt`);
    }
  }
});

test("keeps both protected names exact throughout the German site", async () => {
  const germanHtml = await readHtmlTree("out/de");
  assert.match(germanHtml, /Saucisson neuchâtelois IGP/);
  assert.match(germanHtml, /Saucisse neuchâteloise IGP/);
  assert.doesNotMatch(germanHtml, /Neuenburger\s+Saucisson/i);
  assert.doesNotMatch(germanHtml, /Neuenburger\s+Saucisse/i);
  assert.doesNotMatch(germanHtml, /Saucisson\s+de\s+Neuchâtel/i);
  assert.doesNotMatch(germanHtml, /Saucisse\s+de\s+Neuchâtel/i);
});

test("gives the two products equal pillar pages and structured data", async () => {
  const overview = await readFile("out/le-produit/index.html", "utf8");
  const saucisson = await readFile("out/saucisson-neuchatelois-igp/index.html", "utf8");
  const saucisse = await readFile("out/saucisse-neuchateloise-igp/index.html", "utf8");
  assert.match(overview, /"@type":"FAQPage"/);
  assert.match(overview, /Boyau de bœuf droit/);
  assert.match(overview, /Boyau de bœuf courbe/);
  for (const html of [saucisson, saucisse]) {
    assert.match(html, /"@type":"Product"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(html, /Au minimum 60 % de viande maigre/);
    assert.match(html, /Fumage entre 18 et 28 °C/);
    assert.match(html, /4<small>\/6<\/small>/);
  }
});

test("publishes only the supported cooking instruction", async () => {
  const allHtml = await readHtmlTree("out");
  const cooking = await readFile("out/cuisson/index.html", "utf8");
  assert.match(cooking, /Eau frémissante, 30 à 40 minutes/);
  assert.match(cooking, /aucune température numérique/);
  assert.doesNotMatch(allHtml, /80\s*°?\s*C/i);
  assert.doesNotMatch(allHtml, /repos(?:er)?\s+(?:pendant\s+)?cinq minutes/i);
  assert.doesNotMatch(allHtml, /ne pas piquer/i);
});

test("distinguishes nine certified manufacturers from their sale points", async () => {
  const directory = await readFile("out/ou-acheter/index.html", "utf8");
  assert.match(directory, />9<\/strong><span>fabricants certifiés/);
  assert.match(directory, />14<\/strong><span>points de vente liés/);
  assert.match(directory, /Fabricant certifié IGP/);
  assert.match(directory, /Points de vente du fabricant/);
  assert.match(directory, /OIC-SNE-UTI-0126-54796/);
  assert.match(directory, /OIC-SNE-UTI-1225-18742/);
  assert.match(directory, /https:\/\/www\.oic-izs\.ch\/Certificats\?Dossier=SNE/);
  assert.doesNotMatch(directory, /Fabricant certifié IGP[^]*Coop/i);
  assert.doesNotMatch(directory, /Fabricant certifié IGP[^]*Migros/i);
});

test("builds a factual profile for every certified manufacturer", async () => {
  for (const slug of manufacturerSlugs) {
    const french = await readFile(`out/fabricants/${slug}/index.html`, "utf8");
    const german = await readFile(`out/de/hersteller/${slug}/index.html`, "utf8");
    for (const html of [french, german]) {
      assert.match(html, /"@type":"Organization"/);
      assert.match(html, /OIC-SNE-UTI-/);
      assert.match(html, /Certificats\?Dossier=SNE/);
    }
  }
});

test("keeps recipe summaries attributed and avoids unsupported Recipe markup", async () => {
  const recipes = await readFile("out/recettes/index.html", "utf8");
  assert.match(recipes, /Neuf pistes documentées/);
  assert.match(recipes, /La torrée et sa salade de pommes de terre/);
  assert.match(recipes, /Brioche au Saucisson neuchâtelois IGP/);
  assert.match(recipes, /Patrimoine culinaire suisse/);
  assert.match(recipes, /patrimoineculinaire\.ch\/Produit\//);
  assert.match(recipes, /"@type":"ItemList"/);
  assert.match(recipes, /"numberOfItems":9/);
  assert.doesNotMatch(recipes, /"@type":"Recipe"/);
});

test("publishes only sourced news and no fabricated agenda", async () => {
  const index = await readFile("out/actualites/index.html", "utf8");
  const article = await readFile("out/actualites/premiere-selection-2026/index.html", "utf8");
  assert.match(index, /Aucun rendez-vous officiel publié/);
  assert.match(article, /"@type":"NewsArticle"/);
  assert.match(article, /25 août 2026/);
  assert.match(article, /Christen Delicatessen/);
  assert.match(article, /https:\/\/cnci\.ch\/premiere-selection-du-saucisson-neuchatelois-igp/);
});

test("publishes the verified ANMB committee without an invented coordinator", async () => {
  const committee = await readFile("out/anmb/comite/index.html", "utf8");
  for (const name of ["Alexandre Léger", "Fredy Frank", "Jean-Paul Gremion", "Pierre Montandon", "Bernard Perroud", "Pierre Stamm", "Frédéric Troiano"]) {
    assert.match(committee, new RegExp(name));
  }
  assert.doesNotMatch(committee, /Arthur Montandon/);
  assert.doesNotMatch(committee, /Coordination des deux IGP/);
  assert.match(committee, /Aucun rôle non publié n’est ajouté/);
});

test("emits canonical, hreflang, social, robots and sitemap metadata", async () => {
  const french = await readFile("out/le-produit/index.html", "utf8");
  const german = await readFile("out/de/die-zwei-igp/index.html", "utf8");
  const sitemap = await readFile("out/sitemap.xml", "utf8");
  const robots = await readFile("out/robots.txt", "utf8");
  assert.match(french, /rel="canonical"/);
  assert.match(french, /hrefLang="de"/);
  assert.match(french, /property="og:locale" content="fr_CH"/);
  assert.match(german, /hrefLang="fr"/);
  assert.match(german, /property="og:locale" content="de_CH"/);
  assert.match(sitemap, /saucisson-neuchatelois-igp/);
  assert.match(sitemap, /hreflang="de"/);
  assert.match(robots, /Allow: \/$/m);
  assert.match(robots, /Sitemap:/);
});

test("uses the configured GitHub Pages base path for routes, assets and metadata", async () => {
  if (!basePath) return;
  const html = await readFile("out/index.html", "utf8");
  const escaped = basePath.replaceAll("/", "\\/");
  assert.match(html, new RegExp(`${escaped}\\/_next\\/`));
  assert.match(html, new RegExp(`${escaped}\\/torree-hero\\.webp`));
  assert.match(html, new RegExp(`href="${escaped}\\/de\\/"`));
});

test("keeps every exported internal page link resolvable", async () => {
  const files = await htmlFiles("out");
  const known = new Set(files.map((file) => pagePathFromFile(file)));
  known.add("/robots.txt");
  known.add("/sitemap.xml");

  for (const file of files) {
    const html = await readFile(file, "utf8");
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      let href = match[1];
      if (!href.startsWith("/") || href.startsWith("/_next/") || extname(href)) continue;
      if (basePath && href.startsWith(`${basePath}/`)) href = href.slice(basePath.length);
      const normalized = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
      assert.ok(known.has(normalized), `${file} links to missing page ${normalized}`);
    }
  }
});

test("keeps the export free of placeholder and starter content", async () => {
  const html = await readHtmlTree("out");
  assert.doesNotMatch(html, /lorem ipsum|site-creator-vinext-starter|example\.com/i);
  assert.doesNotMatch(html, /Arthur Montandon/);
});

async function htmlFiles(root) {
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(path)));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}

async function readHtmlTree(root) {
  return (await Promise.all((await htmlFiles(root)).map((file) => readFile(file, "utf8")))).join("\n");
}

function pagePathFromFile(file) {
  const relative = file.replace(/^out\/?/, "").replace(/(^|\/)index\.html$/, "").replace(/\.html$/, "");
  return relative ? `/${relative}` : "/";
}
