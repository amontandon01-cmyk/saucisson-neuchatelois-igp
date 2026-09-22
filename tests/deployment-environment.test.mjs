import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

const environment = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "development";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const canonicalBasePath = (
  process.env.NEXT_PUBLIC_CANONICAL_BASE_PATH ?? basePath
).replace(/\/$/, "");
const revision = process.env.NEXT_PUBLIC_RELEASE_SHA ?? "local";

test("publishes a traceable release manifest", async () => {
  const manifest = JSON.parse(await readFile("out/release.json", "utf8"));
  assert.deepEqual(manifest, {
    schemaVersion: 1,
    site: "saucisson-neuchatelois-igp",
    environment,
    revision,
    canonicalBasePath,
  });
});

test("keeps preproduction out of search indexes", async () => {
  if (environment !== "preprod") return;
  const robots = await readFile("out/robots.txt", "utf8");
  assert.match(robots, /^Disallow: \/$/m);
  assert.doesNotMatch(robots, /^Sitemap:/m);
  await assert.rejects(access("out/sitemap.xml"));

  for (const file of await htmlFiles("out")) {
    const html = await readFile(file, "utf8");
    assert.match(
      html,
      /<meta name="robots" content="[^"]*noindex[^"]*"\/>/,
      `${file} doit rester en noindex`,
    );
  }
});

test("keeps canonical URLs on production while assets use the current environment", async () => {
  const html = await readFile("out/index.html", "utf8");
  const canonical = `https://amontandon01-cmyk.github.io${canonicalBasePath || "/"}`;
  assert.match(html, new RegExp(`rel="canonical" href="${escapeRegex(canonical)}/?"`));
  if (environment === "preprod") {
    assert.doesNotMatch(html, /rel="canonical"[^>]*\/preprod\//);
    assert.match(html, new RegExp(`${escapeRegex(basePath)}\/_next\/`));
  }
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

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
