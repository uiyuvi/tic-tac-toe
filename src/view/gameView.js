var GameView = function(){
    this.updatePlayer = function(player){
        document.getElementById('currentPlayer').innerHTML = player;
    }

    this.updateBoard =function (row, column, player) {
        document.querySelector('#row' + row + ' .column' + column).innerHTML = player;
    }

    this.handleWon = function () {
        document.querySelector('.win').classList.add('show');
    }

    this.handleDraw = function(){
        document.querySelector('.draw').classList.add('show');
        document.querySelector('.playerTurn').classList.add('hide');
    }

}

module.exports  = GameView;