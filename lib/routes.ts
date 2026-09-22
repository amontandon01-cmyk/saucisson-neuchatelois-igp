import type { Lang } from "@/data/products";
import type { NewsItem } from "@/data/news";

export function manufacturerRoute(lang: Lang, slug: string) {
  return lang === "fr" ? `/fabricants/${slug}` : `/de/hersteller/${slug}`;
}
export function newsArticleRoute(lang: Lang, item: NewsItem) {
  return lang === "fr"
    ? `/actualites/${item.slugs.fr}`
    : `/de/aktuell/${item.slugs.de}`;
}
