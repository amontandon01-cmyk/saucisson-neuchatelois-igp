import type { LocalizedText } from "./products";
import { sources } from "./sources";

export type CommitteeMember = {
  name: string;
  company?: string;
  role: LocalizedText;
};
export const association = {
  name: "Association neuchâteloise des maîtres-bouchers",
  shortName: "ANMB",
  igpRole: {
    fr: "Groupement officiel du Saucisson neuchâtelois IGP et de la Saucisse neuchâteloise IGP",
    de: "Offizielle Trägerschaft von Saucisson neuchâtelois IGP und Saucisse neuchâteloise IGP",
  },
  address: ["c/o CNCI", "Rue de la Serre 4", "2001 Neuchâtel"],
  phone: "+41 32 727 24 23",
  email: "emmanuella.daverio@cnci.ch",
  website: sources.anmb,
  source: sources.federalRegister,
  verifiedAt: "2026-09-22",
} as const;

export const committee: CommitteeMember[] = [
  { name: "Alexandre Léger", company: "Boucherie Léger", role: { fr: "Président", de: "Präsident" } },
  { name: "Fredy Frank", company: "Rochefort", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
  { name: "Jean-Paul Gremion", company: "Boucherie Gremion", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
  { name: "Pierre Montandon", company: "Montandon SA", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
  { name: "Bernard Perroud", company: "Boucherie-Charcuterie de la Prairie", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
  { name: "Pierre Stamm", company: "Boucherie Stamm", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
  { name: "Frédéric Troiano", company: "Boucherie de la Fontaine SNC", role: { fr: "Membre du comité", de: "Vorstandsmitglied" } },
];

export const committeeSource = {
  url: sources.anmbCommittee,
  verifiedAt: "2026-09-22",
};
