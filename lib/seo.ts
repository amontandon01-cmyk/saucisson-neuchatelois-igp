import type { Metadata } from "next";
import { createElement } from "react";
import { pageMeta, routes, type Lang, type RouteKey } from "@/content/site";
import {
  absoluteUrl,
  assetPath,
  isPreproduction,
  siteName,
  siteOrigin,
} from "./site-config";

const socialImage = "/aop-saucisson-planche.webp";

export function rootMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(siteOrigin),
    title: {
      default: pageMeta[lang].home.title,
      template: `%s · ${siteName}`,
    },
    description: pageMeta[lang].home.description,
    applicationName: siteName,
    icons: {
      icon: assetPath("/favicon.png"),
      shortcut: assetPath("/favicon.png"),
      apple: assetPath("/favicon.png"),
    },
    robots: isPreproduction
      ? { index: false, follow: false, noarchive: true, nocache: true }
      : { index: true, follow: true },
  };
}

type PageMetadataInput = {
  lang: Lang;
  title: string;
  description: string;
  path: string;
  alternatePath: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({
  lang,
  title,
  description,
  path,
  alternatePath,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const frPath = lang === "fr" ? path : alternatePath;
  const dePath = lang === "de" ? path : alternatePath;
  const url = absoluteUrl(path);
  const image = absoluteUrl(socialImage);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: absoluteUrl(frPath),
        de: absoluteUrl(dePath),
        "x-default": absoluteUrl(frPath),
      },
    },
    openGraph: {
      type,
      locale: lang === "fr" ? "fr_CH" : "de_CH",
      alternateLocale: lang === "fr" ? ["de_CH"] : ["fr_CH"],
      title,
      description,
      siteName,
      url,
      images: [{ url: image, width: 1278, height: 850, alt: siteName }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function metadataForPage(lang: Lang, key: RouteKey): Metadata {
  const copy = pageMeta[lang][key];
  const alternateLang = lang === "fr" ? "de" : "fr";
  const metadata = buildMetadata({
    lang,
    title: copy.title,
    description: copy.description,
    path: routes[lang][key],
    alternatePath: routes[alternateLang][key],
  });
  return key === "home" ? { ...metadata, title: { absolute: copy.title } } : metadata;
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function websiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: absoluteUrl(routes[lang].home),
    inLanguage: lang,
    publisher: { "@id": `${absoluteUrl(routes[lang].association)}#organization` },
  };
}

export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: json },
  });
}
