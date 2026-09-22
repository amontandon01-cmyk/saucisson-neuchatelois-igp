export type DeploymentEnvironment = "development" | "preprod" | "production";

const configuredEnvironment = process.env.NEXT_PUBLIC_DEPLOY_ENV;

export const deploymentEnvironment: DeploymentEnvironment =
  configuredEnvironment === "preprod" || configuredEnvironment === "production"
    ? configuredEnvironment
    : "development";
export const isPreproduction = deploymentEnvironment === "preprod";
export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
export const canonicalBasePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_CANONICAL_BASE_PATH ?? basePath,
);

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteOrigin = configuredSiteUrl.replace(/\/$/, "");
export const siteName = "Saucisson neuchâtelois IGP & Saucisse neuchâteloise IGP";

export function withBasePath(path: string) {
  return withPrefix(basePath, path);
}

export function absoluteUrl(path: string) {
  return `${siteOrigin}${withPrefix(canonicalBasePath, path)}`;
}

export function assetPath(path: string) {
  return withBasePath(path);
}

function normalizeBasePath(value: string | undefined) {
  if (!value || value === "/") return "";
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.replace(/\/$/, "");
}

function withPrefix(prefix: string, path: string) {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${normalizedPath}` || "/";
}
