# Que Faire de mes Déchets

Application web permettant de savoir quoi faire de ses déchets

https://quefairedemesdechets.ademe.fr

## Développement

`cp .env.template .env` pour récupérer les variables d'environnement

`yarn` pour installer l'application

`yarn start` pour lancer l'application sur [http://localhost:3000](http://localhost:3000)

### `pre-commit`

Ce projet utilise l'outil [pre-commit](https://pre-commit.com/hooks.html), populaire dans l'écosystème python.
Il aurait pu utiliser [Husky](https://typicode.github.io/husky/) ou autre outil populaire dans l'écosystème node.js mais `pre-commit` étant déjà utilisé sur [Longue vie aux objets](http://github.com/incubateur-ademe/quefairedemesobjets/), il semblait logique d'uniformiser les outils.

`pip install pre-commit` pour installer la dépendance
`pre-commit install` pour installer les pre-commit hooks

## Déploiement

Hébergement via Netlify. Il suffit de push sur ce repo (branche master) pour déployer.
