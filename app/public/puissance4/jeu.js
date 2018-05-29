//création du plateau de jeu
  plateau= [];
  //nuùéro du joueur qui joue
  turn= 1;


  /* un entier:
     0: la partie continue
     -1: la partie est nulle
     1: joueur 1 a gagné
     2: joueur 2 a gagné
   */
  game_status= 0;
  // Nombre de coups joués
  coups= 0;
  // Nombre de lignes 6
  lines= 4;
  // Nombre de colonnes 7
  columns=4;
  huPlayer="X";
  aiPlayer="I";
  var iter = 0;
  parent=document.querySelector('#jeu');
  var board =[];

  function initBoard(nbcol, nblin){
    var nbcase= 0;
    this.board.length=nbcol*nblin;
    for (var i=0; i<this.board.length; i++){
      this.board[i]=i;
    }

  }
  /*
    Intialise un plateau de jeu de dimensions `lignes` × `colonnes`
    et l'ajoute dans l'élément `parent` du dom.
   */
  function init() {

   /* var name1= prompt("nom du joueur 1");
    joueur1=name1;
    var name2= prompt("nom du joueur2");
    joueur2=name2;
    window.alert(joueur1 +" commence");
*/

//initialisation du board de l'ia
    this.initBoard(this.columns, this.lines);

    //création du plateau de jeu
    t = document.createElement('table');
    t.id = 'plateau';

    for (var i = this.lines - 1; i >= 0; i--) {
      var tr = document.createElement('tr');
      this.plateau[i] = [];
      for (var j = 0; j < this.columns; j++) {
        var td = document.createElement('td');
        td.dataset.column = j;
        tr.appendChild(td);
        this.plateau[i][j] = td;
      }
      t.appendChild(tr);
    }
    this.parent.appendChild(t);

    //lancement au clic
    t.addEventListener('click', function(e) { handler(e); });
  }

  // function auxiliaire d'affichage
   function set(row, column, player) {
    // On colore la case
   // console.log( "ligne"+row+" colonne "+column);
    this.plateau[row][column].className = 'joueur' + player;
    // On compte le coup
    this.coups++;
    // On passe le tour : 3 - 2 = 1, 3 - 1 = 2
    this.turn = 3 - player;
  }

  /* Cette fonction ajoute un pion dans une colonne */
   function play(column) {
    // Vérifier si la partie est encore en cours

    console.log ("joueur à jouer "+(3-this.turn));

    // Trouver la première case libre dans la colonne
    var row;
    for (var i = 0; i < this.lines; i++) {
      if (!this.plateau[i][column].className) {
        row = i;
        break;
      }
    }
    if (row === undefined) {
      window.alert("La colonne est pleine!");
      return;
    }
   if ((this.turn)==1){
    // Effectuer le coup
    this.set(row, column, 1);
      board[row*this.columns+column] = huPlayer;
   //   console.log(board);

  }else{
    var test=getIndex(board);
     var index = minimax(board, aiPlayer).index;


      this.set(parseInt( index/this.columns),(index%this.columns),2);
       board[((index%this.columns)+parseInt( index/this.columns)*this.columns)] = aiPlayer;

 //            console.log(board);
  }
    // Vérifier s'il y a un gagnant, ou si la partie est finie
    if (this.win(row, column, 'joueur' + (3 - this.turn))) {
      this.game_status = 3 - this.turn;
    } else if (this.coups >= this.lines * this.columns) {
      this.game_status = -1;
    }

    //Au cours de l'affichage, pensez eventuellement, à afficher un
    //message si la partie est finie...
    switch (this.game_status) {
      case -1:
        window.alert("Partie Nulle!!");
        break;
      case 1:
        window.alert("Victoire de joueur 1");
        break;
      case 2:
        window.alert("Victoire de joueur2");
        break;
    }
  }


  //le gestionnaire d'événements
 function handler(event) {

    var column = event.target.dataset.column;
   // console.log("colonne "+column);
    //attention, les variables dans les datasets sont TOUJOURS
    //des chaînes de caractère. Si on veut être sûr de ne pas faire de bêtise,
    //il vaut mieux la convertir en entier avec parseInt
    if (column)
      this.play(parseInt(column));
  }


  /*
   Cette fonction vérifie si le coup dans la case `row`, `column` par
   le joueur `cname` est un coup gagnant.

   Renvoie :
     true  : si la partie est gagnée par le joueur `cname`
     false : si la partie continue
 */
  function win(row, column, cname) {
    // Horizontal
    var count = 0;
    for (var j = 0; j < this.columns; j++) {
      count = (this.plateau[row][j].className == cname) ? count+1 : 0;
      if (count >= 4) return true;
    }
    // Vertical
    count = 0;
    for (var i = 0; i < this.lines; i++) {
      count = (this.plateau[i][column].className == cname) ? count+1 : 0;
      if (count >= 4) return true;
    }
    // Diagonal
    count = 0;
    var shift = row - column;
    for (var i = Math.max(shift, 0); i < Math.min(this.n, this.columns + shift); i++) {
      count = (this.plateau[i][i - shift].className == cname) ? count+1 : 0;
      if (count >= 4) return true;
    }
    // Anti-diagonal
    count = 0;
    shift = row + column;
    for (var i = Math.max(shift - this.columns + 1, 0); i < Math.min(this.lines, shift + 1); i++) {
      count = (this.plateau[i][shift - i].className == cname) ? count+1 : 0;
      if (count >= 4) return true;
    }

    return false;
  }

  // Cette fonction vide le plateau et remet à zéro l'état
   function reset() {
    for (var i = 0; i < this.lines; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.plateau[i][j].className = "";
      }
    }
    this.coups = 0;
    this.game_status = 0;
  }


// winning combinations
function winning(reboard, player) {
  // console.log("je suis la");
  if (
    (reboard[0]==player && reboard[5]==player && reboard[10]==player && reboard[15]==player )||
    (reboard[12]==player && reboard[9]==player && reboard [6]==player && reboard[3]==player)||
    (reboard[0]==player && reboard[1]==player && reboard[2]==player && reboard[3]==player)||
    (reboard[4]==player && reboard[5]==player && reboard[6]==player && reboard[7]==player)||
    (reboard[8]==player && reboard[9]==player && reboard[10]==player && reboard[11]==player)||
    (reboard[12]==player && reboard[13]==player && reboard[14]==player && reboard[15]==player)||
    (reboard[0]==player && reboard[4]==player && reboard[8]==player && reboard[12]==player )||
    (reboard[1]==player && reboard[5]==player && reboard[9]==player && reboard[13]==player)||
    (reboard[2]==player && reboard[6]==player && reboard[10]==player && reboard[14]==player)||
    (reboard[3]==player && reboard[7]==player && reboard[11]==player && reboard[15]==player)
  //encore des lignes
    ) {
  //console.log("je suis passé par ici")
    return true;
  } else {
    return false;
  }
}



function getIndex(reboard){
  var tablibre =[];
//  console.log("tablibre début" +tablibre)
  var col=0;

    for (var col=0; col<this.columns; col++){
        for (var i = 0; i < this.lines; i++) {
 //    console.log("board initial"+reboard)
//     console.log("case"+((col*4)+i));
  //   console.log(" classe "+reboard[(col*4+i)])
      if (!((reboard[((i*this.columns)+col)]==="X") || (reboard[((i*this.columns)+col)]==="I"))) {

        tablibre.push((i*this.columns)+col);
       break;
      }
    }

  }
// console.log("cases libres"+tablibre);
  return tablibre;
}

function minimax(reboard, player) {
  iter++;
  let array =getIndex(reboard);
 // console.log("cases libres"+array);
  if (winning(reboard, huPlayer)) {
    return {
      score: -10
    };
  } else if (winning(reboard, aiPlayer) ){
    return {
      score: 10
    };
  } else if (array.length === 0) {
    return {
      score: 0
    };
  }
//console.log(array);
  var moves = [];
  for (var i = 0; i < array.length; i++) {
   // console.log("je suis ici "+ i);
    var move = {};
    //donne le numéro de la case en index
    move.index = reboard[array[i]];
    reboard[array[i]] = player;
//console.log(move);
    if (player == aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
      //console.log("je suis la");
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
      //console.log("ou alors je suis ici");
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
