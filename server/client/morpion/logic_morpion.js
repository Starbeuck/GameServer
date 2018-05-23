
var randomstring = require('randomstring');

var rooms = [];
var newroom;

module.exports = {

  joinAlone: function (socket) {
    newroom = randomstring.generate(5);
    rooms.push(newroom);
    clientSocket.join(newroom);
    console.log('Le client qui joue au morpion' + clientSocket.id + ' a rejoint la room ' + newroom + 'du jeu ' + name);
  }
};
