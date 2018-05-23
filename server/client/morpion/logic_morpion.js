
var randomstring = require('randomstring');

var rooms = [];
var newroom;
var newroomTwocount = 0;
var alotOfRoomOfTwo = [];

module.exports = {

  joinAlone: function (socket) {
    newroom = randomstring.generate(5);
    rooms.push(newroom);
    socket.join(newroom);
    console.log('Le client qui joue au morpion | id :' + socket.id + ' a rejoint la room : ' + newroom);
  },
  
   joinTwo: function (socket) {
    newroomTwocount = newroomTwocount + 1;
    console.log(newroomTwocount);
    if (newroomTwocount % 2 == 1) {
      newroom = randomstring.generate(5);
      alotOfRoomOfTwo.push(newroom);
      rooms.push(newroom);
      socket.join(newroom);
      console.log('Le client qui joue au morpion ' + socket.id + ' a rejoint la room ' + newroom);
    } else {
      newroom = alotOfRoomOfTwo[alotOfRoomOfTwo.length - 1];
      socket.join(newroom);
      console.log('Le client qui joue au morpion ' + socket.id + ' a rejoint la room ' + newroom);
    }
  }
};
