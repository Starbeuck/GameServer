# Principe de mise en oeuvre de la solution

Pour ce projet, nous avons créé un serveur hébergeant les jeux Morpion et Puissance 4. Ce serveur est réalisé en Node.js. Il est accessible sur le localhost:1234.
Ces jeux sont accessibles à partir du localhost:8080. Une fois avoir choisi l'un des deux jeux, le joueur joue contre une IA Ces deux jeux sont réalisés en javascript.

# Règles d'architecture

Faustine Solenn TODO

# Modèle statique

* Objets

1. Action.js représente l'action joué par le joueur ou l'IA avec
	1.1. Coordonnée x et y de la position jouée
	1.2. Joueur actuel
2. Game.js représente l'état du jeu avec :
	2.1. Type de jeu
	2.2. Id du jeu
	2.3. Grille du jeu
	2.3. Vainqueur du jeu
	
* Package

Un package Morpion, un package Puissance 4 et un package image qui contient toutes les images du projet

* Package Morpion et Puissance 4

1. Logic.js : contient toutes les fonctions de logique des jeux c'est-à-dire celles qui calculent si un joueur a gagné et celles pour poser le pion dans le jeu.
2. game.js : contient toutes les fonctions pour afficher l'état du jeu au joueur
3. index_{morpion/puissance4}.html : contient le code html associé au jeu
4. index_{morpion/puissance4}.css : contient le code css associé au jeu
5. bundle_{morpion/puissance4}_game.js : généré par gulp et équivalent à game.js pour que le bowser puisse le lire

# Modèle dynamique

Quand un joueur joue, il clique sur la case (pour le Morpion) ou la colonne (pour le Puissance 4) où il souhaite jouer. Un objet Game qui contient l'état actuel du jeu et un objet Action contenant l'action que le joueur souhaite jouer sont envoyés en requête POST au serveur. Ce dernier reçoit la requête avec son contenu. Le serveur appelle ensuite la fonction play() du fichier logic.js pourque l'action du joueur soit effective si cela est possible. Ensuite, l'IA joue si elle peut encore jouer. A chaque requête, nous effectuons également une vérification pour savoir si le joueur ou l'IA a gagné. Dans ce cas, nous modifions l'attribut Game.winner. Enfin, après avoir fait tout cela, nous renvoyons au front un objet Game avec les actions jouées par le joueur et/ou l'IA. Le front reçoit l'objet Game et appelle la fonction draw() afin de pouvoir dessiner le nouvel état du jeu.

# Explication de la prise en compte des contraintes d'analyse

???

# Cadre de production
Pour développer notre GameServer, nous avons développé sur des IDE comme Atom, Brackets ou encore SublimeText.
