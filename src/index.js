var GamePresenter = require('./presenter/gamePresenter');
var GameView = require('./view/gameView');

var gameView = new GameView();
var game = new GamePresenter(gameView);

var makeMove = function (event) {
    var row = lastCharacter(event.target.parentElement.id);
    var column = lastCharacter(event.target.className);
    game.move(row, column);
}

var lastCharacter = function(string){
    return string.slice(-1);
}

const positions = document.querySelectorAll('.row span');
for(var position = 0;position <= positions.length; position++){
    positions[position].addEventListener('click', function (event) {
        makeMove(event);
    })
};

