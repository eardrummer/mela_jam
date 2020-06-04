var express = require('express');

var numClients = 0;

console.log('server running')

var app = express();
var server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection: ' + socket.id);

  //console.log(socket)
  socket.on('disconnect', function(){
    numClients--;
    io.sockets.emit('numClients', numClients);
  })

  if(socket.connected){
    numClients++;
    io.sockets.emit('numClients', numClients);
  }


  socket.on('mouse', mouseMsg);

  function mouseMsg(data){
    socket.broadcast.emit('mouse', data);
    //console.log(data);
  }

}
