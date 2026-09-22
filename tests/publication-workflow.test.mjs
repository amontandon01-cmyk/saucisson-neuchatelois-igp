import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workflowRoot = ".github/workflows";

test("never deploys production or preproduction automatically", async () => {
  for (const name of ["deploy-preprod.yml", "deploy-production.yml"]) {
    const workflow = await readFile(`${workflowRoot}/${name}`, "utf8");
    assert.match(workflow, /workflow_dispatch:/);
    assert.doesNotMatch(workflow, /^\s+push:/m);
    assert.match(workflow, /test "\$GITHUB_REF_NAME" = main/);
    assert.match(workflow, /cancel-in-progress: false/);
  }
});

test("requires explicit production approval and the validated SHA", async () => {
  const workflow = await readFile(`${workflowRoot}/deploy-production.yml`, "utf8");
  assert.match(workflow, /test "\$DEPLOY_CONFIRMATION" = PRODUCTION/);
  assert.match(workflow, /test "\$VALIDATED_SHA" = "\$GITHUB_SHA"/);
  assert.match(workflow, /Prouver que ce SHA est actuellement en préproduction/);
  assert.match(workflow, /verify-live\.mjs production "\$GITHUB_SHA" "\$GITHUB_SHA"/);
});

test("keeps the published production revision while preparing preproduction", async () => {
  const workflow = await readFile(`${workflowRoot}/deploy-preprod.yml`, "utf8");
  assert.match(workflow, /resolve-production-revision\.mjs/);
  assert.match(workflow, /NEXT_PUBLIC_DEPLOY_ENV: preprod/);
  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH: \/saucisson-neuchatelois-igp\/preprod/);
  assert.match(workflow, /compose-pages\.mjs/);
});

test("keeps a valid immutable production baseline", async () => {
  const baseline = (await readFile("deploy/production-baseline.txt", "utf8")).trim();
  assert.match(baseline, /^[0-9a-f]{40}$/);
});
