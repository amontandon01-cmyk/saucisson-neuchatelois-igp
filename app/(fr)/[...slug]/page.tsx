import type { Metadata } from "next";
import { RoutedPage } from "@/components/site/page-router";
import { metadataForPath, staticRouteParams } from "@/lib/page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticRouteParams("fr");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  return metadataForPath("fr", `/${slug.join("/")}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <RoutedPage lang="fr" path={`/${slug.join("/")}`} />;
}
