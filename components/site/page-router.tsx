import { notFound } from "next/navigation";
import { AssociationPage, type AssociationPageKey } from "@/components/association/association-pages";
import { LocatorPage } from "@/components/directory/locator-page";
import { ManufacturerPage } from "@/components/directory/manufacturer-page";
import { NewsArticlePage, NewsIndexPage } from "@/components/news/news-pages";
import { OverviewPage } from "@/components/product/overview-page";
import { ProductPage } from "@/components/product/product-page";
import { ProfessionalPage } from "@/components/professional/professional-page";
import { RecipesPage } from "@/components/recipes/recipes-page";
import { DetailPage, PrivacyPage } from "@/components/site/detail-page";
import { staticPageForPath, type Lang, type PageKey } from "@/content/site";
import { manufacturerBySlug } from "@/data/manufacturers";
import { newsItems } from "@/data/news";

export function RoutedPage({ lang, path }: { lang: Lang; path: string }) {
  const manufacturerPrefix = lang === "fr" ? "/fabricants/" : "/de/hersteller/";
  if (path.startsWith(manufacturerPrefix)) {
    const manufacturer = manufacturerBySlug(path.slice(manufacturerPrefix.length));
    if (!manufacturer) notFound();
    return <ManufacturerPage lang={lang} manufacturer={manufacturer} />;
  }

  const newsPrefix = lang === "fr" ? "/actualites/" : "/de/aktuell/";
  if (path.startsWith(newsPrefix)) {
    const slug = path.slice(newsPrefix.length);
    const item = newsItems.find((entry) => entry.slugs[lang] === slug);
    if (!item) notFound();
    return <NewsArticlePage lang={lang} item={item} />;
  }

  const key = staticPageForPath(lang, path);
  if (!key) notFound();
  return <StaticPage lang={lang} pageKey={key} />;
}

function StaticPage({ lang, pageKey }: { lang: Lang; pageKey: PageKey }) {
  switch (pageKey) {
    case "overview":
      return <OverviewPage lang={lang} />;
    case "saucisson":
      return <ProductPage lang={lang} productId="saucisson" />;
    case "saucisse":
      return <ProductPage lang={lang} productId="saucisse" />;
    case "cooking":
    case "torree":
      return <DetailPage lang={lang} pageKey={pageKey} />;
    case "recipes":
      return <RecipesPage lang={lang} />;
    case "locator":
      return <LocatorPage lang={lang} />;
    case "pro":
      return <ProfessionalPage lang={lang} />;
    case "news":
      return <NewsIndexPage lang={lang} />;
    case "association":
    case "members":
    case "committee":
    case "partners":
      return <AssociationPage lang={lang} pageKey={pageKey as AssociationPageKey} />;
    case "privacy":
      return <PrivacyPage lang={lang} />;
  }
}
