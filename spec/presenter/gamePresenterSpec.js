var Game = require('../../src/presenter/gamePresenter');

describe('Tic tac toe game presenter', function(){
    var view = {};
    view.updatePlayer = function(){};

    it('should `X` play first turn on new game',function(){
        var game;
        spyOn(view,'updatePlayer');

        game = new Game(view);

        expect(view.updatePlayer).toHaveBeenCalled();
        expect(game.currentPlayer()).toBe('X');
    });
})