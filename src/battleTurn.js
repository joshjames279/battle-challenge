class BattleTurn {
    constructor(){
        this.playerArray = [];         
		this.gameOver = false;
    }

	clearPlayers() {
		this.playerArray = []
	}

	addPlayers(player1, player2){
		return this.playerArray.push(player1, player2);
	}

    switchTurn(){
		return this.playerArray.reverse();
    }

	currentTurn() {
			return this.playerArray[0];
	}

    damage(hpPoints){ 
        this.playerArray[1].takeDamage(hpPoints)
    }

	checkGameOver() {
		this.playerArray.forEach(player => {
			if(player.hp === 0) {
				this.gameOver = true;
			}
		})
		return this.gameOver;
	}
    
}

module.exports = BattleTurn;