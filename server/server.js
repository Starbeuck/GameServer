var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var randomstring = require('randomstring');
var path = require('path');

var puissance4 = require('./client/puissance4/logic_puissance4.js');
var morpion = require('./client/morpion/logic_morpion.js');
var demineur = require('./client/Demineur/logic_demineur.js');

app.use(express.static('client'));

app.get('/', function (req, res) {
  "use strict";
  //res.sendFile(path.join(__dirname, '/client', 'accueil.html'));
  res.sendFile(path.join(__dirname, 'index.html'));
});

var rooms = [];
var alotOfRoomOfTwo = [];
var newroomTwocount = 0;

var newroom;

io.on('connection', function (clientSocket) {
  "use strict";
  console.log('client connected : ' + clientSocket.id);

  console.log('nb : ' + io.engine.clientsCount)

  // player alone //

  clientSocket.on('joinAlone', function (name) {
    switch (name) {
      case 'demineur':
        demineur.joinAlone(clientSocket);
        break;
      case 'morpion':
        morpion.joinAlone(clientSocket);
        break;
      case 'puissance4':
        puissance4.joinAlone(clientSocket);
        break;
      default:

    }
    // var newroom;
    // newroom = randomstring.generate(5);
    // rooms.push(newroom);
    //  clientSocket.join(newroom);
    //  console.log('Le client ' + clientSocket.id + ' a rejoint la room ' + newroom + 'du jeu '+ name);
  });
  
  clientSocket.on('joinTwo', function (name) {
    switch (name) {
      case 'demineur':
        demineur.joinTwo(clientSocket);
        break;
      case 'morpion':
        morpion.joinTwo(clientSocket);
        break;
      case 'puissance4':
        puissance4.joinTwo(clientSocket);
        break;
      default:

    }
  });

  // two players //
/*  clientSocket.on('joinTwo', function (name) {
    newroomTwocount = newroomTwocount + 1;
    console.log(newroomTwocount);
    if (newroomTwocount % 2 == 1) {
      newroom = randomstring.generate(5);
      alotOfRoomOfTwo.push(newroom);
      rooms.push(newroom);
      clientSocket.join(newroom);
      console.log('Le client ' + clientSocket.id + ' a rejoint la room ' + newroom+ 'du jeu '+ name);
    } else {
      newroom = alotOfRoomOfTwo[alotOfRoomOfTwo.length - 1];
      clientSocket.join(newroom);
      console.log('Le client ' + clientSocket.id + ' a rejoint la room ' + newroom + 'du jeu '+ name);
    }
  });*/

  // event on disconnet from other user in room of two //
  clientSocket.on('disconnect', function () {
     clientSocket.broadcast.to(newroom).emit('disconnect_message', 'blop et caca');
     console.log('message : ' + 'disconnect' + ' | client : ' + clientSocket.id + ' | room : ' + newroom);
     console.log('client disconnected');
   });

  // send disconnect_message //
   clientSocket.on('disconnect_message', function (msg) {
     console.log('message : ' + msg + ' | client : ' + clientSocket.id + ' | room : ' + newroom);
     clientSocket.disconnect();
   });

  // chat between two players in a room //
   clientSocket.on('message', function (msg) {
     clientSocket.broadcast.to(newroom).emit('message', msg);
     console.log('message : ' + msg + ' | client : ' + clientSocket.id + ' | room : ' + newroom);
   });

});

// END CONNECTION


http.listen(1234, function () {
  console.log('Listening on 1234');
  //chat.hello();
});
