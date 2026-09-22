# Les deux IGP neuchâteloises

Site officiel bilingue de référence pour le **Saucisson neuchâtelois IGP** et la **Saucisse neuchâteloise IGP**. L’ANMB est présentée comme groupement officiel des deux dénominations ; la certification indépendante reste attribuée à l’OIC.

Le site est une exportation statique Next.js, sans base de données, service d’analyse, carte embarquée ni dépendance de contenu à l’exécution.

## Démarrer

Prérequis : Node.js 22.13 ou plus récent.

```bash
npm ci
npm run dev
```

Vérification complète :

```bash
npm run check
```

`npm run check` contrôle le code, reconstruit successivement la production et la préproduction, puis vérifie les routes, les deux langues, les noms protégés, les certificats OIC, les liens internes, les métadonnées, les données structurées et les garde-fous d’indexation.

## Architecture éditoriale

- `content/site.ts` : routes, métadonnées et textes de pages transversales ;
- `data/products.ts` : identité des deux produits et faits communs ;
- `data/manufacturers.ts` : fabricants certifiés, certificats et points de vente liés ;
- `data/association.ts` : ANMB et comité publié ;
- `data/recipes.ts` : idées externes attribuées et futur modèle de recette hébergée ;
- `data/news.ts` et `data/events.ts` : actualités sourcées et agenda ;
- `data/sources.ts` : URLs primaires centralisées ;
- `components/` : composants par domaine ;
- `app/(fr)` et `app/(de)` : arbres de routes avec vrais attributs `lang` ;
- `docs/` : preuves, droits médias et liste de validation avant lancement.

Les deux noms protégés ne sont jamais traduits :

- Saucisson neuchâtelois IGP
- Saucisse neuchâteloise IGP

## Routes principales

| Français | Deutsch |
| --- | --- |
| `/` | `/de` |
| `/le-produit` | `/de/die-zwei-igp` |
| `/saucisson-neuchatelois-igp` | `/de/saucisson-neuchatelois-igp` |
| `/saucisse-neuchateloise-igp` | `/de/saucisse-neuchateloise-igp` |
| `/cuisson` | `/de/zubereitung` |
| `/recettes` | `/de/rezepte` |
| `/torree` | `/de/torree` |
| `/ou-acheter` | `/de/verkaufsstellen` |
| `/fabricants/[slug]` | `/de/hersteller/[slug]` |
| `/professionnels` | `/de/fachleute` |
| `/actualites` | `/de/aktuell` |
| `/anmb/*` | `/de/anmb/*` |

## Publication GitHub Pages

Un push ne publie jamais le site.

- `validate.yml` vérifie chaque branche et pull request ;
- `deploy-preprod.yml` publie manuellement le commit courant de `main` sous `/preprod/`, en conservant la production courante ;
- `deploy-production.yml` refuse automatiquement toute version qui ne correspond pas à celle déjà servie en préproduction. L’utilisateur donne simplement son accord dans la conversation ; il ne saisit ni SHA ni confirmation technique.

| Environnement | URL | Indexation |
| --- | --- | --- |
| Production | `https://amontandon01-cmyk.github.io/saucisson-neuchatelois-igp/` | autorisée |
| Préproduction | `https://amontandon01-cmyk.github.io/saucisson-neuchatelois-igp/preprod/` | `noindex, nofollow` sur chaque page |

La procédure complète, les contrôles automatiques de version et le retour arrière sont documentés dans `docs/DEPLOYMENT.md`.

```bash
npm test
npm run test:preprod
```

## Règles de contribution

1. Ne jamais traduire ni simplifier les deux dénominations protégées.
2. Ajouter toute affirmation sensible dans `data/` avec sa source et sa date de vérification.
3. Ne pas assimiler un point de vente à un fabricant certifié.
4. Ne publier une recette complète qu’après validation culinaire et confirmation des droits d’image.
5. Ne publier un événement qu’avec une source officielle datée.
6. Vérifier `docs/LAUNCH-CHECKLIST.md` avant une mise en production institutionnelle.

Les sources de référence et le statut précis des médias sont documentés dans `docs/SOURCES.md` et `docs/MEDIA-RIGHTS.md`.
