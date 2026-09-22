import type { Metadata } from "next";
import { routes, staticPageForPath, type Lang, type RouteKey } from "@/content/site";
import { manufacturerBySlug, manufacturers } from "@/data/manufacturers";
import { newsItems } from "@/data/news";
import { manufacturerRoute, newsArticleRoute } from "./routes";
import { buildMetadata, metadataForPage } from "./seo";

export function metadataForPath(lang: Lang, path: string): Metadata {
  const otherLang = lang === "fr" ? "de" : "fr";
  const manufacturerPrefix = lang === "fr" ? "/fabricants/" : "/de/hersteller/";
  if (path.startsWith(manufacturerPrefix)) {
    const manufacturer = manufacturerBySlug(path.slice(manufacturerPrefix.length));
    if (!manufacturer) return {};
    return buildMetadata({
      lang,
      title: `${manufacturer.name} · ${lang === "fr" ? "fabricant certifié IGP" : "IGP-zertifizierter Hersteller"}`,
      description:
        lang === "fr"
          ? `${manufacturer.name}, fabricant certifié du Saucisson neuchâtelois IGP et de la Saucisse neuchâteloise IGP à ${manufacturer.locality}. Certificat et points de vente vérifiés.`
          : `${manufacturer.name}, zertifizierter Hersteller von Saucisson neuchâtelois IGP und Saucisse neuchâteloise IGP in ${manufacturer.locality}. Geprüftes Zertifikat und Verkaufsstellen.`,
      path: manufacturerRoute(lang, manufacturer.slug),
      alternatePath: manufacturerRoute(otherLang, manufacturer.slug),
    });
  }

  const newsPrefix = lang === "fr" ? "/actualites/" : "/de/aktuell/";
  if (path.startsWith(newsPrefix)) {
    const item = newsItems.find((entry) => entry.slugs[lang] === path.slice(newsPrefix.length));
    if (!item) return {};
    return buildMetadata({
      lang,
      title: item.title[lang],
      description: item.summary[lang],
      path: newsArticleRoute(lang, item),
      alternatePath: newsArticleRoute(otherLang, item),
      type: "article",
      publishedTime: item.publishedAt,
      modifiedTime: item.updatedAt,
    });
  }

  const pageKey = staticPageForPath(lang, path);
  return pageKey ? metadataForPage(lang, pageKey) : {};
}

export function staticRouteParams(lang: Lang) {
  const prefix = lang === "fr" ? "" : "/de";
  const regular = (Object.entries(routes[lang]) as [RouteKey, string][])
    .filter(([key]) => key !== "home")
    .map(([, route]) => route.slice(prefix.length).replace(/^\//, "").split("/"));
  const manufacturerRoutes = manufacturers.map((manufacturer) => [lang === "fr" ? "fabricants" : "hersteller", manufacturer.slug]);
  const news = newsItems.map((item) => [lang === "fr" ? "actualites" : "aktuell", item.slugs[lang]]);
  return [...regular, ...manufacturerRoutes, ...news].map((slug) => ({ slug }));
}
