var tableauLettre = ["A","B","C","D","E","F","G","H","I","J"];
var tableauChiffre = ["1","2","3","4","5","6","7","8","9"];
var casesTireEffectuer = [];
var casesPrisesGrilles=[];

function RAZHistoriqueCases(){
    casesPrisesGrilles = [];
    casesTireEffectuer = [];
}

function DefinirCasesOccupe(bateau){
    var valide = false;
    while (valide == false){
        var chaineCases =prompt("Veuillez saisir les cases occupées par votre "+bateau.typeB+" en séparant les cases par des ; (longeur: "+bateau.longueur+" cases)").toUpperCase();
        var tabCases = chaineCases.split(";");

        if (VerifierAlignementEtAdjacent(tabCases) == false){
            alert("Vous devez aligner verticalement (même chiffre) ou horizontalement (même lettre) vos coordonnées ou avec des chiffres consécutifs ou des lettres consécutives");
            valide = false;
        }

        else if (VerifierCaseLibre(tabCases) == false){
            alert("Attention ces cases sont occupées");
            valide = false;
        }

        else if ((VerifierEnsembleDesCoordonnesSaisies(tabCases)) && (tabCases.length == bateau.longueur)){
            bateau.casePrises=tabCases;
            AjouterCasesAListeCasesPrises(tabCases);
            alert("La position de votre "+bateau.typeB+" est bien enregistrée");
            valide = true;
        }
        else if((VerifierEnsembleDesCoordonnesSaisies(tabCases) == false) && (tabCases.length == bateau.longueur)){
            alert("Vous avez entré de mauvaises coordonnées, les lettres vont de A à J et les chiffres de 1 à 10, une coordonnée s\'écrit sous la forme LettreChiffre (exemple: A1)");
            valide = false;
        }
        else{
            alert ("Attention, vous n'avez pas utilisé le bon nombre de cases ("+bateau.longueur+" cases)");
            valide = false;
        }
    }
}

function VerifierUneLettreCoordonnee(coord){
    for(var i=0; i<tableauLettre.length; i++){
        if(coord.substr(0,1) == tableauLettre[i]){
            return true;
        }
    }
    return false;
}

function VerifierChiffreCoordonnee(coord){
    for (var i=0; i<tableauChiffre.length; i++){
        if (coord.substr(1) == tableauChiffre[i]){
            return true;
        }
    }
    return false;
}

function VerifierCoordonneComplete(coord){
    if (VerifierUneLettreCoordonnee(coord) && VerifierChiffreCoordonnee(coord)){
        return true;
    }
    else{
        return false;
    }
}

function VerifierEnsembleDesCoordonnesSaisies(tableauCoord){
    for (var i= 0; i<tableauCoord.length; i++){
        if (VerifierCoordonneComplete(tableauCoord[i]) == false){
            return false;
        }
    }
    return true;
}

function VerifierCaseLibre(tableauCases){
    for (var i = 0; i<tableauCases.length; i++){
        for (var j =0; j<casesPrisesGrilles.length; j++){
            if (casesPrisesGrilles[j] == tableauCases[i]){
                return false;
            }
        }
    }
    return true;
}

function VerifierAlignementEtAdjacent(tableauCases){
    var phorizontal = true;
    var pvertical = true;
    for (var i = 0; i<tableauCases.length-1; i++){
        var lettre = tableauCases[i].substr(0,1);
        var chiffre = tableauCases[i].substr(1);
        var lettreSuivante = tableauCases[i+1].substr(0,1);
        var chiffreSuivant = tableauCases[i+1].substr(1);
        if (chiffre != chiffreSuivant){
            pvertical = false;
        }
        if (lettre != lettreSuivante){
            phorizontal = false;
        }
    }
    if (pvertical){
        for( var i=0; i<tableauLettre.length; i++){
            if(tableauLettre[i] == tableauCases[0].substr(0,1)){
                var premierLettre = i;
            }
        }
        var vert = true;
        for (var coord in tableauCases){
            var lettreC = tableauCases[coord].substr(0,1);
            if (lettreC != tableauLettre[premierLettre]){
                vert = false;
            }
            premierLettre+=1;
        }

        if (vert){
            return true;
        }
        else{
            return false;
        }
    }
    else if(phorizontal){
        var i = 0;
        var horiz = true;
        var premierChiffre =parseInt(tableauCases[i].substr(1));
        for (i; i<tableauCases.length;i++){
            if (premierChiffre != parseInt(tableauCases[i].substr(1))){
                horiz = false;
            }
            premierChiffre +=1;
        }
        if (horiz){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }

}

function AjouterCasesAListeCasesPrises(tableauCases){
    for (var i=0; i<tableauCases.length; i++){
        casesPrisesGrilles.push(tableauCases[i]);
    }

}

function VerifierQueLaCaseNesPasDejaTire(caseTire){
    for (var i =0; i<casesTireEffectuer.length; i++){
        if (caseTire == casesTireEffectuer[i]){
            return true;
        }
    }
    return false;
}