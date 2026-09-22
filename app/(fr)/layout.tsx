import type { Metadata } from "next";
import "../globals.css";
import { rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("fr");

export default function FrenchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr-CH"><body>{children}</body></html>;
}
