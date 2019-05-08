var PLAYERS = require('../constants/players');
var GAME_STATUS = require('../constants/gameStatus');

var GamePresenter = function(view){
    var currentPlayer = PLAYERS.X;
    var board = [[],[],[]];
    var winner;
    var status = GAME_STATUS.IN_PROGRESS;
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

        if(isWon()){
            winner = currentPlayer;
            status = this.status();
            return;
        } 
        togglePlayer();        
    }   

    this.winner = function(){
        return winner;
    }

    this.status = function(){
        if(this.winner()){
            status = GAME_STATUS.WON
            view.handleWon();
        }
        return status;
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

    isWon = function(){
        var sumOfMatchedMoveInRow;

        for(var row = 0; row <= board.length-1 ; row++){
            sumOfMatchedMoveInRow =0;
            for(var column = 0; column <= board.length-1; column++){
                if(checkInRow(row, column)){
                    sumOfMatchedMoveInRow++;
                }

                if(sumOfMatchedMoveInRow === board.length){                   
                    return true;
                }
            }
        }        
    }

    checkInRow = function(row,column){
        return isPlayedPosition(row,column) && board[row][column] === currentPlayer;
    }
}

module.exports = GamePresenter;