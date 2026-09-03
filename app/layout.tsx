import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Saucisson neuchâtelois IGP",
  description:
    "Le site du Saucisson neuchâtelois IGP : origine, cuisson, recettes, torrée et points de vente.",
  icons: {
    icon: `${basePath}/logo-igp-officiel.jpg`,
    shortcut: `${basePath}/logo-igp-officiel.jpg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
