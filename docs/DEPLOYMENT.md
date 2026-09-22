# Préproduction, production et retour arrière

## Principe

Le dépôt suit le même fonctionnement prudent que les autres sites d’Arthur :

1. travail sur une branche dédiée ;
2. contrôles automatiques ;
3. intégration du candidat dans `main`, sans publication automatique ;
4. publication manuelle en préproduction ;
5. validation humaine du contenu, du mobile et de l’ordinateur ;
6. accord conversationnel de l’utilisateur — « validé, mets en production » — puis publication manuelle de la même version.

`main` représente la source candidate. Il ne représente pas automatiquement la version publique.

Les identifiants de commit et les manipulations GitHub restent à la charge de l’opérateur technique. L’utilisateur ne saisit aucun SHA, aucun mot de confirmation et ne lance aucun workflow.

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

L’opérateur technique ouvre **Actions → Déployer en préproduction**, choisit `main`, lance le workflow et attend les vérifications après publication. Il transmet ensuite l’URL de préproduction à l’utilisateur.

L’utilisateur contrôle au minimum :

   - accueil français et allemand ;
   - pages des deux produits ;
   - annuaire et profils ;
   - navigation clavier et menu mobile ;
   - affichage téléphone, tablette et ordinateur ;
   - liens externes et mentions de source.

Le workflow inscrit automatiquement l’identifiant technique dans `/preprod/release.json`. Il sert à garantir la continuité entre préproduction et production, sans intervention de l’utilisateur.

La première publication utilise `deploy/production-baseline.txt` pour identifier la production historique. Dès que le nouveau système a publié un `release.json` en production, ce manifeste devient automatiquement la référence.

## Déployer en production

Après contrôle de la préproduction, l’utilisateur dit simplement « validé, mets en production ». L’opérateur technique lance alors **Déployer en production** sur `main` ; le formulaire ne demande aucune saisie.

Le workflow refuse la publication si :

- la branche n’est pas `main` ;
- le commit courant n’est pas exactement celui actuellement servi en préproduction ;
- les contrôles ou le build échouent.

Après publication, le workflow relit les deux `release.json`, les directives d’indexation et les pages d’accueil réellement servies.

## Retour arrière

Voie normale :

1. identifier le changement fautif et la dernière version stable ;
2. créer un `git revert` sur une branche dédiée — jamais de `reset --hard` ni de push forcé sur `main` ;
3. intégrer le revert dans `main` ;
4. republier en préproduction ;
5. valider ;
6. republier en production ; le contrôle de version du revert reste automatique.

Le retour arrière ne contourne donc jamais la préproduction.

## État au moment de la mise en place

- production publique de référence : `7de86e5ecba06799236c9490f48669be06d074c9` ;
- refonte : branche `feat/two-igp-reference-site` ;
- aucune publication automatique sur push après intégration de ces workflows.
