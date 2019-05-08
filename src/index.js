var GamePresenter = require('./presenter/gamePresenter');
var GameView = require('./view/gameView');

var gameView = new GameView();
var gamePresenter = new GamePresenter(gameView);