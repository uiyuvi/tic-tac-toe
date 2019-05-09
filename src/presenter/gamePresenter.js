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

        if(isGameOver() || isPlayedPosition(row, column)){
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
    
    isGameOver = function() {
        return status === GAME_STATUS.WON;
    }

    registerMoveInBoard = function(row,column){
        board[row][column] = currentPlayer;        
        view.updateBoard(row,column,currentPlayer);
    }

    togglePlayer = function(){
        currentPlayer = (currentPlayer === PLAYERS.X) ? PLAYERS.O : PLAYERS.X;
        view.updatePlayer(currentPlayer);
    }

    isWon = function(){
        var sumOfMatchedMovesInRow,
        sumofMatchedMovesInColumn;

        for(var row = 0; row < board.length ; row++){
            sumOfMatchedMovesInRow = 0;
            sumofMatchedMovesInColumn = 0;
            for(var column = 0; column < board.length; column++){
                if(isMatchFoundInRow(row, column)){
                    sumOfMatchedMovesInRow++;
                }

                if(isMatchFoundInCloumn(row,column)){
                    sumofMatchedMovesInColumn++;
                }

                if(sumOfMatchedMovesInRow === board.length || sumofMatchedMovesInColumn === board.length){                   
                    return true;
                }
            }
        }        
    }

    isMatchFoundInRow = function(row,column){
        return isPlayedPosition(row,column) && board[row][column] === currentPlayer;
    }

    isMatchFoundInCloumn = function (row, column) {
        return typeof board[column][row] !== 'undefined' && board[column][row] === currentPlayer;
    }
}

module.exports = GamePresenter;