import { mkdirSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

export function writeRelease({ root, environment, revision, canonicalBasePath }) {
  if (!['development', 'preprod', 'production'].includes(environment)) {
    throw new Error(`Environnement de publication invalide : ${environment}`);
  }

  const resolvedRoot = resolve(root);
  const relativeRoot = relative(process.cwd(), resolvedRoot);
  if (relativeRoot.startsWith("..") || relativeRoot === "") {
    throw new Error("La destination du manifeste doit être un sous-dossier du dépôt.");
  }

  mkdirSync(resolvedRoot, { recursive: true });
  const manifest = {
    schemaVersion: 1,
    site: "saucisson-neuchatelois-igp",
    environment,
    revision,
    canonicalBasePath,
  };
  writeFileSync(
    resolve(resolvedRoot, "release.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
}

if (process.argv[1]?.endsWith("write-release.mjs")) {
  const values = new Map();
  for (let index = 2; index < process.argv.length; index += 2) {
    values.set(process.argv[index], process.argv[index + 1]);
  }
  const root = values.get("--root");
  const environment = values.get("--environment");
  const revision = values.get("--revision");
  const canonicalBasePath = values.get("--canonical-base-path");
  if (!root || !environment || !revision || canonicalBasePath === undefined) {
    throw new Error(
      "Usage : node scripts/write-release.mjs --root <dossier> --environment <environnement> --revision <sha> --canonical-base-path <chemin>",
    );
  }
  writeRelease({ root, environment, revision, canonicalBasePath });
}
