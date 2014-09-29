
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));
var server = require('http').Server(app);

server.listen(3000, function(){
    console.log('listen on *:3000');
});

var io = require('socket.io')(server);
var capture = io.of('/capture');
capture.on('connection', function(socket){
    socket.on('client-data', function(data){
        console.log(data);
    });
});

io.on('connection', function(socket){
    console.log('We have a connection');
});


