exports = module.exports = Game;

function Game(gameId) {
  this._id = gameId;
  this._players = [];
}

Game.prototype.addPlayer = function(player) {
  this._players.push(player);
};

Game.prototype.__defineGetter__('players', function() {
  return this._players;
});

Game.prototype.__defineGetter__('id', function() {
  return this._id;
});

Game.prototype.needsPlayer = function() {
  return this._players.length == 1;
};

Game.prototype.getStatus = function() {
  var status = new Object();
  for (var i = 0; i < this._players.length; i++) {
    var playerStatus = new Object();
    playerStatus['name'] = this._players[i].name;
    playerStatus['lives'] = this._players[i].lives;
    status['player' + i] = playerStatus;
  }
  return status;
};

Game.prototype.getWinner = function() {
  if (this._players[0].isDead) {
    return this._players[1].name;
  } else if (this._players[1].isDead) {
    return this._players[0].name;
  }
  return null;
};

Game.prototype.hitPlayer = function(playerId) {
  var player = this._players[playerId];
  if (player != null) {
    player.reduceLives();
  }
};