import type { Metadata } from "next";
import "../globals.css";
import { rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("de");

export default function GermanLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de-CH"><body>{children}</body></html>;
}
