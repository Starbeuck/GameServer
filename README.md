# GameServer

Projet d'intégration de deux jeux (Morpion et Puissance 4) avec IA dans un serveur.

Made by Sophy BRUNOY, Hugues CONNAN, Faustine GODBILLOT, Louis BOUREAU et Solenn KEROULLAS, ESIR2 - Systèmes d'Information.

# Qu'est-ce que GameServer ?

Il s'agit d'une plateforme de jeux comprenant un Morpion et un Puissance 4, où le joueur se mesure à une IA (Intelligence Artificielle). L'objectif pour les développeurs était surtout le développement de cette IA, plus que la réalisation des jeux. Pour ce faire, les algorithmes utilisées ont été celui du MinMax et du Alpha Beta Pruning.

## Fonctionnalités supportées
Sur cette plateforme, il est possible de joueur soit au Morpion, soit au Puissance 4. Une fois avoir sélectionné le jeu, le joueur joue tout seul contre l'ordinateur.

## Fonctionnalités à développer
La première fonctionnalité à développer est le mode 2 joueurs sur 2 machines différentes. La deuxième et dernière fonctionnalité à développer est de proposer à l'utilisateur 3 niveaux (facile, moyen et difficile) de difficulté de l'IA.

# Solution proposée
Pour répondre à ce besoin, nous avons choisi de créer un serveur, qui est chargé de gérer l'IA et ses calculs, ainsi que les différentes routes au sein de notre GameServer. Concernant la partie front-end, nous avons une page par jeu, qui récupère l'évènement du joueur (un clic etc.) et qui l'envoie au serveur, avant de recevoir la réponse de l'IA.

# Déploiement du GameServer
L'un des objectifs était de pouvoir déployer notre GameServer sur une machine virtuelle de l'Université afin de pouvoir présenter l'application lors des portes ouvertes de l'école. Il était donc primordial que le GameServer puisse se déployer rapidement sur toute machine virtuelle, indépendamment de celle-ci.

## Lancer le server de jeu pour jouer

Une fois le repo git clone sur une VM, merci de lancer le script ScriptLaunchGameServer. Une fois terminé, le site sera disponible sur Google Chrome à l'adresse suivante : VMHOST:8080.

## Lancer le server en tant que développeur
* Dans une console :
```
gulp
```
Ouvrir ```localhost:8080 ``` pour visualiser le front-end. Le back-end est requêtable a l'adresse ``` localhost:1234 ```

# Annexes
* Algorithme MinMax

1. https://en.wikipedia.org/wiki/Minimax
2. https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37

* Alpha Beta Pruning
1. https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning

# Crédits
https://codepen.io/defeo/pen/emPevV
https://github.com/Gimu/connect-four-js
