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
}

module.exports  = GameView;