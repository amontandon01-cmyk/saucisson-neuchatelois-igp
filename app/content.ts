export type Lang = "fr" | "de";
export type PageKey = "product" | "cooking" | "recipes" | "torree" | "locator" | "pro" | "association" | "members" | "committee" | "partners";

export type DetailContent = {
  eyebrow: string;
  title: string;
  intro: string;
  facts: { value: string; label: string }[];
  sections: { kicker: string; title: string; text: string; bullets?: string[] }[];
  note?: string;
};

export const routes: Record<Lang, Record<"home" | PageKey, string>> = {
  fr: { home: "/", product: "/le-produit", cooking: "/cuisson", recipes: "/recettes", torree: "/torree", locator: "/ou-acheter", pro: "/professionnels", association: "/anmb", members: "/anmb/membres", committee: "/anmb/comite", partners: "/anmb/reseau" },
  de: { home: "/de", product: "/de/das-produkt", cooking: "/de/zubereitung", recipes: "/de/rezepte", torree: "/de/torree", locator: "/de/verkaufsstellen", pro: "/de/fachhandel", association: "/de/anmb", members: "/de/anmb/mitglieder", committee: "/de/anmb/vorstand", partners: "/de/anmb/netzwerk" },
};

export const slugToPage: Record<string, { lang: Lang; key: "home" | PageKey }> = {
  de: { lang: "de", key: "home" },
  "le-produit": { lang: "fr", key: "product" },
  cuisson: { lang: "fr", key: "cooking" },
  recettes: { lang: "fr", key: "recipes" },
  torree: { lang: "fr", key: "torree" },
  "ou-acheter": { lang: "fr", key: "locator" },
  professionnels: { lang: "fr", key: "pro" },
  anmb: { lang: "fr", key: "association" },
  "anmb/membres": { lang: "fr", key: "members" },
  "anmb/comite": { lang: "fr", key: "committee" },
  "anmb/reseau": { lang: "fr", key: "partners" },
  "de/das-produkt": { lang: "de", key: "product" },
  "de/zubereitung": { lang: "de", key: "cooking" },
  "de/rezepte": { lang: "de", key: "recipes" },
  "de/torree": { lang: "de", key: "torree" },
  "de/verkaufsstellen": { lang: "de", key: "locator" },
  "de/fachhandel": { lang: "de", key: "pro" },
  "de/anmb": { lang: "de", key: "association" },
  "de/anmb/mitglieder": { lang: "de", key: "members" },
  "de/anmb/vorstand": { lang: "de", key: "committee" },
  "de/anmb/netzwerk": { lang: "de", key: "partners" },
};

export const ui = {
  fr: {
    claim: "Fabriqué dans le canton de Neuchâtel", pro: "Espace professionnel", menu: "Menu", language: "Deutsch", short: "DE",
    nav: [["product", "Les deux IGP"], ["cooking", "Cuisson"], ["recipes", "Recettes"], ["torree", "La torrée"], ["locator", "Fabricants & vente"]] as [PageKey, string][],
    heroEyebrow: "Saucisson neuchâtelois IGP & Saucisse neuchâteloise IGP · depuis 2003", heroTitle: "Le goût fumé d’un canton.",
    heroIntro: "Un savoir-faire de boucherie, une fumaison douce et tout un territoire à partager — de la table familiale à la torrée.",
    find: "Trouver où l’acheter", cook: "Réussir la cuisson", imageCaption: "La torrée, un rituel neuchâtelois vivant.",
    proofTitle: "Simples à reconnaître. Régulièrement contrôlées.", proofText: "L’IGP protège un lieu de fabrication, un procédé et un goût. La traçabilité et la fabrication sont contrôlées, et chaque unité de production soumet ses produits à une dégustation annuelle.",
    pathwayTitle: "Une réponse claire pour chaque visiteur", pathwayText: "La navigation part des questions réelles : comprendre, cuisiner, trouver ou distribuer.",
    storyKicker: "Deux produits, deux formes", storyTitle: "Droit ou courbé, toujours neuchâtelois.", storyText: "Le Saucisson neuchâtelois IGP est embossé dans un boyau droit ; la Saucisse neuchâteloise IGP dans un boyau courbe. Tous deux sont crus, fumés et doivent être cuits avant dégustation.",
    torreeTitle: "À la torrée, le produit devient un moment.", torreeText: "Dans les forêts et pâturages du Jura neuchâtelois, la torrée réunit les générations autour des braises. Le site en transmet l’histoire, les gestes et les règles de prudence.",
    recipeTitle: "Trois façons de commencer", locatorTitle: "Neuf fabricants recensés, quatorze adresses.", locatorText: "Une carte cantonale séparée de l’annuaire des membres ANMB, avec recherche par localité et accès direct à chaque fiche Google.",
    proTitle: "Faire connaître l’IGP au-delà du canton.", proText: "Une entrée dédiée au commerce, à la restauration et aux médias, avec argumentaire bilingue, contacts et matériel de vente.",
  },
  de: {
    claim: "Im Kanton Neuenburg hergestellt", pro: "Für Fachleute", menu: "Menü", language: "Français", short: "FR",
    nav: [["product", "Die zwei IGP"], ["cooking", "Zubereitung"], ["recipes", "Rezepte"], ["torree", "Die Torrée"], ["locator", "Hersteller & Verkauf"]] as [PageKey, string][],
    heroEyebrow: "Neuenburger Saucisson IGP & Neuenburger Saucisse IGP · seit 2003", heroTitle: "Der rauchige Geschmack eines Kantons.",
    heroIntro: "Metzgerhandwerk, sanfte Räucherung und eine ganze Region zum Entdecken — vom Familientisch bis zur Torrée.",
    find: "Verkaufsstelle finden", cook: "Richtig zubereiten", imageCaption: "Die Torrée: lebendige Neuenburger Tradition.",
    proofTitle: "Leicht zu erkennen. Regelmässig kontrolliert.", proofText: "Die IGP schützt Herstellungsort, Verfahren und Charakter. Rückverfolgbarkeit und Herstellung werden kontrolliert; jede Produktionseinheit lässt ihre Produkte jährlich sensorisch beurteilen.",
    pathwayTitle: "Ein klarer Weg für jedes Bedürfnis", pathwayText: "Die Navigation folgt echten Fragen: kennenlernen, zubereiten, finden oder verkaufen.",
    storyKicker: "Zwei Produkte, zwei Formen", storyTitle: "Gerade oder gebogen — immer aus Neuenburg.", storyText: "Der Neuenburger Saucisson IGP wird in einen geraden, die Neuenburger Saucisse IGP in einen gebogenen Darm gefüllt. Beide sind roh geräuchert und müssen vor dem Genuss gekocht werden.",
    torreeTitle: "Bei der Torrée wird das Produkt zum Erlebnis.", torreeText: "In den Wäldern und Weiden des Neuenburger Juras bringt die Torrée Generationen an der Glut zusammen. Die Website vermittelt Geschichte, Handgriffe und Sicherheitsregeln.",
    recipeTitle: "Drei Ideen für den Anfang", locatorTitle: "Neun erfasste Hersteller, vierzehn Adressen.", locatorText: "Eine kantonale Karte getrennt vom ANMB-Mitgliederverzeichnis, mit Ortssuche und direktem Zugriff auf den Google-Eintrag.",
    proTitle: "Die IGP über die Kantonsgrenze hinaus bekannt machen.", proText: "Ein eigener Bereich für Handel, Gastronomie und Medien mit zweisprachigen Argumenten, Kontakten und Verkaufsmaterial.",
  },
};

const fr: Record<PageKey, DetailContent> = {
  product: {
    eyebrow: "Origine & savoir-faire", title: "Une IGP qui se goûte.", intro: "Le Saucisson neuchâtelois IGP et la Saucisse neuchâteloise IGP traduisent un savoir-faire cantonal précis, protégé depuis 2003.",
    facts: [{ value: "2003", label: "enregistrement IGP" }, { value: "18–28 °C", label: "fumaison à froid" }, { value: "36 h", label: "procédé minimal" }, { value: "CH", label: "viande porcine" }],
    sections: [
      { kicker: "Composition", title: "Le goût vient d’une recette sobre.", text: "Le cahier des charges prévoit au minimum 60 % de viande maigre et au maximum 35 % de gras. Sel nitrité, poivre et ail construisent la signature aromatique.", bullets: ["Viande porcine provenant de Suisse", "Fabrication et fumaison dans le canton de Neuchâtel", "Produit cru fumé, à cuire avant consommation"] },
      { kicker: "Deux formats", title: "Le saucisson droit, la saucisse courbe.", text: "Le boyau donne la silhouette : droit pour le saucisson, courbe pour la saucisse. Diamètre de 40 à 60 mm, poids de 200 à 600 g." },
      { kicker: "La promesse IGP", title: "Une origine lisible, pas un simple décor.", text: "L’IGP relie la qualité au territoire de transformation et à des étapes contrôlées. Le site l’explique simplement et renvoie vers le cahier des charges complet." },
    ],
  },
  cooking: {
    eyebrow: "Mode d’emploi", title: "Une cuisson douce, un résultat généreux.", intro: "Le bon réflexe : éviter l’ébullition. Une eau maintenue autour de 80 °C préserve le boyau, les jus et la texture.",
    facts: [{ value: "80 °C", label: "eau frémissante" }, { value: "30–40 min", label: "selon le calibre" }, { value: "0", label: "trou dans le boyau" }, { value: "5 min", label: "repos conseillé" }],
    sections: [
      { kicker: "01 · Préparer", title: "Déposez la pièce sans la piquer.", text: "Placez le saucisson ou la saucisse dans une casserole et couvrez largement d’eau froide. Le boyau intact aide à conserver les saveurs." },
      { kicker: "02 · Chauffer", title: "Montez doucement vers le frémissement.", text: "Gardez l’eau autour de 80 °C, sans gros bouillons. Comptez environ 30 à 40 minutes selon le poids et les indications du producteur." },
      { kicker: "03 · Servir", title: "Laissez reposer, puis tranchez.", text: "Attendez quelques minutes et coupez des tranches épaisses. Pommes de terre, poireaux, lentilles ou salade acidulée équilibrent son caractère fumé." },
    ], note: "Les indications figurant sur l’étiquette du producteur restent prioritaires.",
  },
  recipes: {
    eyebrow: "Recettes", title: "Le fumé ouvre l’appétit.", intro: "Trois portes d’entrée, de l’assiette familiale au plat contemporain, pour cuisiner le Saucisson neuchâtelois IGP comme la Saucisse neuchâteloise IGP.",
    facts: [{ value: "4", label: "personnes" }, { value: "3", label: "idées de cuisine" }, { value: "2", label: "produits IGP" }, { value: "100 %", label: "convivial" }],
    sections: [
      { kicker: "Le classique", title: "Pommes de terre, poireaux et moutarde.", text: "Cuisez doucement le saucisson ou la saucisse. Servez en tranches avec pommes de terre vapeur, poireaux fondants et vinaigrette à la moutarde en grains.", bullets: ["Préparation simple", "Accord : Chasselas ou jus de pomme sec", "Idéal en automne et en hiver"] },
      { kicker: "La cocotte", title: "Lentilles, carottes et herbes fraîches.", text: "Faites mijoter les lentilles avec carotte, oignon et laurier. Ajoutez l’une des deux spécialités, cuite et tranchée, au dernier moment.", bullets: ["Plat complet", "Facile à préparer à l’avance", "Une pointe de vinaigre réveille le fumé"] },
      { kicker: "L’apéritif", title: "Tranches tièdes, pickles et pain de seigle.", text: "Présentez de petites tranches tièdes sur du pain grillé, avec pickles de légumes et moutarde douce.", bullets: ["Format dégustation", "Adapté aux événements", "Facile à décliner en restauration"] },
    ],
  },
  torree: {
    eyebrow: "Tradition neuchâteloise", title: "La torrée se raconte autour des braises.", intro: "Plus qu’une recette, c’est un rendez-vous avec la forêt, la saison et les autres. Une tradition à transmettre avec respect.",
    facts: [{ value: "Jura", label: "forêts et pâturages" }, { value: "Braises", label: "cœur du rituel" }, { value: "Familles", label: "gestes transmis" }, { value: "Prudence", label: "toujours prioritaire" }],
    sections: [
      { kicker: "Le geste", title: "Du feu vif à la chaleur lente.", text: "La torrée commence par un feu maîtrisé, puis se cuisine dans les braises. Les méthodes d’enveloppement et accompagnements varient selon les familles." },
      { kicker: "Le moment", title: "Se retrouver avant de se restaurer.", text: "On prépare, on attend, on échange. Le saucisson relie la convivialité au territoire et raconte bien plus qu’une simple fiche produit." },
      { kicker: "La responsabilité", title: "Avant tout feu, vérifier les restrictions.", text: "En période sèche, les feux peuvent être limités ou interdits. Consultez les consignes cantonales et éteignez complètement les braises.", bullets: ["Consulter le danger d’incendie le jour même", "Garder de l’eau à proximité", "Ne laisser aucune braise ni déchet"] },
    ], note: "Cette page culturelle ne remplace jamais les directives officielles de sécurité incendie.",
  },
  locator: {
    eyebrow: "Fabricants & vente", title: "Le Saucisson neuchâtelois IGP près de chez vous.", intro: "Neuf fabricants recensés et quatorze adresses de vente réunis sur une carte interactive, avec un accès direct à la fiche Google et à l’itinéraire.",
    facts: [{ value: "9", label: "fabricants recensés" }, { value: "14", label: "adresses de vente" }, { value: "3", label: "régions à filtrer" }, { value: "04.09.2026", label: "mise à jour" }],
    sections: [],
  },
  pro: {
    eyebrow: "Professionnels", title: "Un produit régional prêt à voyager.", intro: "Le commerce, la gastronomie et les médias ont besoin d’informations rapides, de visuels fiables et d’un contact clair — en français comme en allemand.",
    facts: [{ value: "B2B", label: "contact dédié" }, { value: "FR/DE", label: "outils de vente" }, { value: "IGP", label: "preuves accessibles" }, { value: "CH", label: "ambition nationale" }],
    sections: [
      { kicker: "Commerce", title: "Donner au rayon une histoire qui vend.", text: "Argumentaire court, conseils de cuisson, affichettes, recettes et QR code : le matériel de vente doit lever les freins en quelques secondes.", bullets: ["Fiches produit bilingues", "Kit PLV et contenus sociaux", "Liste des fournisseurs certifiés"] },
      { kicker: "Gastronomie", title: "Inspirer les chefs sans figer le produit.", text: "Formats disponibles, usages, accords et idées de carte ouvrent la porte aux restaurants, traiteurs et événements." },
      { kicker: "Presse & tourisme", title: "Une médiathèque avec des droits clairs.", text: "Photos haute définition, historique, chiffres sourcés, contacts et conditions d’utilisation seront regroupés dans un espace téléchargeable." },
    ],
  },
  association: {
    eyebrow: "Association professionnelle", title: "L’ANMB porte la voix du métier.", intro: "L’Association neuchâteloise des maîtres bouchers réunit les entreprises de la branche. Elle est aussi le groupement de contact officiel des deux IGP, sans confondre adhésion professionnelle et certification produit.",
    facts: [{ value: "1919", label: "fondation" }, { value: "21", label: "membres actifs publiés" }, { value: "2", label: "spécialités IGP portées" }, { value: "CNCI", label: "secrétariat" }],
    sections: [
      { kicker: "Branche", title: "Représenter les bouchères, bouchers et entreprises carnées.", text: "L’ANMB défend les intérêts professionnels, soutient la formation et relie ses membres aux organisations cantonales et nationales." },
      { kicker: "Deux IGP", title: "Porter le dossier, sans fabriquer la certification.", text: "L’ANMB est le contact officiel du Saucisson neuchâtelois IGP et de la Saucisse neuchâteloise IGP. Sa commission de contrôle participe aux examens organoleptiques ; la certification indépendante relève de l’OIC." },
      { kicker: "Clarté", title: "Trois listes, trois significations.", text: "Les membres ANMB appartiennent au réseau professionnel. Les fabricants IGP satisfont au cahier des charges et à la certification, qu’ils soient membres de l’ANMB ou non. Les points de vente sont des adresses où le public peut acheter le produit. Une même entreprise peut apparaître dans plusieurs listes, mais elles ne sont jamais équivalentes." },
    ],
  },
  members: {
    eyebrow: "Association · Réseau professionnel", title: "Les membres publiés par l’ANMB.", intro: "Cette page restitue l’annuaire public de l’association, sans le confondre avec la liste des fabricants certifiés IGP. L’adhésion ne prouve pas la certification et un fabricant certifié peut aussi ne pas être membre.",
    facts: [{ value: "21", label: "organisations affichées" }, { value: "7", label: "vétérans annoncés" }, { value: "4", label: "catégories statutaires" }, { value: "≠ IGP", label: "adhésion et certification" }],
    sections: [], note: "Liste regroupée par organisation à partir de la page publique « Membres actifs » de l’ANMB, consultée le 4 septembre 2026. Elle indique ce que l’ancien site publie, mais ne remplace pas le registre administratif actuel de l’association. Les succursales ne sont pas comptées comme des membres distincts.",
  },
  committee: {
    eyebrow: "Association · Gouvernance", title: "Le comité de l’ANMB.", intro: "Le comité gouverne l’association professionnelle. Le pilotage quotidien des deux IGP et la certification sont présentés séparément afin que chaque responsabilité soit compréhensible.",
    facts: [{ value: "7", label: "membres publiés" }, { value: "1", label: "président" }, { value: "NE", label: "représentation cantonale" }, { value: "2026", label: "vérification requise" }],
    sections: [], note: "Composition reprise du site ANMB consulté le 4 septembre 2026. Les fonctions et mandats doivent être confirmés avant le lancement officiel.",
  },
  partners: {
    eyebrow: "Association · Réseau", title: "Partenaires et organismes de référence.", intro: "Les partenaires professionnels de l’ANMB sont présentés séparément des institutions qui protègent, certifient, documentent ou font rayonner le produit.",
    facts: [{ value: "3", label: "partenaires ANMB publiés" }, { value: "3", label: "organismes IGP" }, { value: "3", label: "références terroir" }, { value: "3", label: "relais de rayonnement" }],
    sections: [],
  },
};

const translateFacts = (facts: DetailContent["facts"]) => facts;
const de: Record<PageKey, DetailContent> = {
  product: { eyebrow: "Herkunft & Handwerk", title: "Eine IGP, die man schmeckt.", intro: "Neuenburger Saucisson IGP und Saucisse IGP stehen für ein präzises, seit 2003 geschütztes kantonales Können.", facts: [{ value: "2003", label: "IGP-Eintragung" }, { value: "18–28 °C", label: "Kalträucherung" }, { value: "36 Std.", label: "Mindestverfahren" }, { value: "CH", label: "Schweinefleisch" }], sections: [{ kicker: "Zusammensetzung", title: "Der Geschmack braucht nur wenig.", text: "Mindestens 60 % Magerfleisch, höchstens 35 % Fett sowie Nitritpökelsalz, Pfeffer und Knoblauch bilden das Aromaprofil.", bullets: ["Schweinefleisch aus der Schweiz", "Herstellung und Räucherung im Kanton Neuenburg", "Roh geräuchert, vor dem Genuss zu kochen"] }, { kicker: "Zwei Formen", title: "Gerader Saucisson, gebogene Saucisse.", text: "Der Darm bestimmt die Form. Durchmesser 40 bis 60 mm, Gewicht 200 bis 600 g." }, { kicker: "IGP-Versprechen", title: "Nachvollziehbare Herkunft statt Dekoration.", text: "Die IGP verbindet Qualität mit dem Verarbeitungsgebiet und kontrollierten Arbeitsschritten." }] },
  cooking: { eyebrow: "Anleitung", title: "Sanft garen, grosszügig geniessen.", intro: "Starkes Kochen vermeiden: Wasser um 80 °C schont Darm, Saftigkeit und Textur.", facts: [{ value: "80 °C", label: "siedendes Wasser" }, { value: "30–40 Min.", label: "je nach Kaliber" }, { value: "0", label: "Löcher im Darm" }, { value: "5 Min.", label: "empfohlene Ruhe" }], sections: [{ kicker: "01 · Vorbereiten", title: "Nicht einstechen.", text: "Saucisson oder Saucisse in einen Topf legen und gut mit kaltem Wasser bedecken. Der intakte Darm hält die Aromen im Produkt." }, { kicker: "02 · Erwärmen", title: "Langsam bis knapp unter den Siedepunkt.", text: "Das Wasser ungefähr bei 80 °C halten. Je nach Gewicht und Herstellerangabe 30 bis 40 Minuten garen." }, { kicker: "03 · Servieren", title: "Ruhen lassen und dick aufschneiden.", text: "Kartoffeln, Lauch, Linsen oder ein säuerlicher Salat balancieren den Rauchgeschmack." }], note: "Die Zubereitungshinweise des Herstellers auf der Etikette haben Vorrang." },
  recipes: { eyebrow: "Rezepte", title: "Rauch macht Appetit.", intro: "Drei Ideen vom Familienteller bis zum modernen Apéro für den Neuenburger Saucisson IGP und die Neuenburger Saucisse IGP.", facts: [{ value: "4", label: "Personen" }, { value: "3", label: "Küchenideen" }, { value: "2", label: "IGP-Produkte" }, { value: "100 %", label: "gesellig" }], sections: [{ kicker: "Klassisch", title: "Kartoffeln, Lauch und Senf.", text: "Saucisson oder Saucisse sanft garen und mit Dampfkartoffeln, geschmortem Lauch und Körnersenf-Vinaigrette servieren.", bullets: ["Einfache Zubereitung", "Dazu: Chasselas oder trockener Apfelsaft", "Ideal für Herbst und Winter"] }, { kicker: "Aus dem Topf", title: "Linsen, Karotten und Kräuter.", text: "Linsen mit Karotte, Zwiebel und Lorbeer köcheln. Eine der beiden Spezialitäten aufgeschnitten erst am Schluss dazugeben." }, { kicker: "Zum Apéro", title: "Warme Scheiben, Pickles und Roggenbrot.", text: "Auf geröstetem Brot mit Gemüsepickles und mildem Senf servieren." }] },
  torree: { eyebrow: "Neuenburger Tradition", title: "Die Torrée erzählt sich an der Glut.", intro: "Mehr als ein Rezept: eine Begegnung mit Wald, Jahreszeit und Gemeinschaft.", facts: [{ value: "Jura", label: "Wald und Weiden" }, { value: "Glut", label: "Mittelpunkt" }, { value: "Familien", label: "überliefertes Können" }, { value: "Sorgfalt", label: "immer zuerst" }], sections: [{ kicker: "Der Handgriff", title: "Vom Feuer zur langsamen Hitze.", text: "Die Torrée beginnt mit einem kontrollierten Feuer und gart später in der Glut. Methoden unterscheiden sich von Familie zu Familie." }, { kicker: "Der Moment", title: "Zusammenkommen, bevor gegessen wird.", text: "Vorbereiten, warten, erzählen: Der Saucisson verbindet Geselligkeit und Landschaft." }, { kicker: "Verantwortung", title: "Vor jedem Feuer Einschränkungen prüfen.", text: "Bei Trockenheit können Feuer beschränkt oder verboten sein. Kantonale Hinweise beachten und Glut vollständig löschen.", bullets: ["Waldbrandgefahr am selben Tag prüfen", "Wasser bereithalten", "Nichts zurücklassen"] }], note: "Diese Kulturseite ersetzt niemals offizielle Brandschutzanweisungen." },
  locator: { eyebrow: "Hersteller & Verkauf", title: "Neuenburger Saucisson IGP in Ihrer Nähe.", intro: "Neun erfasste Hersteller und vierzehn Verkaufsadressen auf einer interaktiven Karte – mit direktem Zugang zum Google-Eintrag und zur Route.", facts: [{ value: "9", label: "erfasste Hersteller" }, { value: "14", label: "Verkaufsadressen" }, { value: "3", label: "Regionen" }, { value: "04.09.2026", label: "aktualisiert" }], sections: [] },
  pro: { eyebrow: "Für Fachleute", title: "Ein Regionalprodukt, das weiter reisen kann.", intro: "Handel, Gastronomie und Medien brauchen schnelle Informationen, verlässliche Bilder und einen klaren Kontakt.", facts: [{ value: "B2B", label: "eigener Kontakt" }, { value: "FR/DE", label: "Verkaufshilfen" }, { value: "IGP", label: "belegte Argumente" }, { value: "CH", label: "nationale Ambition" }], sections: [{ kicker: "Handel", title: "Eine Geschichte, die am Regal verkauft.", text: "Argumente, Garhinweise, Plakate, Rezepte und QR-Code räumen Kaufhürden aus dem Weg.", bullets: ["Zweisprachige Produktblätter", "POS- und Social-Media-Kit", "Zertifizierte Lieferanten"] }, { kicker: "Gastronomie", title: "Küchen inspirieren.", text: "Formate, Anwendungen und Menüideen öffnen Türen zu Restaurants und Events." }, { kicker: "Medien & Tourismus", title: "Mediathek mit klaren Rechten.", text: "Bilder, Geschichte, belegte Zahlen, Kontakte und Nutzungsbedingungen an einem Ort." }] },
  association: { eyebrow: "Berufsverband", title: "Die ANMB gibt dem Handwerk eine Stimme.", intro: "Der Neuenburger Metzgermeisterverband vereint die Unternehmen der Branche und ist zugleich die offizielle Kontaktorganisation der beiden IGP. Mitgliedschaft und Produktzertifizierung bleiben klar getrennt.", facts: translateFacts([{ value: "1919", label: "Gründung" }, { value: "21", label: "publizierte Aktivmitglieder" }, { value: "2", label: "betreute IGP-Spezialitäten" }, { value: "CNCI", label: "Sekretariat" }]), sections: [{ kicker: "Branche", title: "Metzgereien und Fleischwirtschaft vertreten.", text: "Die ANMB vertritt berufliche Interessen, unterstützt die Ausbildung und verbindet ihre Mitglieder mit kantonalen und nationalen Organisationen." }, { kicker: "Zwei IGP", title: "Das Dossier tragen, nicht selbst zertifizieren.", text: "Die ANMB ist offizielle Kontaktorganisation für den Neuenburger Saucisson IGP und die Neuenburger Saucisse IGP. Ihre Kontrollkommission wirkt bei den sensorischen Prüfungen mit; die unabhängige Zertifizierung erfolgt durch die OIC." }, { kicker: "Klarheit", title: "Drei Listen mit drei Bedeutungen.", text: "ANMB-Mitglieder gehören zum Berufsnetzwerk. IGP-Hersteller erfüllen Pflichtenheft und Zertifizierung, unabhängig davon, ob sie ANMB-Mitglieder sind. Verkaufsstellen sind Adressen für den Einkauf. Ein Betrieb kann in mehreren Listen erscheinen, doch sie sind nicht gleichbedeutend." }] },
  members: { eyebrow: "Verband · Berufsnetzwerk", title: "Von der ANMB publizierte Mitglieder.", intro: "Diese Seite gibt das öffentliche Verbandsverzeichnis wieder, ohne es mit der Liste der IGP-zertifizierten Hersteller gleichzusetzen. Mitgliedschaft belegt keine Zertifizierung; ein zertifizierter Hersteller kann auch Nichtmitglied sein.", facts: [{ value: "21", label: "angezeigte Organisationen" }, { value: "7", label: "angekündigte Veteranen" }, { value: "4", label: "statutarische Kategorien" }, { value: "≠ IGP", label: "Mitgliedschaft und Zertifizierung" }], sections: [], note: "Nach Organisationen zusammengefasste Liste der öffentlichen ANMB-Seite « Aktivmitglieder », eingesehen am 4. September 2026. Sie zeigt den publizierten Stand der bisherigen Website, ersetzt aber nicht das aktuelle administrative Mitgliederregister. Filialen werden nicht als eigene Mitglieder gezählt." },
  committee: { eyebrow: "Verband · Führung", title: "Der Vorstand der ANMB.", intro: "Der Vorstand führt den Berufsverband. Die operative Betreuung der beiden IGP und die Zertifizierung werden getrennt dargestellt, damit jede Verantwortung verständlich bleibt.", facts: [{ value: "7", label: "veröffentlichte Mitglieder" }, { value: "1", label: "Präsident" }, { value: "NE", label: "kantonale Vertretung" }, { value: "2026", label: "Bestätigung nötig" }], sections: [], note: "Zusammensetzung gemäss der am 4. September 2026 eingesehenen ANMB-Website. Funktionen und Mandate sind vor dem offiziellen Start zu bestätigen." },
  partners: { eyebrow: "Verband · Netzwerk", title: "Partner und Referenzorganisationen.", intro: "Die Berufspartner der ANMB werden klar von den Institutionen getrennt, die das Produkt schützen, zertifizieren, dokumentieren oder bekannt machen.", facts: [{ value: "3", label: "veröffentlichte ANMB-Partner" }, { value: "3", label: "IGP-Institutionen" }, { value: "3", label: "Kulinarik-Referenzen" }, { value: "3", label: "Reichweitenpartner" }], sections: [] },
};

export const pages: Record<Lang, Record<PageKey, DetailContent>> = { fr, de };

export function alternateRoute(lang: Lang, key: "home" | PageKey) {
  return routes[lang === "fr" ? "de" : "fr"][key];
}
