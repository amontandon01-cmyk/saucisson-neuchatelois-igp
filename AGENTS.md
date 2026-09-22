# Site des deux IGP — règles de travail

- GitHub est la source officielle. Toute modification part d’une branche dédiée et doit produire un avant/après explicite.
- Préserver les deux dénominations protégées, les sources, les droits médias et la séparation entre fabricants certifiés et points de vente.
- Exécuter `npm run check` avant livraison : lint, export de production et export de préproduction.
- Aucun push de code ordinaire ne publie le site. Une publication part uniquement d’une demande interne explicite gérée par l’assistant (`deploy/preprod-request.txt` ou `deploy/production-request.txt`) ; `workflow_dispatch` reste un secours opérateur.
- Une modification est d’abord publiée sous `/preprod/`, qui doit rester `noindex`. La production n’est autorisée qu’après validation explicite de cette préproduction.
- La validation de l’utilisateur est visuelle et conversationnelle : il dit simplement que la préproduction est validée et demande la mise en production. Ne jamais lui demander de SHA, de mot de confirmation technique ni de manipulation GitHub.
- Le workflow de production lit automatiquement la version servie en préproduction depuis la demande interne, puis refuse tout écart de source autre que ce fichier de contrôle. Ne jamais reconstruire une autre révision entre les deux étapes.
- Ne jamais contourner la vérification de branche, de SHA ou de manifeste `release.json`.
- Un retour arrière normal se fait avec `git revert`, puis repasse par la préproduction et une nouvelle validation.
- Ne pas modifier les domaines, les DNS, les e-mails, les protections GitHub ou la configuration Pages sans demande explicite.
