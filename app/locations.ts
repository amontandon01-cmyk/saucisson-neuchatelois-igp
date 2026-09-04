export type RegionKey = "mountains" | "littoral" | "val-de-ruz";

export type SaleLocation = {
  id: string;
  producerId: string;
  producer: string;
  location: string;
  city: string;
  region: RegionKey;
  website?: string;
  award?: "winner-2026";
};

/**
 * Fabricants certifiés et points de vente publics recensés en 2026.
 * Les coordonnées et horaires restent volontairement chez Google et sur les
 * sites des entreprises afin d'éviter de republier des données vite obsolètes.
 */
export const locations: SaleLocation[] = [
  { id: "montandon-village", producerId: "montandon", producer: "Boucherie-Charcuterie Montandon SA", location: "Magasin au Village", city: "Les Ponts-de-Martel", region: "mountains", website: "https://www.montandon.ch/" },
  { id: "montandon-shop", producerId: "montandon", producer: "Boucherie-Charcuterie Montandon SA", location: "Au Shop", city: "Les Ponts-de-Martel", region: "mountains", website: "https://www.montandon.ch/" },
  { id: "leger-saint-blaise", producerId: "leger", producer: "Boucherie Léger", location: "Saint-Blaise", city: "Saint-Blaise", region: "littoral" },
  { id: "schwartz-geneveys", producerId: "schwartz", producer: "Boucherie Schwartz", location: "Les Geneveys-sur-Coffrane", city: "Les Geneveys-sur-Coffrane", region: "val-de-ruz", website: "https://www.boucherie-schwartz.ch/" },
  { id: "prairie-marche", producerId: "prairie", producer: "Boucherie-Charcuterie de la Prairie", location: "Place du Marché", city: "La Chaux-de-Fonds", region: "mountains", website: "https://www.boucheriedelaprairie.ch/" },
  { id: "prairie-eplatures", producerId: "prairie", producer: "Boucherie-Charcuterie de la Prairie", location: "Eplatures Centre", city: "La Chaux-de-Fonds", region: "mountains", website: "https://www.boucheriedelaprairie.ch/" },
  { id: "fontaine-peseux", producerId: "fontaine", producer: "Boucherie-Traiteur de la Fontaine", location: "Peseux", city: "Peseux", region: "littoral", website: "https://www.boucheriedelafontaine.ch/" },
  { id: "margot-neuchatel", producerId: "margot", producer: "Boucherie Margot SA", location: "Neuchâtel", city: "Neuchâtel", region: "littoral" },
  { id: "graf-cornaux", producerId: "graf", producer: "Boucherie Graf", location: "Cornaux", city: "Cornaux", region: "littoral", website: "https://www.boucherie-graf.ch/" },
  { id: "schneiter-chaux", producerId: "schneiter", producer: "Boucherie Schneiter Sàrl", location: "Marché Hall’titude", city: "La Chaux-de-Fonds", region: "mountains", website: "https://www.halltitude.market/" },
  { id: "schneiter-cernier", producerId: "schneiter", producer: "Boucherie Schneiter Sàrl", location: "Evologia", city: "Cernier", region: "val-de-ruz" },
  { id: "schneiter-locle", producerId: "schneiter", producer: "Boucherie Schneiter Sàrl", location: "Le Locle", city: "Le Locle", region: "mountains" },
  { id: "christen-chaux", producerId: "christen", producer: "Christen Delicatessen", location: "Place du Marché", city: "La Chaux-de-Fonds", region: "mountains", website: "https://christen-delicatessen.ch/", award: "winner-2026" },
  { id: "christen-cortaillod", producerId: "christen", producer: "Christen Delicatessen", location: "Cortaillod", city: "Cortaillod", region: "littoral", website: "https://christen-delicatessen.ch/", award: "winner-2026" },
];

export const producerCount = new Set(locations.map((item) => item.producerId)).size;

export function googlePlaceUrl(item: SaleLocation) {
  const query = `${item.producer}, ${item.location}, ${item.city}, Suisse`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
