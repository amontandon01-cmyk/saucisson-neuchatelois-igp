import { accessSync, cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const [productionRoot, preprodRoot, outputRoot] = process.argv.slice(2).map((path) =>
  path ? resolve(path) : undefined,
);

if (!productionRoot || !preprodRoot || !outputRoot) {
  throw new Error(
    "Usage : node scripts/compose-pages.mjs <production> <preproduction> <destination>",
  );
}

for (const [name, path] of [
  ["production", productionRoot],
  ["préproduction", preprodRoot],
]) {
  assertInsideRepository(path, name);
  accessSync(resolve(path, "index.html"));
  accessSync(resolve(path, "release.json"));
}
assertInsideRepository(outputRoot, "destination");

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(outputRoot, { recursive: true });
cpSync(productionRoot, outputRoot, { recursive: true });
cpSync(preprodRoot, resolve(outputRoot, "preprod"), { recursive: true });
writeFileSync(resolve(outputRoot, ".nojekyll"), "", "utf8");

function assertInsideRepository(path, name) {
  const relativePath = relative(process.cwd(), path);
  if (!relativePath || relativePath.startsWith("..")) {
    throw new Error(`Le dossier ${name} doit rester à l’intérieur du dépôt.`);
  }
}
