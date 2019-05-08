var Game = require('../../src/presenter/gamePresenter');
var PLAYERS = require('../../src/constants/players');

describe('Tic tac toe game presenter', function(){
    var game;
    var view = jasmine.createSpyObj(view,['updatePlayer','updateBoard']);    
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
        expect(view.updateBoard).toHaveBeenCalledWith(validMove.row+1,validMove.column+1,PLAYERS.X);
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

        expect(view.updateBoard).not.toHaveBeenCalledWith([inValidMove.row+1,inValidMove.column+1,PLAYERS.O]);
        expect(game.currentPlayer()).toBe(PLAYERS.O);
    });
})