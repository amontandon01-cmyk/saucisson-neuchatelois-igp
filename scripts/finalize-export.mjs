import { accessSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { writeRelease } from "./write-release.mjs";

const environment = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "development";
const revision = process.env.NEXT_PUBLIC_RELEASE_SHA ?? "local";
const canonicalBasePath = (process.env.NEXT_PUBLIC_CANONICAL_BASE_PATH ?? "").replace(/\/$/, "");
const outputRoot = "out";

accessSync(join(outputRoot, "index.html"));

if (environment === "preprod") {
  rmSync(join(outputRoot, "sitemap.xml"), { force: true });
  const robots = readFileSync(join(outputRoot, "robots.txt"), "utf8");
  if (!/^Disallow: \/$/m.test(robots) || /^Sitemap:/m.test(robots)) {
    throw new Error("Le robots.txt de préproduction n’interdit pas correctement l’indexation.");
  }
  for (const file of htmlFiles(outputRoot)) {
    const html = readFileSync(file, "utf8");
    if (!/<meta name="robots" content="[^"]*noindex[^"]*"\/>/.test(html)) {
      throw new Error(`${file} ne contient pas de directive noindex.`);
    }
  }
} else {
  accessSync(join(outputRoot, "sitemap.xml"));
}

writeRelease({ root: outputRoot, environment, revision, canonicalBasePath });

function htmlFiles(root) {
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(path));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}
