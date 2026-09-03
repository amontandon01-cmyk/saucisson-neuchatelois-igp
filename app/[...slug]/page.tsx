import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages, slugToPage } from "../content";
import { DetailPage, HomePage, titleFor } from "../site";

export const dynamicParams = false;

export function generateStaticParams() { return Object.keys(slugToPage).map((slug) => ({ slug: slug.split("/") })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params; const page = slugToPage[slug.join("/")]; if (!page) return {};
  return { title: titleFor(page.lang, page.key), description: page.key === "home" ? undefined : pages[page.lang][page.key].intro };
}

export default async function RoutedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params; const page = slugToPage[slug.join("/")]; if (!page) notFound();
  if (page.key === "home") return <HomePage lang={page.lang} />;
  return <DetailPage lang={page.lang} pageKey={page.key} />;
}
