var GameView = require('../../src/view/gameView');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Tic Tac Toe game view', function(){
    it('should update player', function(){
        var view = new GameView();
        const dom = new JSDOM(`<!DOCTYPE html><div id="currentPlayer">Hello world</div>`);
        document = dom.window.document;

        view.updatePlayer('X');

        expect(document.getElementById('currentPlayer').innerHTML).toBe('X');
    });
})