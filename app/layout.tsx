import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saucisson neuchâtelois IGP",
  description:
    "Le site du Saucisson neuchâtelois IGP : origine, cuisson, recettes, torrée et points de vente.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/logo-igp-officiel.jpg",
    shortcut: "/logo-igp-officiel.jpg",
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
