# Préproduction, production et retour arrière

## Principe

Le dépôt suit le même fonctionnement prudent que les autres sites d’Arthur :

1. travail sur une branche dédiée ;
2. contrôles automatiques ;
3. intégration du candidat dans `main`, sans publication automatique ;
4. publication manuelle en préproduction ;
5. validation humaine du contenu, du mobile et de l’ordinateur ;
6. publication manuelle en production du **même SHA complet**.

`main` représente la source candidate. Il ne représente pas automatiquement la version publique.

## Particularité de GitHub Pages

GitHub Pages ne propose pas encore de prévisualisation publique séparée utilisable ici : l’option `preview` de l’action officielle est annoncée comme alpha et non disponible au public. Le dépôt conserve donc les deux environnements dans un même paquet Pages :

- production : `https://amontandon01-cmyk.github.io/saucisson-neuchatelois-igp/` ;
- préproduction : `https://amontandon01-cmyk.github.io/saucisson-neuchatelois-igp/preprod/`.

Lors d’une publication en préproduction, le workflow reconstruit la production depuis le SHA actuellement publié et la remet à l’identique à la racine. Seul le sous-dossier `/preprod/` reçoit le nouveau candidat.

La préproduction est publique à toute personne qui connaît son URL. GitHub Pages ne fournit pas d’authentification pour ce cas. Elle comporte cependant `noindex, nofollow` sur chaque page et aucun sitemap. Son fichier `robots.txt` local interdit aussi l’exploration, mais la protection décisive reste la balise `noindex` de chaque page, car les robots ne reconnaissent officiellement qu’un `robots.txt` placé à la racine du nom d’hôte. Si une préproduction confidentielle devient nécessaire, il faudra choisir un hébergement avec authentification.

Référence technique : [action officielle GitHub Pages](https://github.com/actions/deploy-pages#inputs-).

## Contrôles automatiques

Le workflow **Vérifier le site** s’exécute sur les pushes et les pull requests. Il lance :

- ESLint ;
- l’export de production ;
- l’export de préproduction ;
- les 15 contrôles éditoriaux et structurels ;
- les contrôles propres aux environnements ;
- la vérification du `noindex`, des URL canoniques et du manifeste de version.

Commande locale équivalente :

```bash
npm ci
npm run check
```

## Déployer en préproduction

Prérequis : le candidat à examiner est le commit courant de `main`. Sa présence dans `main` ne modifie pas le site public.

1. Ouvrir **Actions → Déployer en préproduction**.
2. Choisir la branche `main`.
3. Lancer le workflow.
4. Attendre les vérifications après publication.
5. Ouvrir l’URL de préproduction et contrôler au minimum :
   - accueil français et allemand ;
   - pages des deux produits ;
   - annuaire et profils ;
   - navigation clavier et menu mobile ;
   - affichage téléphone, tablette et ordinateur ;
   - liens externes et mentions de source.
6. Noter le SHA complet affiché dans le résumé et dans `/preprod/release.json`.

La première publication utilise `deploy/production-baseline.txt` pour identifier la production historique. Dès que le nouveau système a publié un `release.json` en production, ce manifeste devient automatiquement la référence.

## Déployer en production

Lancer **Déployer en production** sur `main` uniquement après accord explicite sur la préproduction.

Le formulaire exige :

- `confirmation` : saisir exactement `PRODUCTION` ;
- `validated_sha` : coller le SHA complet validé.

Le workflow refuse la publication si :

- la branche n’est pas `main` ;
- la confirmation diffère ;
- le SHA saisi n’est pas le commit courant ;
- ce SHA n’est pas celui actuellement servi en préproduction ;
- les contrôles ou le build échouent.

Après publication, le workflow relit les deux `release.json`, les directives d’indexation et les pages d’accueil réellement servies.

## Retour arrière

Voie normale :

1. identifier le changement fautif et le dernier SHA stable ;
2. créer un `git revert` sur une branche dédiée — jamais de `reset --hard` ni de push forcé sur `main` ;
3. intégrer le revert dans `main` ;
4. republier en préproduction ;
5. valider ;
6. republier en production avec le nouveau SHA du revert.

Le retour arrière ne contourne donc jamais la préproduction.

## État au moment de la mise en place

- production publique de référence : `7de86e5ecba06799236c9490f48669be06d074c9` ;
- refonte : branche `feat/two-igp-reference-site` ;
- aucune publication automatique sur push après intégration de ces workflows.
