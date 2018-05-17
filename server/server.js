var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(clientSocket){
  console.log('client connected : ' + clientSocket.id);

  clientSocket.on('disconnect', function(){
    console.log('client disconnected');
  });
  clientSocket.on('message', function(msg){
   console.log(msg + clientSocket.id);
 });
});


http.listen(1234, function(){
  console.log('Listening on 1234');
});
