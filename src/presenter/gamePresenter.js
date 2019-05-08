var GamePresenter = function(view){
    var PLAYER_X = 'X';
    var currentPlayer = PLAYER_X;
    view.updatePlayer(currentPlayer);

    this.currentPlayer = function (){
        return currentPlayer;
    }
}

module.exports = GamePresenter;