module.exports = class Action {
  constructor (json){
    console.log("Je veux creer une Action avec le json : " + json);
    var parsed = JSON.parse(json);
    this.x = parsed.x;
    this.y = parsed.y;
    this.currentPlayer = parsed.currentPlayer; // 1 = joueur réel ; 2 = IA
  }
  toString(){
    return 'clicked on (' + this.x + ', ' +this.y + ', ' + this.currentPlayer + ')';
  }
  toJson(){
    return {
      "x" : this.x,
      "y" : this.y,
      "currentPlayer" : this.currentPlayer
    }
  }
};
