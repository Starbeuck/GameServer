function Joueur (){
    this.nom = "";
    this.prenom = "";
    this.bateau = [];
    this.coups = 0;
}

function GenererNouveauxJoueurs(joueur1, joueur2){
    var reponse=false;
    while (reponse == false){
        var prenom = prompt("Joueur 1: Entrez votre prenom");
        if (prenom == null){
            alert("Veuillez entrer quelquechose...");
            reponse = false;
        }
        else if (prenom == ""){
            alert("Veuillez entrer quelquechose...");
            reponse = false;
        }
        else{
            joueur1.prenom = prenom;
            reponse = true;
        }
    }
    reponse = false;
    while (reponse == false){
        var nom = prompt("Joueur 1: Entrez votre nom");
        if (nom == null){
            alert("Veuillez entrer quelquechose...");
            reponse = false;
        }
        else if (nom == ""){
            alert("Veuillez entrer quelquechose...");
            reponse = false;
        }
        else{
            joueur1.nom = nom;
            reponse = true;
        }
    }
    reponse = false;
    while (reponse == false){
        var prenom = prompt("Joueur 1: Entrez le prenom de votre adversaire:");
        if (prenom == null){
            alert("Veuillez entrer quelquechose...");
            reponse = false;
        }
        else if (prenom == ""){
            alert("Veuillez entrer quelquechose...");
            reponse = false;
        }
        else{
            joueur2.prenom = prenom;
            reponse = true;
        }
    }
    reponse = false;
    while (reponse == false){
        var nom = prompt("Joueur 1: Entrez le nom de votre adversaire:");
        if (nom == null){
            alert("Veuillez entrer quelquechose...");
            reponse = false;
        }
        else if (nom == ""){
            alert("Veuillez entrer quelquechose...");
            reponse = false;
        }
        else{
            joueur2.nom = nom;
            reponse = true;
        }
    }

    joueur1.bateau = GenererBateauDepart();
    joueur2.bateau = GenererBateauDepart();
}