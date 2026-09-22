export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteOrigin = configuredSiteUrl.replace(/\/$/, "");
export const siteName = "Saucisson neuchâtelois IGP & Saucisse neuchâteloise IGP";

export function withBasePath(path: string) {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}` || "/";
}
export function absoluteUrl(path: string) {
  return `${siteOrigin}${withBasePath(path)}`;
}

export function assetPath(path: string) {
  return withBasePath(path);
}
