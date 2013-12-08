GameManager = require('./GameManager');
Game = require('./Game');
Player = require('./Player');

function assert(booleanCondition, msg){
    if(!booleanCondition){
        console.error(msg);
    }
}

var g = new Game(123);
assert(g.id == 123, 'g.id == 123');
assert(g.players.length == 0, 'g.players.length == 0');

var player1 = new Player('Joe');
assert(player1.name == 'Joe', "player1.name == 'Joe'");
assert(player1.lives == 3, 'player1.lives == 3');

g.addPlayer(player1);
assert(g.players.length ==1, 'g.players.length == 1');
assert(g.needsPlayer(), 'g.needsPlayer()');

var player2 = new Player('Bob');
g.addPlayer(player2);
assert(g.players.length == 2, 'g.players.length == 2');
assert(!g.needsPlayer(), '!g.needsPlayer()');

var manager = new GameManager();
assert(manager.listAvailableGames().length == 0, 'manager.listAvailableGames().length == 0');

var game = manager.findOrCreateGame(-1);
assert(game.id == 0, 'game.id == 0');
game.addPlayer(player1);

var myGame = manager.findOrCreateGame(0);
assert(myGame.players.length == 1, 'myGame.players.length == 1');
assert(myGame.players[0].name == 'Joe', "myGame.players[0].name == 'Joe'");

assert(manager.listAvailableGames().length == 1, 'manager.listAvailableGames().length == 1');

myGame.addPlayer(player2);
assert(myGame.players.length == 2, 'myGame.players.length == 2');
assert(myGame.players[1].name == 'Bob', "myGame.players[1].name == 'Bob'");

var newGame = manager.findOrCreateGame(-1);
assert(newGame.id == 1, 'newGame.id == 1');


