var Game = require('../../src/presenter/gamePresenter');
var PLAYERS = require('../../src/constants/players');
var GAME_STATUS = require('../../src/constants/gameStatus');

describe('Tic tac toe game presenter', function(){
    var game;
    var view = jasmine.createSpyObj(view,['updatePlayer','updateBoard','handleWon']);    
    var playerX = {
        move: function(row,column){
            game.move(row,column);
        }
    };
    var playerO = {
        move: function(row,column){
            game.move(row,column);
        }
    };

    beforeEach(function(){               
        game = new Game(view);  
    })

    it('should `X` play first turn on new game',function(){
        expect(view.updatePlayer).toHaveBeenCalled();
        expect(game.currentPlayer()).toBe(PLAYERS.X);
    });

    it('Should switch player and register in board after a valid turn', function(){
        var validMove = {
            row: 0,
            column:0
        };

        playerX.move(validMove.row,validMove.column);

        expect(game.currentPlayer()).toBe(PLAYERS.O);
        expect(view.updateBoard).toHaveBeenCalledWith(validMove.row,validMove.column,PLAYERS.X);
        expect(view.updatePlayer).toHaveBeenCalledWith(PLAYERS.O)
    });

    it('Should not switch player after a invalid turn', function(){
        playerX.move('a','b');

        expect(game.currentPlayer()).toBe(PLAYERS.X);
    });    

    it('should not allow to play on played position', function(){
        var inValidMove = {
            row: 0,
            column:0
        };

        playerX.move(0,0);
        playerO.move(inValidMove.row,inValidMove.column);

        expect(view.updateBoard).not.toHaveBeenCalledWith([inValidMove.row,inValidMove.column,PLAYERS.O]);
        expect(game.currentPlayer()).toBe(PLAYERS.O);
    });

    it('should declare win if player draws all three in a row', function(){
        view.updateBoard.calls.reset();

        playerX.move(0,0);
        playerO.move(1,0);
        playerX.move(0,1);
        playerO.move(2,0);
        playerX.move(0,2);

        expect(view.updateBoard.calls.count()).toEqual(5);
        expect(view.handleWon).toHaveBeenCalled();
        expect(game.winner()).toBe(PLAYERS.X);
        expect(game.status()).toBe(GAME_STATUS.WON);
    });

    it('should not allow player to play once game is declared win', function(){
        view.updateBoard.calls.reset();

        playerX.move(0,0);
        playerO.move(1,0);
        playerX.move(0,1);
        playerO.move(2,0);
        playerX.move(0,2);
        playerO.move(2,1);

        expect(view.updateBoard.calls.count()).not.toEqual(6);
    });

    it('should declare win if player draws all three in a column', function(){
        view.updateBoard.calls.reset();

        playerX.move(0,1);
        playerO.move(1,0);
        playerX.move(1,1);
        playerO.move(2,0);
        playerX.move(2,1);

        expect(game.winner()).toBe(PLAYERS.X);
        expect(view.updateBoard.calls.count()).toEqual(5);
        expect(view.handleWon).toHaveBeenCalled();
        expect(game.status()).toBe(GAME_STATUS.WON);
    });

    it('should declare win if player draws all three in a diagonal from left to right', function(){
        view.updateBoard.calls.reset();

        playerX.move(0,0);
        playerO.move(1,0);
        playerX.move(1,1);
        playerO.move(2,0);
        playerX.move(2,2);

        expect(game.winner()).toBe(PLAYERS.X);
        expect(view.updateBoard.calls.count()).toEqual(5);
        expect(view.handleWon).toHaveBeenCalled();
        expect(game.status()).toBe(GAME_STATUS.WON);
    });

    it('should declare win if player draws all three in a diagonal from right to left', function(){
        view.updateBoard.calls.reset();
        var lastMove = {
            row: 2,
            column : 0
        }

        playerX.move(0,2);
        playerO.move(1,0);
        playerX.move(1,1);
        playerO.move(2,1);
        playerX.move(lastMove.row,lastMove.column);

        expect(game.winner()).toBe(PLAYERS.X);
        expect(view.updateBoard.calls.count()).toEqual(5);
        expect(view.updateBoard.calls.mostRecent().args).toEqual([lastMove.row,lastMove.column,PLAYERS.X]);
        expect(view.handleWon).toHaveBeenCalled();
        expect(game.status()).toBe(GAME_STATUS.WON);
    });
})