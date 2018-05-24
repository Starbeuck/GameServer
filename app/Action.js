class Action {
  constructor (json){
    let parsed = JSON.parse(json);
    this.x = parsed.x;
    this.y = parsed.y;
  }
  toString(){
    return 'clicked on ('+x+ ', ' +y+')';
  }
  toJson(){
    return {
      'x' : this.x,
      'y' : this.y
    }
  }
};