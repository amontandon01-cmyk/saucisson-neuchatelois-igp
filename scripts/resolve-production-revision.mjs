import { appendFileSync, readFileSync } from "node:fs";

const releaseUrl =
  "https://amontandon01-cmyk.github.io/saucisson-neuchatelois-igp/release.json";
const baseline = readFileSync("deploy/production-baseline.txt", "utf8").trim();
let revision = baseline;
let source = "baseline";

const response = await fetch(`${releaseUrl}?check=${Date.now()}`, {
  signal: AbortSignal.timeout(15_000),
  headers: { "cache-control": "no-cache" },
});

if (response.ok) {
  const manifest = await response.json();
  if (manifest.environment !== "production" || !isSha(manifest.revision)) {
    throw new Error("Le manifeste actuellement publié n’identifie pas une production valide.");
  }
  revision = manifest.revision;
  source = "release.json";
} else if (response.status !== 404) {
  throw new Error(`Impossible de lire la production actuelle (HTTP ${response.status}).`);
}

if (!isSha(revision)) throw new Error("Le SHA de production de référence est invalide.");

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `sha=${revision}\nsource=${source}\n`, "utf8");
} else {
  process.stdout.write(`${revision}\n`);
}

function isSha(value) {
  return /^[0-9a-f]{40}$/.test(value);
}
