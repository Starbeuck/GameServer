module.exports = class Action {
  constructor (json){
    console.log("Je veux creer une Action avec le json : " + json);
    var parsed = JSON.parse(json);
    this.x = parsed.x;
    this.y = parsed.y;
  }
  toString(){
    return 'clicked on ('+this.x+ ', ' +this.y+')';
  }
  toJson(){
    return {
      "x" : this.x,
      "y" : this.y
    }
  }
};
