var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var path = require('path');

app.use(express.static('public'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public', 'accueil.html'));
 // res.sendFile(path.join(__dirname, 'index.html'));
});


http.listen(1234, function(){
  console.log('listening on 1234');
});