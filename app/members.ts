export type AssociationMember = {
  name: string;
  city: string;
  locations?: number;
  website?: string;
};

/**
 * Organisations actives publiées par l'ANMB, regroupées par entreprise.
 * Les succursales d'une même entreprise ne sont pas comptées comme des membres distincts.
 */
export const associationMembers: AssociationMember[] = [
  { name: "Boucherie Alves", city: "Fleurier" },
  { name: "Boucherie Au Gourmet", city: "Fleurier" },
  { name: "Boucherie Bariffi", city: "Neuchâtel" },
  { name: "Boucherie Centrale · Christen Delicatessen", city: "La Chaux-de-Fonds", website: "https://christen-delicatessen.ch/" },
  { name: "Boucherie Dänzer", city: "Travers" },
  { name: "Boucherie-Traiteur de la Fontaine", city: "Peseux", website: "https://www.boucheriedelafontaine.ch/" },
  { name: "Boucherie de la Sibérie", city: "La Brévine" },
  { name: "Boucherie du Grand Pont", city: "La Chaux-de-Fonds" },
  { name: "Boucherie Gaille", city: "La Chaux-de-Fonds" },
  { name: "Boucherie Gremion", city: "Cormondrèche", website: "https://www.boucherie-gremion.ch/" },
  { name: "Boucherie Margot SA", city: "Neuchâtel" },
  { name: "Boucherie Nouvelle", city: "La Chaux-de-Fonds" },
  { name: "Boucherie Schwartz", city: "Les Geneveys-sur-Coffrane", website: "https://www.boucherie-schwartz.ch/" },
  { name: "Boucherie Stamm", city: "Le Landeron" },
  { name: "Boucherie-Charcuterie de la Prairie", city: "La Chaux-de-Fonds", locations: 3, website: "https://www.boucheriedelaprairie.ch/" },
  { name: "Boucherie-Charcuterie Montandon SA", city: "Les Ponts-de-Martel", locations: 2, website: "https://www.montandon.ch/" },
  { name: "Abattoir régional des Ponts-de-Martel", city: "Les Ponts-de-Martel" },
  { name: "Boucherie Léger", city: "Saint-Blaise" },
  { name: "Boucherie Médérick Mesko", city: "Les Ponts-de-Martel" },
  { name: "O’Talho · Lela dos Santos", city: "La Chaux-de-Fonds" },
  { name: "Boucherie des Coteaux", city: "Cortaillod" },
];

export const associationMembersSource = "https://www.boucheries-neuchatel.ch/Membres/Membres-actifs";
