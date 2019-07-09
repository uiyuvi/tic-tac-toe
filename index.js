var GamePresenter = require('./presenter/gamePresenter');
var GameView = require('./view/gameView');

var gameView = new GameView();
var game = new GamePresenter(gameView);

var makeMove = function (event) {
    var row = getRow(event);
    var column = getColumn(event);
    game.move(row, column);
}
var getRow = function (event) {
    return lastCharacter(event.target.parentElement.id);
}
var getColumn = function (event) {
    return lastCharacter(event.target.className);
}
var lastCharacter = function(string){
    return string.slice(-1);
}
const positions = document.querySelectorAll('.row span');
for(var position = 0;position < positions.length; position++){
    positions[position].addEventListener('click', function (event) {
        makeMove(event);
    })
};

