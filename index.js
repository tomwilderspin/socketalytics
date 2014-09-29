
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

var socketData = {};
var stats = { connections: 0, touch:0, video:0, pages:{} };
var capture = io.of('/capture');
capture.on('connection', function(socket){
    ++stats.connections;
    socket.on('client-data', function(data){
        socketData[ socket.id ] = data;
        stats.touch += ( data.touch? 1 : 0 );
        stats.video += ( data.video? 1 : 0 );
        var pageCount = stats.pages[ data.url ] || 0;
        stats.pages[ data.url ] = ++pageCount;
    });
});
socket.on('disconnect', function(){
    --stats.connections;
    stats.touch -= ( socketData[ socket.id ].touch? 1:0 );
    stats.video -= ( socketData[ socket.id ].video? 1:0 );
    --stats.pages[ socketData[ sokcet.id ].url ];
    delete socketData[ socket.id ];
});

var stats = { connections:0, touch:0, video:0, pages:{} };
var dashboard = io.of('/dashboard');
dashboard.on('connection', function(socket){
    socket.emit('stats-updated', stats);
});


