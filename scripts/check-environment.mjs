import { spawnSync } from "node:child_process";

const environment = process.argv[2];
if (!['production', 'preprod'].includes(environment)) {
  throw new Error("Usage : node scripts/check-environment.mjs <production|preprod>");
}

const repositoryPath = "/saucisson-neuchatelois-igp";
const env = {
  ...process.env,
  NEXT_PUBLIC_DEPLOY_ENV: environment,
  NEXT_PUBLIC_SITE_URL: "https://amontandon01-cmyk.github.io",
  NEXT_PUBLIC_BASE_PATH:
    environment === "preprod" ? `${repositoryPath}/preprod` : repositoryPath,
  NEXT_PUBLIC_CANONICAL_BASE_PATH: repositoryPath,
  NEXT_PUBLIC_RELEASE_SHA: `test-${environment}`,
};
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

run(npmCommand, ["run", "build"]);
run(process.execPath, [
  "--test",
  "tests/static-export.test.mjs",
  "tests/deployment-environment.test.mjs",
  "tests/publication-workflow.test.mjs",
]);

function run(command, args) {
  const result = spawnSync(command, args, { env, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
