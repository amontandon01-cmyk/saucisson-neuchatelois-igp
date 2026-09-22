import type { MetadataRoute } from "next";
import { routes, type Lang, type RouteKey } from "@/content/site";
import { manufacturers } from "@/data/manufacturers";
import { newsItems } from "@/data/news";
import { manufacturerRoute, newsArticleRoute } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-09-22T00:00:00Z");
  const entries: MetadataRoute.Sitemap = [];
  const keys = Object.keys(routes.fr) as RouteKey[];

  for (const key of keys) {
    const fr = routes.fr[key];
    const de = routes.de[key];
    entries.push(entry(fr, de, "fr", updated), entry(de, fr, "de", updated));
  }

  for (const manufacturer of manufacturers) {
    const fr = manufacturerRoute("fr", manufacturer.slug);
    const de = manufacturerRoute("de", manufacturer.slug);
    entries.push(entry(fr, de, "fr", updated), entry(de, fr, "de", updated));
  }

  for (const item of newsItems) {
    const fr = newsArticleRoute("fr", item);
    const de = newsArticleRoute("de", item);
    const itemUpdated = new Date(`${item.updatedAt}T00:00:00Z`);
    entries.push(entry(fr, de, "fr", itemUpdated), entry(de, fr, "de", itemUpdated));
  }

  return entries;
}

function entry(path: string, alternatePath: string, lang: Lang, lastModified: Date): MetadataRoute.Sitemap[number] {
  const fr = lang === "fr" ? path : alternatePath;
  const de = lang === "de" ? path : alternatePath;
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path.includes("actualit") || path.includes("aktuell") ? "monthly" : "yearly",
    priority: path === "/" || path === "/de" ? 1 : 0.7,
    alternates: { languages: { fr: absoluteUrl(fr), de: absoluteUrl(de) } },
  };
}
