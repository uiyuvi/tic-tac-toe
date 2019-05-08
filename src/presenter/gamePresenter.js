var PLAYERS = require('../constants/players');
var GamePresenter = function(view){
    var currentPlayer = PLAYERS.X;
    var board = [[],[],[]];
    view.updatePlayer(currentPlayer);

    this.currentPlayer = function (){
        return currentPlayer;
    }

    this.move = function (row,column){
        if(isNaN(row) || isNaN(column) || typeof board[row][column] === undefined){
            return;
        } 
        
        registerMoveInBoard(row,column);
        togglePlayer();        
    }

    registerMoveInBoard = function(row,column){
        board[row][column] = currentPlayer;        
        view.updateBoard(row+1,column+1,currentPlayer);
    }

    togglePlayer = function(){
        currentPlayer = (currentPlayer === PLAYERS.X) ? PLAYERS.O : PLAYERS.X;
    }
}

module.exports = GamePresenter;