var socket_io = require('socket.io');
var http = require('http');
var nodeStatic = require('node-static');
var GameManager = require('./GameManager');

var gameManager = new GameManager();

var clientFiles = new nodeStatic.Server('./client');

var httpServer = http.createServer(function(request, response) {
  request.addListener('end', function() {
    clientFiles.serve(request, response);
  }).resume();
});
httpServer.listen(2000);

var io = socket_io.listen(httpServer);

io.sockets.on('connection', function(socket) {

  socket.emit('availableGames', gameManager.listAvailableGames());

  socket.on('join', function(data) {
    var game = gameManager.findOrCreateGame(data.gameId);
    var player = gameManager.getPlayer(data.playerName);
    game.addPlayer(player);
    var gameStatus = game.getStatus();
    var room = getRoomNumber((game.id));
    socket.join(room);
    socket.set('room', room);
    io.sockets.to(room).emit('gameStatus', gameStatus);
    if (!game.needsPlayer()) {
      socket.emit('startGame', {
        playerId: '1'
      });
      socket.broadcast.to(room).emit('startGame', {
        playerId: '0'
      });
    } else {
      io.sockets.emit('availableGames', gameManager.listAvailableGames());
    }
  });

  socket.on('move', function(data) {
    socket.get('room', function(err, room) {
      socket.broadcast.to(room).emit('move', data);
    });
  });

  socket.on('fire', function(data) {
    socket.get('room', function(err, room) {
      socket.broadcast.to(room).emit('fire', data);
    });
  });

  socket.on('hit', function(data) {
    socket.get('room', function(err, room) {
      var gameId = getGameId(room);
      var game = gameManager.findOrCreateGame(gameId);
      console.log('hitting player ' + data.playerId);
      game.hitPlayer(data.playerId);
      var gameStatus = game.getStatus();
      io.sockets.to(room).emit('gameStatus', gameStatus);
      var winner = game.getWinner();
      if (winner != null) {
        io.sockets.to(room).emit('winner', winner);
      }
    });
  });

  socket.on('quit', function() {
    socket.get('room', function(err, room) {
      socket.leave(room);
      socket.set('room', null);
    });
  });
});

function getRoomNumber(gameId) {
  return gameId + 1;
}

function getGameId(room) {
  return room - 1;
}