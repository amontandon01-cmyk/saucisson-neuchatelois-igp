import type { Metadata } from "next";
import { HomePage } from "@/components/site/home-page";
import { metadataForPage } from "@/lib/seo";

export const metadata: Metadata = metadataForPage("fr", "home");

export default function Page() {
  return <HomePage lang="fr" />;
}
