var GameView = function(){
    this.updatePlayer = function(player){
        render('#currentPlayer', player);
    }

    this.updateBoard = function (row, column, player) {
        render('#row' + row + ' .column' + column, player);        
    }

    this.handleWon = function () {
        addClass('.win','show');
    }
    
    this.handleDraw = function(){
        addClass('.draw','show');
        addClass('.playerTurn','hide');
    }
    
    var addClass = function(selector, className){
        document.querySelector(selector).classList.add(className);
    }

    var render = function (selector, value){
        document.querySelector(selector).innerHTML = value;
    }

}

module.exports  = GameView;