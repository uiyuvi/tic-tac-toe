var GameView = require('../../src/view/gameView');
var PLAYERS = require('../../src/constants/players');
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

    it('should update board with player', function(){
        var row = 2;
        var column = 1;
        var gameView = new GameView();
        const dom = new JSDOM(`<!DOCTYPE html><div id="row${row}"><span class="column${column}">Hello world</span></div>`);
        document = dom.window.document;

        gameView.updateBoard(row,column,PLAYERS.O);

        expect(document.querySelector('#row' + row + ' .column' + column).innerHTML).toBe(PLAYERS.O);
    });
})