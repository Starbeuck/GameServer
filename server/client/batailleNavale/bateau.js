function Bateau(type){
    if (type == "torpilleur"){
        this.typeB = "torpilleur";
        this.longueur = 2;
        this.casePrises = [];
        this.casesDetruites = [];
        this.etat = "Vie";
    }
    else if (type == "sous-marin"){
        this.typeB = "sous-marin";
        this.longueur = 3;
        this.casePrises = [];
        this.casesDetruites = [];
        this.etat = "Vie";
    }
    else if (type == "croiseur"){
        this.typeB = "croiseur";
        this.longueur = 4;
        this.casePrises = [];
        this.casesDetruites = [];
        this.etat = "Vie";
    }
    else if (type == "porte-avion"){
        this.typeB = "porte-avion";
        this.longueur = 5;
        this.casePrises = [];
        this.casesDetruites = [];
        this.etat = "Vie";
    }
}

function GenererBateauDepart(){
    var torpilleur = new Bateau("torpilleur");
    var sousMarinA = new Bateau("sous-marin");
    sousMarinA.typeB="sous-marin1";
    var sousMarinB = new Bateau("sous-marin");
    sousMarinB.typeB="sous-marin2";
    var croiseur = new Bateau("croiseur");
    var porteavion = new Bateau("porte-avion");
    var bateaux = [torpilleur, sousMarinA, sousMarinB, croiseur, porteavion];
    return bateaux;
}

function PlacerLesBateaux(joueur){
    for (var i=0; i<joueur.bateau.length; i++){
        DefinirCasesOccupe(joueur.bateau[i]);
    }
}

function BateauTouche(joueurVictime, casetire){
    var test=0;
    if (VerifierQueLaCaseNesPasDejaTire(casetire)){
        alert("Plouf !");
    }
    else{
        for (var i =0; i<joueurVictime.bateau.length; i++)
        {
            var navire = joueurVictime.bateau[i];
            for (var k= 0; k<navire.casePrises.length; k++)
            {
                var coord = navire.casePrises[k];
                if (casetire == coord){
                    casesTireEffectuer.push(casetire);
                    navire.casesDetruites.push(casetire);
                    if(BateauCoule(navire.casePrises, navire.casesDetruites) == true){
                        navire.etat ="Coulé";
                        alert(navire.typeB+" touché - coulé !");
                        test=1;
                    }
                    else{
                        alert(navire.typeB+" touché !");
                        test=1;
                    }
                }
            }
        }
        if (test == 0){
            casesTireEffectuer.push(casetire);
            alert("Plouf !");
        }
    }
}

function BateauCoule(tabCaseTouche, tabCaseDetruite){
    if (tabCaseTouche.length == tabCaseDetruite.length){
        tabCaseTouche.sort();
        tabCaseDetruite.sort();
        for (var i=0; i<tabCaseTouche.length; i++){
            if(tabCaseTouche[i] != tabCaseDetruite[i]){
                return false;
            }

        }
        return true;
    }
    return false;
}

function VerifierSiBateauxRestant(joueurVictime){
    for (var i = 0; i < joueurVictime.bateau.length; i++){
        if (joueurVictime.bateau[i].etat == "Vie"){
            return true;
        }
    }
    return false;
}