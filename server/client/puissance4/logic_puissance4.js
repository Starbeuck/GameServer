
var randomstring = require('randomstring');

var rooms = [];
var newroom;

module.exports = {

  joinAlone: function (socket) {
    newroom = randomstring.generate(5);
    rooms.push(newroom);
    socket.join(newroom);
    console.log('Le client qui joue au puissance 4 | id : ' + socket.id + ' a rejoint la room : ' + newroom);
  }
};
