Game = require('./Game');
Player = require('./Player');

exports = module.exports = GameManager;

function GameManager(){
    
    this._games = [];

    this.createGame = function(){
        var newId = this._games.length;
        var newGame = new Game(newId);
        this._games.push(newGame);
        return newGame;
    };
}

GameManager.prototype.listAvailableGames = function(){
    var availableGames = [];
    for(var i = 0; i < this._games.length; i++){
        var game = this._games[i];
        if(game.needsPlayer()){
            availableGames.push({gameId: i, 'starter': game.players[0].name});
        }
    }
    return availableGames;
};

GameManager.prototype.findOrCreateGame = function(gameId) {
    var game;
    if (gameId >= 0 ) {
        game = this._games[gameId];
    } else {
        game = this.createGame();
    }
    return game;
};

GameManager.prototype.getPlayer = function(playerName){
    var player = new Player(playerName);
    return player;
};


