import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Saucisson neuchâtelois IGP & Saucisse neuchâteloise IGP",
  description:
    "Le site du Saucisson neuchâtelois IGP et de la Saucisse neuchâteloise IGP : origine, cuisson, recettes, torrée et points de vente.",
  icons: {
    icon: `${basePath}/favicon.png`,
    shortcut: `${basePath}/favicon.png`,
    apple: `${basePath}/favicon.png`,
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
