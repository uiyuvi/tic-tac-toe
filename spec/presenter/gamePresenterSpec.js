var Game = require('../../src/presenter/gamePresenter');
var PLAYERS = require('../../src/constants/players');

describe('Tic tac toe game presenter', function(){
    var view = {};
    view.updatePlayer = function(){};
    view.updateBoard = function(){};

    it('should `X` play first turn on new game',function(){
        var game;
        spyOn(view,'updatePlayer');

        game = new Game(view);

        expect(view.updatePlayer).toHaveBeenCalled();
        expect(game.currentPlayer()).toBe(PLAYERS.X);
    });

    it('Should switch player and register in board after a valid turn', function(){        
        spyOn(view,'updateBoard');
        spyOn(view,'updatePlayer');
        var game = new Game(view);

        game.move(0,0);

        expect(game.currentPlayer()).toBe(PLAYERS.O);
        expect(view.updateBoard).toHaveBeenCalledWith(1,1,PLAYERS.X);
        expect(view.updatePlayer).toHaveBeenCalledWith(PLAYERS.O)
    });

    it('Should not switch player after a invalid turn', function(){
        var game = new Game(view);

        game.move('a','b');

        expect(game.currentPlayer()).toBe(PLAYERS.X);
    });
})