exports = module.exports = Player;

function Player(playerName){
    this._name = playerName;
    this._lives = 10;
}

Player.prototype.__defineGetter__('name', function(){
    return this._name;
});

Player.prototype.__defineGetter__('lives', function(){
    return this._lives;
});

Player.prototype.__defineGetter__('isDead', function(){
    return this._lives <= 0;
});

Player.prototype.reduceLives = function(){
    this._lives--;
};