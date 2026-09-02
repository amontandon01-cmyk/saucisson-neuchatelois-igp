# Saucisson neuchâtelois IGP

Prototype bilingue du futur site public du Saucisson neuchâtelois IGP et de l’ANMB.

## Objectifs

- expliquer clairement le produit et la valeur de l’IGP ;
- donner une méthode de cuisson fiable et des idées de recettes ;
- faire vivre la torrée sans négliger les règles de sécurité ;
- réunir les producteurs et points de vente dans un annuaire validé ;
- proposer une entrée distincte pour le commerce, la gastronomie et les médias ;
- atteindre la Suisse alémanique avec de vraies pages allemandes et des URL propres.

## Architecture publique

| Français | Deutsch | Rôle |
| --- | --- | --- |
| `/` | `/de` | Accueil et orientation |
| `/le-produit` | `/de/das-produkt` | Origine, fabrication, IGP |
| `/cuisson` | `/de/zubereitung` | Mode d’emploi |
| `/recettes` | `/de/rezepte` | Inspiration culinaire |
| `/torree` | `/de/torree` | Tradition et sécurité |
| `/ou-acheter` | `/de/verkaufsstellen` | Annuaire validé |
| `/professionnels` | `/de/fachhandel` | Commerce, gastronomie, presse |
| `/anmb` | `/de/anmb` | Association professionnelle |

## Développement

Prérequis : Node.js 22.13 ou plus récent.

```bash
npm run install:ci
npm run dev
```

Contrôles avant publication :

```bash
npm run lint
npm test
```

## Mise à jour des contenus

- Les textes et routes se trouvent dans `app/content.ts`.
- La structure des pages se trouve dans `app/site.tsx`.
- L’identité visuelle et l’affichage mobile se trouvent dans `app/globals.css`.
- Le visuel principal se trouve dans `public/torree-hero.webp`.

Avant la publication publique, l’ANMB doit valider la liste des producteurs et revendeurs, les coordonnées de contact, les traductions allemandes et tout visuel photographique officiel.

## Sources éditoriales principales

- [Patrimoine culinaire suisse](https://www.patrimoineculinaire.ch/Produit/Saucisson-neuchatelois-IGP-saucisse-neuchateloise-IGP/29)
- [AOP-IGP Suisse](https://www.aop-igp.ch/fr/au-sujet-des-aop-igp/index.php?id=303&L=2)
- [Cahier des charges du Saucisson neuchâtelois IGP](https://www.aop-igp.ch/fileadmin/Dokumente/kampagne2025/Pflichtenhefte/SNE/Pflichtenheft%20FR%20Saucisson%20neuchatelois%20IGP.pdf)

Le visuel de torrée est une création originale destinée au prototype ; il ne reprend pas la photographie de presse de *24 heures*.

## Identité officielle

- `public/logo-igp-officiel.jpg` : logo IGP officiel téléchargé depuis la [page Corporate Design de l’Association suisse des AOP-IGP](https://www.aop-igp.ch/fr/a-notre-sujet/communication-et-rp/corporate-design).
- `public/logo-anmb-boucherie.svg` et `public/logo-anmb-signature.svg` : fichiers utilisés par le [site officiel de l’ANMB](https://www.boucheries-neuchatel.ch/).

Ces fichiers sont conservés sans redessin. Leur utilisation publique définitive reste soumise aux droits et validations des organisations concernées.
