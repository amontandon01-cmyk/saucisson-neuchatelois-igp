import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workflowRoot = ".github/workflows";

test("deploys only after an explicit internal request", async () => {
  const requestFiles = {
    "deploy-preprod.yml": "deploy/preprod-request.txt",
    "deploy-production.yml": "deploy/production-request.txt",
  };

  for (const [name, requestFile] of Object.entries(requestFiles)) {
    const workflow = await readFile(`${workflowRoot}/${name}`, "utf8");
    assert.match(workflow, /workflow_dispatch:/);
    assert.match(workflow, /^  push:/m);
    assert.match(workflow, /branches:\n\s+- main/);
    assert.match(workflow, new RegExp(requestFile.replaceAll("/", "\\/")));
    assert.match(workflow, /test "\$GITHUB_REF_NAME" = main/);
    assert.match(workflow, /cancel-in-progress: false/);
  }
});

test("publishes only the version already served in preproduction", async () => {
  const workflow = await readFile(`${workflowRoot}/deploy-production.yml`, "utf8");
  assert.doesNotMatch(workflow, /validated_sha:|confirmation:/);
  assert.doesNotMatch(workflow, /DEPLOY_CONFIRMATION|VALIDATED_SHA/);
  assert.match(workflow, /test "\$GITHUB_REF_NAME" = main/);
  assert.match(workflow, /tr -d '\[:space:\]' < deploy\/production-request\.txt/);
  assert.match(workflow, /git diff --name-only "\$release_sha" "\$GITHUB_SHA"/);
  assert.match(workflow, /Prouver que cette version est actuellement en préproduction/);
  assert.match(workflow, /verify-live\.mjs \\\s+preprod \\\s+"\$\{\{ steps\.release\.outputs\.sha \}\}"/);
  assert.match(workflow, /verify-live\.mjs production\s+"\$\{\{ steps\.release\.outputs\.sha \}\}"/);
});

test("keeps the published production revision while preparing preproduction", async () => {
  const workflow = await readFile(`${workflowRoot}/deploy-preprod.yml`, "utf8");
  assert.match(workflow, /resolve-production-revision\.mjs/);
  assert.match(workflow, /fetch-depth: 0/);
  assert.match(workflow, /NEXT_PUBLIC_DEPLOY_ENV: preprod/);
  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH: \/saucisson-neuchatelois-igp\/preprod/);
  assert.match(workflow, /compose-pages\.mjs/);
});

test("keeps a valid immutable production baseline", async () => {
  const baseline = (await readFile("deploy/production-baseline.txt", "utf8")).trim();
  assert.match(baseline, /^[0-9a-f]{40}$/);
});
