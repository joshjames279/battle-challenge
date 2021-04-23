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

	heal(hpPoints) {
        this.playerArray[0].healHealth(hpPoints)
    }

	paralyse() {
		let number = Math.random()
		if(number > 0.5) {
			return this.playerArray.reverse();
		} else if(number <= 0.49) {
			return this.playerArray
		}
	}

	sleep() {
		return this.playerArray.reverse();
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