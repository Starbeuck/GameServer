var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var path = require('path');

// enable use file client
app.use(express.static('public'));

// init root path
app.get('/', function (req, res) {
 // res.sendFile(path.join(__dirname, '/public', 'accueil.html'));
  res.sendFile(path.join(__dirname, 'test.html'));
});

// display on port 1234
http.listen(1234, function(){
  console.log('listening on 1234');
});