# Validation avant lancement officiel

La branche peut être compilée et testée sans ces validations. Elles restent nécessaires avant de présenter le site comme publication institutionnelle définitive.

## Validation ANMB

- [ ] Confirmer que l’ANMB souhaite être nommée « groupement officiel » dans les deux langues.
- [ ] Confirmer les coordonnées du secrétariat, en particulier l’adresse e-mail nominative publiée.
- [ ] Valider la traduction allemande complète par une personne de langue maternelle.
- [ ] Confirmer la composition du comité le jour du lancement.
- [ ] Décider si une personne doit être présentée comme référent ou coordinateur des deux IGP ; fournir alors le titre exact et une source publiable.
- [ ] Valider la distinction éditoriale entre adhésion ANMB, fabricant certifié et point de vente.

## Annuaire et certification

- [ ] Revérifier les neuf certificats dans l’annuaire OIC et leurs dates de validité.
- [ ] Confirmer avec chaque fabricant ses points de vente, son site web et le nom commercial à afficher.
- [ ] Définir une fréquence et un responsable de revue de l’annuaire.
- [ ] N’ajouter des revendeurs externes qu’avec une source datée ou l’accord écrit du revendeur.

## Contenu

- [ ] Faire relire les pages produit par l’ANMB et, si nécessaire, l’OIC.
- [ ] Faire valider la formulation de cuisson ; conserver l’étiquette comme consigne prioritaire.
- [ ] Faire relire la page torrée et son avertissement incendie.
- [ ] Valider toute recette complète avant publication ; tester quantités, étapes, portions et sécurité alimentaire.
- [ ] Définir un processus de publication des actualités et événements avec source obligatoire.

## Médias et identité

- [ ] Obtenir les autorisations listées dans `MEDIA-RIGHTS.md`.
- [ ] Confirmer la conformité du logo IGP et de son espace de protection.
- [ ] Confirmer l’usage des marques ANMB.
- [ ] Remplacer idéalement l’image Unsplash par une torrée neuchâteloise documentée.
- [ ] Préparer une image sociale validée de 1200 × 630 px ; ajuster ensuite les dimensions Open Graph.

## Technique, accessibilité et SEO

- [ ] Configurer le domaine définitif dans `NEXT_PUBLIC_SITE_URL` et le chemin dans `NEXT_PUBLIC_BASE_PATH`.
- [ ] Vérifier les URL canoniques, `hreflang`, `robots.txt` et `sitemap.xml` sur l’hébergement final.
- [ ] Tester clavier, lecteur d’écran et zoom à 200 % sur les gabarits principaux.
- [ ] Tester le menu mobile sur iOS Safari et Android Chrome.
- [ ] Mesurer Core Web Vitals et corriger toute régression significative.
- [ ] Vérifier la politique de confidentialité par rapport à l’hébergeur et aux services réellement activés.
- [ ] Exécuter `npm ci` et `npm run check` sur le commit de lancement.
- [ ] Publier la version en préproduction et faire valider son rendu avant toute production ; le workflow garantit automatiquement que la même version sera promue.

## Exploitation

- [ ] Nommer un propriétaire éditorial et un propriétaire technique.
- [ ] Prévoir une revue trimestrielle des liens externes.
- [ ] Prévoir une revue des certificats avant chaque échéance OIC.
- [ ] Documenter le canal de correction rapide en cas d’information erronée.
