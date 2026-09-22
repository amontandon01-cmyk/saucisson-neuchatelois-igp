import type { LocalizedText } from "./products";

export type PublishedEvent = {
  id: string;
  slugs: LocalizedText;
  title: LocalizedText;
  startsAt: string;
  location: string;
  source: string;
  verifiedAt: string;
  status: "published";
};

/** Agenda infrastructure is ready; no event is published without an official source. */
export const events: PublishedEvent[] = [];
