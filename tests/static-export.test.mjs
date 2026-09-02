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
