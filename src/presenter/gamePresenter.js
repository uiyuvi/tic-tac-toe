var PLAYERS = require('../constants/players');
var GAME_STATUS = require('../constants/gameStatus');

var GamePresenter = function(view){
    var currentPlayer = PLAYERS.X;
    var board = [[],[],[]];
    var winner;
    var moves = 0;
    var status = GAME_STATUS.IN_PROGRESS;
    view.updatePlayer(currentPlayer);

    this.currentPlayer = function (){
        return currentPlayer;
    }

    this.move = function (row,column){
        if(isValidPostion(row, column)){
            return;
        }

        if(isGameOver() || isPlayedPosition(row, column)){
            return;
        }
        
        approveMove(row,column);

        if(isMinimumMovesPeformedToCheckWin() && isWon()){
            winner = currentPlayer;
            status = this.status();
            return;
        }

        status = this.status();
        togglePlayer();        
    }   

    this.winner = function(){
        return winner;
    }

    this.status = function(){
        if(this.winner()){
            status = GAME_STATUS.WON
            view.handleWon();
        } else if(isMovesExpired()){
            status = GAME_STATUS.DRAW;
            view.handleDraw();
        }
        return status;
    }

    isValidPostion = function(row, column) {
        return isNaN(row) || isNaN(column);
    }
    
    isMovesExpired = function(){
        return moves === board.length * board.length;
    }

    isPlayedPosition = function(row, column) {
        return typeof board[row][column] !== 'undefined';
    }
    
    isGameOver = function() {
        return status !== GAME_STATUS.IN_PROGRESS;
    }

    approveMove = function(row,column){
        moves++;
        registerMoveInBoard(row,column);
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
            sumofMatchedMovesInColumn,
            sumOfMatchedMovesFromLeftToRight = 0,
            sumOfMatchedMovesFromRightToLeft = 0;

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

                if(isMatchFoundInLeftToRightDiagonal(row,column) ){
                    sumOfMatchedMovesFromLeftToRight++;
                }

                if(isMatchFoundInRightToLeftDiagonal(row,column)){
                    sumOfMatchedMovesFromRightToLeft++;
                }

                if(isMatchFound(sumOfMatchedMovesInRow, board, sumofMatchedMovesInColumn, sumOfMatchedMovesFromLeftToRight, sumOfMatchedMovesFromRightToLeft)){                   
                    return true;
                }
            }
        }        
    }

    isCurrentPlayerPlayedOn  = function(row, column) {
        return board[row][column] === currentPlayer;
    }

    isMatchFoundInRow = function(row,column){
        return isPlayedPosition(row,column) && isCurrentPlayerPlayedOn(row, column);
    }

    isMatchFoundInCloumn = function (row, column) {
        return typeof board[column][row] !== 'undefined' && board[column][row] === currentPlayer;
    }

    isMatchFoundInLeftToRightDiagonal = function(row, column){
        return row === column && isPlayedPosition(row,column) && isCurrentPlayerPlayedOn(row, column);
    }

    isMatchFoundInRightToLeftDiagonal = function(row,column){
        return ((row + column) === board.length-1) && isPlayedPosition(row,column) && isCurrentPlayerPlayedOn(row, column);
    }
    
    isMatchFound = function(sumOfMatchedMovesInRow, board, sumofMatchedMovesInColumn, sumOfMatchedMovesFromLeftToRight, sumOfMatchedMovesFromRightToLeft) {
        var requiredMovesToWin = board.length;
        return sumOfMatchedMovesInRow === requiredMovesToWin || sumofMatchedMovesInColumn === requiredMovesToWin || sumOfMatchedMovesFromLeftToRight === requiredMovesToWin || sumOfMatchedMovesFromRightToLeft === requiredMovesToWin;
    }

    isMinimumMovesPeformedToCheckWin = function(){
        return moves > (board.length-1)*2;
    }
}

module.exports = GamePresenter;
