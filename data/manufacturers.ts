import type { ProductId } from "./products";
import { sources } from "./sources";

export type RegionKey = "mountains" | "littoral" | "val-de-ruz";
export type DirectoryStatus = "certified-manufacturer" | "manufacturer-sale-point" | "external-retailer";

export type Manufacturer = {
  id: string;
  slug: string;
  name: string;
  legalName: string;
  status: "certified-manufacturer";
  locality: string;
  canton: "NE";
  website?: string;
  certificateNumber: string;
  certificateIssuedAt: string;
  certificateValidUntil: string;
  products: ProductId[];
  source: string;
  verifiedAt: string;
};

export type SalePoint = {
  id: string;
  manufacturerId: string;
  name: string;
  locality: string;
  canton: "NE";
  region: RegionKey;
  status: "manufacturer-sale-point";
  website?: string;
  source: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-22";
const bothProducts: ProductId[] = ["saucisson", "saucisse"];

export const manufacturers: Manufacturer[] = [
  {
    id: "schwartz",
    slug: "boucherie-schwartz",
    name: "Boucherie Schwartz",
    legalName: "Boucherie Schwartz Denis",
    status: "certified-manufacturer",
    locality: "Les Geneveys-sur-Coffrane",
    canton: "NE",
    website: "https://www.boucherie-schwartz.ch/",
    certificateNumber: "OIC-SNE-UTI-0126-54796",
    certificateIssuedAt: "2025-12-30",
    certificateValidUntil: "2027-12-31",
    products: bothProducts,
    source: sources.oicDirectory,
    verifiedAt,
  },
  {
    id: "leger",
    slug: "boucherie-leger",
    name: "Boucherie Léger",
    legalName: "Boucherie A. Léger — Léger Alexandre",
    status: "certified-manufacturer",
    locality: "Saint-Blaise",
    canton: "NE",
    certificateNumber: "OIC-SNE-UTI-1125-54822",
    certificateIssuedAt: "2024-12-30",
    certificateValidUntil: "2026-12-31",
    products: bothProducts,
    source: sources.oicDirectory,
    verifiedAt,
  },
  {
    id: "margot",
    slug: "boucherie-margot",
    name: "Boucherie Margot SA",
    legalName: "Boucherie Margot SA",
    status: "certified-manufacturer",
    locality: "Neuchâtel",
    canton: "NE",
    certificateNumber: "OIC-SNE-UTI-1224-54802",
    certificateIssuedAt: "2024-12-13",
    certificateValidUntil: "2026-12-31",
    products: bothProducts,
    source: sources.oicDirectory,
    verifiedAt,
  },
  {
    id: "schneiter",
    slug: "boucherie-schneiter",
    name: "Boucherie Schneiter Sàrl",
    legalName: "Boucherie Schneiter Sàrl",
    status: "certified-manufacturer",
    locality: "Cernier",
    canton: "NE",
    website: "https://www.halltitude.market/",
    certificateNumber: "OIC-SNE-UTI-0626-160615",
    certificateIssuedAt: "2026-06-04",
    certificateValidUntil: "2028-12-31",
    products: bothProducts,
    source: sources.oicDirectory,
    verifiedAt,
  },
  {
    id: "fontaine",
    slug: "boucherie-de-la-fontaine",
    name: "Boucherie-Traiteur de la Fontaine",
    legalName: "Boucherie-Charcuterie de la Fontaine S.N.C — Troiano Frédéric",
    status: "certified-manufacturer",
    locality: "Peseux",
    canton: "NE",
    website: "https://www.boucheriedelafontaine.ch/",
    certificateNumber: "OIC-SNE-UTI-0126-232014",
    certificateIssuedAt: "2025-12-30",
    certificateValidUntil: "2027-12-31",
    products: bothProducts,
    source: sources.oicDirectory,
    verifiedAt,
  },
  {
    id: "prairie",
    slug: "boucherie-de-la-prairie",
    name: "Boucherie-Charcuterie de la Prairie",
    legalName: "Boucherie-charcuterie de la Prairie",
    status: "certified-manufacturer",
    locality: "La Chaux-de-Fonds",
    canton: "NE",
    website: "https://www.boucheriedelaprairie.ch/",
    certificateNumber: "OIC-SNE-UTI-0126-54807",
    certificateIssuedAt: "2025-12-30",
    certificateValidUntil: "2027-12-31",
    products: bothProducts,
    source: sources.oicDirectory,
    verifiedAt,
  },
  {
    id: "graf",
    slug: "boucherie-graf",
    name: "Boucherie Graf",
    legalName: "Boucherie-Traiteur-Charcuterie Graf Dominique",
    status: "certified-manufacturer",
    locality: "Cornaux",
    canton: "NE",
    website: "https://www.boucherie-graf.ch/",
    certificateNumber: "OIC-SNE-UTI-0325-54832",
    certificateIssuedAt: "2025-03-06",
    certificateValidUntil: "2027-12-31",
    products: bothProducts,
    source: sources.oicDirectory,
    verifiedAt,
  },
  {
    id: "christen",
    slug: "christen-delicatessen",
    name: "Christen Delicatessen",
    legalName: "Christen Delicatessen SA",
    status: "certified-manufacturer",
    locality: "La Chaux-de-Fonds",
    canton: "NE",
    website: "https://christen-delicatessen.ch/",
    certificateNumber: "OIC-SNE-UTI-1024-54781",
    certificateIssuedAt: "2024-10-04",
    certificateValidUntil: "2026-12-31",
    products: bothProducts,
    source: sources.oicDirectory,
    verifiedAt,
  },
  {
    id: "montandon",
    slug: "montandon-sa",
    name: "Montandon SA",
    legalName: "Montandon SA",
    status: "certified-manufacturer",
    locality: "Les Ponts-de-Martel",
    canton: "NE",
    website: "https://www.montandon.ch/",
    certificateNumber: "OIC-SNE-UTI-1225-18742",
    certificateIssuedAt: "2025-12-03",
    certificateValidUntil: "2027-12-31",
    products: bothProducts,
    source: sources.oicDirectory,
    verifiedAt,
  },
];

export const salePoints: SalePoint[] = [
  { id: "montandon-village", manufacturerId: "montandon", name: "Magasin au Village", locality: "Les Ponts-de-Martel", canton: "NE", region: "mountains", status: "manufacturer-sale-point", website: "https://www.montandon.ch/", source: "https://www.montandon.ch/", verifiedAt },
  { id: "montandon-shop", manufacturerId: "montandon", name: "Au Shop", locality: "Les Ponts-de-Martel", canton: "NE", region: "mountains", status: "manufacturer-sale-point", website: "https://www.montandon.ch/", source: "https://www.montandon.ch/", verifiedAt },
  { id: "leger-saint-blaise", manufacturerId: "leger", name: "Boucherie Léger", locality: "Saint-Blaise", canton: "NE", region: "littoral", status: "manufacturer-sale-point", source: sources.anmbCommittee, verifiedAt },
  { id: "schwartz-geneveys", manufacturerId: "schwartz", name: "Boucherie Schwartz", locality: "Les Geneveys-sur-Coffrane", canton: "NE", region: "val-de-ruz", status: "manufacturer-sale-point", website: "https://www.boucherie-schwartz.ch/", source: "https://www.boucherie-schwartz.ch/", verifiedAt },
  { id: "prairie-marche", manufacturerId: "prairie", name: "Place du Marché", locality: "La Chaux-de-Fonds", canton: "NE", region: "mountains", status: "manufacturer-sale-point", website: "https://www.boucheriedelaprairie.ch/", source: "https://www.boucheriedelaprairie.ch/", verifiedAt },
  { id: "prairie-eplatures", manufacturerId: "prairie", name: "Eplatures Centre", locality: "La Chaux-de-Fonds", canton: "NE", region: "mountains", status: "manufacturer-sale-point", website: "https://www.boucheriedelaprairie.ch/", source: "https://www.boucheriedelaprairie.ch/", verifiedAt },
  { id: "fontaine-peseux", manufacturerId: "fontaine", name: "Boucherie de la Fontaine", locality: "Peseux", canton: "NE", region: "littoral", status: "manufacturer-sale-point", website: "https://www.boucheriedelafontaine.ch/", source: "https://www.boucheriedelafontaine.ch/", verifiedAt },
  { id: "margot-neuchatel", manufacturerId: "margot", name: "Boucherie Margot SA", locality: "Neuchâtel", canton: "NE", region: "littoral", status: "manufacturer-sale-point", source: sources.oicDirectory, verifiedAt },
  { id: "graf-cornaux", manufacturerId: "graf", name: "Boucherie Graf", locality: "Cornaux", canton: "NE", region: "littoral", status: "manufacturer-sale-point", website: "https://www.boucherie-graf.ch/", source: "https://www.boucherie-graf.ch/", verifiedAt },
  { id: "schneiter-chaux", manufacturerId: "schneiter", name: "Marché Hall’titude", locality: "La Chaux-de-Fonds", canton: "NE", region: "mountains", status: "manufacturer-sale-point", website: "https://www.halltitude.market/", source: "https://www.halltitude.market/", verifiedAt },
  { id: "schneiter-cernier", manufacturerId: "schneiter", name: "Evologia", locality: "Cernier", canton: "NE", region: "val-de-ruz", status: "manufacturer-sale-point", source: sources.oicDirectory, verifiedAt },
  { id: "schneiter-locle", manufacturerId: "schneiter", name: "Point de vente du Locle", locality: "Le Locle", canton: "NE", region: "mountains", status: "manufacturer-sale-point", source: "https://www.halltitude.market/", verifiedAt },
  { id: "christen-chaux", manufacturerId: "christen", name: "Place du Marché", locality: "La Chaux-de-Fonds", canton: "NE", region: "mountains", status: "manufacturer-sale-point", website: "https://christen-delicatessen.ch/", source: "https://christen-delicatessen.ch/", verifiedAt },
  { id: "christen-cortaillod", manufacturerId: "christen", name: "Cortaillod", locality: "Cortaillod", canton: "NE", region: "littoral", status: "manufacturer-sale-point", website: "https://christen-delicatessen.ch/", source: "https://christen-delicatessen.ch/", verifiedAt },
];

/** Reserved for Coop, Migros, specialist shops and restaurants after validation. */
export const externalRetailers: Array<{
  id: string;
  name: string;
  locality: string;
  canton: string;
  status: "external-retailer";
  source: string;
  verifiedAt: string;
}> = [];

export const manufacturerCount = manufacturers.length;
export const salePointCount = salePoints.length;
export const regionCount = new Set(salePoints.map((point) => point.region)).size;

export function manufacturerById(id: string) {
  return manufacturers.find((manufacturer) => manufacturer.id === id);
}
export function manufacturerBySlug(slug: string) {
  return manufacturers.find((manufacturer) => manufacturer.slug === slug);
}

export function salePointsForManufacturer(id: string) {
  return salePoints.filter((point) => point.manufacturerId === id);
}

export function googlePlaceUrl(point: SalePoint) {
  const manufacturer = manufacturerById(point.manufacturerId);
  const query = `${manufacturer?.name ?? point.name}, ${point.name}, ${point.locality}, Suisse`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
