var PLAYERS = require('../constants/players');
var GamePresenter = function(view){
    var currentPlayer = PLAYERS.X;
    var board = [[],[],[]];
    view.updatePlayer(currentPlayer);

    this.currentPlayer = function (){
        return currentPlayer;
    }

    this.move = function (row,column){
        if(isNaN(row) || isNaN(column)){
            return;
        }

        if(isPlayedPosition(row, column)){
            return;
        }
        
        registerMoveInBoard(row,column);
        togglePlayer();        
    }

    isPlayedPosition = function(row, column) {
        return typeof board[row][column] !== 'undefined';
    }

    registerMoveInBoard = function(row,column){
        board[row][column] = currentPlayer;        
        view.updateBoard(row+1,column+1,currentPlayer);
    }

    togglePlayer = function(){
        currentPlayer = (currentPlayer === PLAYERS.X) ? PLAYERS.O : PLAYERS.X;
        view.updatePlayer(currentPlayer);
    }
}

module.exports = GamePresenter;