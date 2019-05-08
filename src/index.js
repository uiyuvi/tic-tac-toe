var GamePresenter = require('./presenter/gamePresenter');
var GameView = require('./view/gameView');

var gameView = new GameView();
var game = new GamePresenter(gameView);

var makeMove = function (event) {
    var row = event.target.parentElement.id.slice(-1);
    var column = event.target.className.slice(-1);
    game.move(row - 1, column - 1);
}

document.querySelectorAll('.row span').forEach((position) => {
    position.addEventListener('click', function (event) {
        makeMove(event);
    })
});