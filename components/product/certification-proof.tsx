import { BadgeCheck, ExternalLink } from "lucide-react";
import type { Lang } from "@/content/site";
import { commonProductFacts } from "@/data/products";
import { sources } from "@/data/sources";

export function CertificationProof({ lang }: { lang: Lang }) {
  const criteria =
    lang === "fr"
      ? ["Aspect extérieur", "Aspect intérieur", "Consistance", "Saveur & odeur"]
      : ["Äusseres", "Schnittbild", "Konsistenz", "Geschmack & Geruch"];
  const stages =
    lang === "fr"
      ? [
          { number: "01", title: "Contrôler la fabrication", text: "Inspections, analyses et traçabilité vérifient le respect du cahier des charges." },
          { number: "02", title: "Évaluer le produit", text: "Le cahier des charges prévoit des examens technologiques et organoleptiques par un comité de dégustation." },
          { number: "03", title: "Certifier indépendamment", text: "L’OIC assure la certification. L’usage de la dénomination peut être retiré en cas de non-conformité." },
        ]
      : [
          { number: "01", title: "Herstellung kontrollieren", text: "Inspektionen, Analysen und Rückverfolgbarkeit prüfen die Einhaltung des Pflichtenhefts." },
          { number: "02", title: "Produkt beurteilen", text: "Das Pflichtenheft sieht technologische und sensorische Prüfungen durch ein Verkostungskomitee vor." },
          { number: "03", title: "Unabhängig zertifizieren", text: "Die OIC zertifiziert. Bei Nichtkonformität kann das Nutzungsrecht entzogen werden." },
        ];

  return (
    <section className="certification-proof">
      <div className="certification-proof-inner section-pad">
        <div className="certification-proof-heading">
          <div>
            <p className="eyebrow light">{lang === "fr" ? "Contrôles & dégustation" : "Kontrolle & Verkostung"}</p>
            <h2>{lang === "fr" ? "Quatre critères, une note minimale pour chacun." : "Vier Kriterien, je eine Mindestnote."}</h2>
          </div>
          <div>
            <p>
              {lang === "fr"
                ? "Le produit doit obtenir au moins 4 sur chacun des quatre critères. L’Association suisse des AOP-IGP indique en outre que chaque unité de production fait l’objet d’une évaluation organoleptique annuelle."
                : "Das Produkt muss in jedem der vier Kriterien mindestens die Note 4 erreichen. Die Schweizerische Vereinigung der AOP-IGP hält zudem fest, dass jede Produktionseinheit jährlich sensorisch beurteilt wird."}
            </p>
            <div className="certification-links">
              <a href={sources.specification} target="_blank" rel="noreferrer">
                {lang === "fr" ? "Cahier des charges" : "Pflichtenheft"}
                <ExternalLink aria-hidden="true" size={14} />
              </a>
              <a href={sources.certificationControls} target="_blank" rel="noreferrer">
                {lang === "fr" ? "Contrôles AOP-IGP" : "AOP-IGP-Kontrollen"}
                <ExternalLink aria-hidden="true" size={14} />
              </a>
            </div>
          </div>
        </div>
        <div className="certification-scorecard">
          <div className="certification-score">
            <BadgeCheck aria-hidden="true" size={30} />
            <strong>{commonProductFacts.tastingMinimumScore}<small>/6</small></strong>
            <span>{lang === "fr" ? "minimum sur chacun des quatre critères" : "mindestens in jedem der vier Kriterien"}</span>
          </div>
          <div className="certification-criteria">
            {criteria.map((criterion, index) => (
              <span key={criterion}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {criterion}
              </span>
            ))}
          </div>
        </div>
        <div className="certification-stages">
          {stages.map((stage) => (
            <article key={stage.number}>
              <span>{stage.number}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
