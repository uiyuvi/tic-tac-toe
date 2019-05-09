var GameView = require('../../src/view/gameView');
var PLAYERS = require('../../src/constants/players');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Tic Tac Toe game view', function(){
    var view = new GameView();
    var render = function(template){
        const dom = new JSDOM(template);
        document = dom.window.document;
    }

    it('should update player', function(){        
        render(`<!DOCTYPE html><div id="currentPlayer">Hello world</div>`);

        view.updatePlayer(PLAYERS.X);

        expect(document.getElementById('currentPlayer').innerHTML).toBe(PLAYERS.X);
    });

    it('should update board with player', function(){
        var row = 2, column = 1;
        render(`<!DOCTYPE html><div id="row${row}"><span class="column${column}">Hello world</span></div>`);        

        view.updateBoard(row,column,PLAYERS.O);

        expect(document.querySelector('#row' + row + ' .column' + column).innerHTML).toBe(PLAYERS.O);
    });

    it('should display winner', function(){
        render(`<!DOCTYPE html><div class="win">Hello world</div>`);

        view.handleWon();

        expect(document.querySelector('.win').classList.contains('show')).toBeTruthy();
    });

    it('should display game is draw', function(){
        render(`<!DOCTYPE html><div class="draw">Hello world</div><div class="playerTurn">Hello world</div>`);

        view.handleDraw();

        expect(document.querySelector('.draw').classList.contains('show')).toBeTruthy();
        expect(document.querySelector('.playerTurn').classList.contains('hide')).toBeTruthy();
    });
})