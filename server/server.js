var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var randomstring = require('randomstring');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var rooms = [];

io.on('connection', function(clientSocket){
  console.log('client connected : ' + clientSocket.id);

  console.log('nb : ' + io.engine.clientsCount)

  var newroom;

  //On ajoute le client a une room
  if(io.engine.clientsCount%2 === 1){
     newroom = randomstring.generate(5);
     rooms.push(newroom);
     clientSocket.join(newroom);
     console.log('Le client ' + clientSocket.id + ' a rejoint la room ' + newroom);
  }else{
    newroom = rooms[rooms.length - 1];
    clientSocket.join(newroom);
    console.log('Le client ' + clientSocket.id + ' a rejoint la room ' + newroom);
  }

  clientSocket.on('disconnect', function(){
    clientSocket.broadcast.emit('disconnect_message', 'je me déconnecte');
    console.log('message : ' + 'disconnect' + ' | client : ' + clientSocket.id + ' | room : '+ newroom);
    console.log('client disconnected');
  });

  clientSocket.on('disconnect_message', function(msg){
    console.log('message : ' + msg + ' | client : ' + clientSocket.id + ' | room : '+ newroom);
    clientSocket.disconnect();
  });

  clientSocket.on('message', function(msg){
    clientSocket.broadcast.to(newroom).emit('message', msg);
    console.log('message : ' + msg + ' | client : ' + clientSocket.id + ' | room : '+ newroom);
 });

});

// END CONNECTION


http.listen(1234, function(){
  console.log('Listening on 1234');
});
