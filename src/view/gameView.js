var GameView = function(){
    this.updatePlayer = function(player){
        document.getElementById('currentPlayer').innerHTML = player;
    }
}

module.exports  = GameView;