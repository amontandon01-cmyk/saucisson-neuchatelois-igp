# Saucisson neuchâtelois IGP

Site bilingue du Saucisson neuchâtelois IGP et de l’ANMB.

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
| `/anmb/comite` | `/de/anmb/vorstand` | Comité et gouvernance |
| `/anmb/reseau` | `/de/anmb/netzwerk` | Partenaires et organismes de référence |

## Développement et publication GitHub Pages

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

Chaque envoi sur la branche `main` déclenche le workflow `.github/workflows/deploy-pages.yml`. Une fois GitHub Pages activé avec la source **GitHub Actions**, le site est publié à l’adresse :

`https://amontandon01-cmyk.github.io/saucisson-neuchatelois-igp/`

## Mise à jour des contenus

- Les textes et routes se trouvent dans `app/content.ts`.
- Les producteurs et points de vente se trouvent dans `app/locations.ts`.
- La structure des pages se trouve dans `app/site.tsx`.
- L’identité visuelle et l’affichage mobile se trouvent dans `app/globals.css`.
- Les ressources visuelles se trouvent dans `public/`.

Avant la publication publique, l’ANMB doit valider la liste des producteurs et revendeurs, les coordonnées de contact, les traductions allemandes et tout visuel photographique officiel.

## Sources éditoriales principales

- [Patrimoine culinaire suisse](https://www.patrimoineculinaire.ch/Produit/Saucisson-neuchatelois-IGP-saucisse-neuchateloise-IGP/29)
- [AOP-IGP Suisse](https://www.aop-igp.ch/fr/au-sujet-des-aop-igp/index.php?id=303&L=2)
- [Cahier des charges du Saucisson neuchâtelois IGP](https://www.aop-igp.ch/fileadmin/Dokumente/kampagne2025/Pflichtenhefte/SNE/Pflichtenheft%20FR%20Saucisson%20neuchatelois%20IGP.pdf)
- [Galerie officielle du Saucisson neuchâtelois IGP](https://www.aop-igp.ch/fr/saucisson-neuchatelois-igp/images-saucisson-neuchatelois-igp)
- [Première Sélection du Saucisson neuchâtelois IGP 2026](https://cnci.ch/premiere-selection-du-saucisson-neuchatelois-igp)

Le visuel d’ambiance de la torrée est une photographie réelle de feu en forêt par [Rasmus sur Unsplash](https://unsplash.com/photos/campfire-burning-with-smoke-in-a-forest-setting-Z38mI0BC8g4), utilisée selon la [licence Unsplash](https://unsplash.com/license). Il ne présente pas une torrée documentaire et devra idéalement être remplacé par une photographie neuchâteloise dont l’ANMB possède les droits.

Les photographies du produit et du territoire proviennent de la galerie de l’Association suisse des AOP-IGP. Les fichiers HD et le droit de republication doivent être confirmés avant le lancement officiel. La carte utilise les données © contributeurs OpenStreetMap sous licence ODbL. Les boutons Google reposent sur les URL universelles Google Maps sans clé API.

## Identité officielle

- `public/logo-igp-officiel.png` : couleurs du logo IGP officiel et masque de transparence dérivé de la version vectorielle fournie sur la [page Corporate Design de l’Association suisse des AOP-IGP](https://www.aop-igp.ch/fr/a-notre-sujet/communication-et-rp/corporate-design). Le blanc des lettres et de la croix suisse est conservé ; seul le pourtour est transparent.
- `public/logo-anmb-boucherie.png` et `public/logo-anmb-signature.png` : versions PNG des fichiers utilisés par le [site officiel de l’ANMB](https://www.boucheries-neuchatel.ch/), pour assurer un affichage fiable sur GitHub Pages. Le logo circulaire reste intact et repose sur un disque vert foncé cerclé d’or afin que son lettrage blanc demeure lisible sur tous les fonds.

Ces fichiers sont conservés sans redessin. Leur utilisation publique définitive reste soumise aux droits et validations des organisations concernées.
