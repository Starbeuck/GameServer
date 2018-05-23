var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var randomstring = require('randomstring');

app.get('/', function (req, res) {
  "use strict";
  res.sendFile(__dirname + '/index.html');
});

var rooms = [];
var alotOfRoomOfTwo = [];
var newroomTwocount = 0;

io.on('connection', function (clientSocket) {
  "use strict";
  console.log('client connected : ' + clientSocket.id);

  console.log('nb : ' + io.engine.clientsCount)

  var newroomAlone;
  var newroomTwo;
  var newroom;

  // player alone //
  clientSocket.on('joinAlone', function () {
    newroom = randomstring.generate(5);
    rooms.push(newroom);
    clientSocket.join(newroom);
    console.log('Le client ' + clientSocket.id + ' a rejoint la room ' + newroom);
  })

  // two players //
  clientSocket.on('joinTwo', function () {
    newroomTwocount = newroomTwocount + 1;
    console.log(newroomTwocount);
    if (newroomTwocount % 2 == 1) {
      newroom = randomstring.generate(5);
      alotOfRoomOfTwo.push(newroom);
      rooms.push(newroom);
      clientSocket.join(newroom);
      console.log('Le client ' + clientSocket.id + ' a rejoint la room ' + newroom);
    } else {
      newroom = alotOfRoomOfTwo[alotOfRoomOfTwo.length - 1];
      clientSocket.join(newroom);
      console.log('Le client ' + clientSocket.id + ' a rejoint la room ' + newroom);
    }

  })

  // event on disconnet from other user in room of two //
  clientSocket.on('disconnect', function () {
     clientSocket.broadcast.to(newroom).emit('message', 'blop et caca');

     clientSocket.broadcast.to(newroom).emit('disconnect_message', 'blop et caca');
     clientSocket.broadcast.emit('disconnect_message', 'je me déconnecte');
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
});
