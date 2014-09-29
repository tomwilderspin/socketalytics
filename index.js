
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));
var server = require('http').Server(app);
server.listen(3000, function (){
    console.log('listening on *:3000');
});
