var GameView = function(){
    this.updatePlayer = function(player){
        document.getElementById('currentPlayer').innerHTML = player;
    }

    this.updateBoard =function (row, column, player) {
        document.querySelector('#row' + row + ' .column' + column).innerHTML = player;
    }
}

module.exports  = GameView;