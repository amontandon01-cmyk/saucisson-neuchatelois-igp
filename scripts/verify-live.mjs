const [mode, expectedPreprodRevision, expectedProductionRevision] = process.argv.slice(2);
const rootUrl = "https://amontandon01-cmyk.github.io/saucisson-neuchatelois-igp";

if (!['preprod', 'production'].includes(mode)) {
  throw new Error(
    "Usage : node scripts/verify-live.mjs <preprod|production> <sha-preprod> <sha-production>",
  );
}
if (![expectedPreprodRevision, expectedProductionRevision].every(isSha)) {
  throw new Error("Les deux révisions attendues doivent être des SHA Git complets.");
}

let lastError;
for (let attempt = 1; attempt <= 15; attempt += 1) {
  try {
    await verifyRelease(`${rootUrl}/release.json`, "production", expectedProductionRevision);
    await verifyRelease(
      `${rootUrl}/preprod/release.json`,
      "preprod",
      expectedPreprodRevision,
    );
    await verifyHome(`${rootUrl}/`, false);
    await verifyHome(`${rootUrl}/preprod/`, true);
    process.stdout.write(
      `Publication ${mode} vérifiée : production ${expectedProductionRevision}, préproduction ${expectedPreprodRevision}.\n`,
    );
    process.exit(0);
  } catch (error) {
    lastError = error;
    if (attempt < 15) await new Promise((resolve) => setTimeout(resolve, 4_000));
  }
}

throw lastError;

async function verifyRelease(url, environment, revision) {
  const response = await request(url);
  if (!response.ok) throw new Error(`${url} répond HTTP ${response.status}.`);
  const manifest = await response.json();
  if (manifest.environment !== environment || manifest.revision !== revision) {
    throw new Error(
      `${url} annonce ${manifest.environment}/${manifest.revision} au lieu de ${environment}/${revision}.`,
    );
  }
}

async function verifyHome(url, shouldBeNoIndex) {
  const response = await request(url);
  if (!response.ok) throw new Error(`${url} répond HTTP ${response.status}.`);
  const html = await response.text();
  const hasNoIndex = /<meta name="robots" content="[^"]*noindex[^"]*"\/>/.test(html);
  if (hasNoIndex !== shouldBeNoIndex) {
    throw new Error(`${url} présente une directive robots inattendue.`);
  }
  if (shouldBeNoIndex && /rel="canonical"[^>]*\/preprod\//.test(html)) {
    throw new Error("La préproduction se déclare à tort comme URL canonique.");
  }
}

function request(url) {
  const separator = url.includes("?") ? "&" : "?";
  return fetch(`${url}${separator}check=${Date.now()}`, {
    signal: AbortSignal.timeout(15_000),
    headers: { "cache-control": "no-cache" },
  });
}

function isSha(value) {
  return /^[0-9a-f]{40}$/.test(value ?? "");
}
