# Site des deux IGP — règles de travail

- GitHub est la source officielle. Toute modification part d’une branche dédiée et doit produire un avant/après explicite.
- Préserver les deux dénominations protégées, les sources, les droits médias et la séparation entre fabricants certifiés et points de vente.
- Exécuter `npm run check` avant livraison : lint, export de production et export de préproduction.
- Aucun push ne publie le site. Les deux publications sont des actions manuelles lancées depuis `main`.
- Une modification est d’abord publiée sous `/preprod/`, qui doit rester `noindex`. La production n’est autorisée qu’après validation explicite de cette préproduction.
- La production doit reprendre exactement le SHA complet contrôlé en préproduction. Ne jamais reconstruire une autre révision entre les deux étapes.
- Ne jamais contourner la vérification de branche, de SHA ou de manifeste `release.json`.
- Un retour arrière normal se fait avec `git revert`, puis repasse par la préproduction et une nouvelle validation.
- Ne pas modifier les domaines, les DNS, les e-mails, les protections GitHub ou la configuration Pages sans demande explicite.
