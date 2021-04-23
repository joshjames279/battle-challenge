const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));
const BattleTurn = require('./src/battleTurn');
const Player = require('./src/player');

const battleTurn = new BattleTurn();

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	battleTurn.clearPlayers();
	battleTurn.gameOver = false;
	res.render('pages/index')
})

app.post('/battle', (req, res) => {
	const player1 = new Player(req.body.player1Name);
	let player2 = new Player(req.body.player2Name);
	if(player2.name === '') {
	player2.name = 'Gary'
	}
	battleTurn.addPlayers(player1, player2)
	res.render('pages/battle', { 
		player: battleTurn.playerArray[0],
		opponent: battleTurn.playerArray[1]
	})
})

app.get('/battle', (req, res) => {
	if(battleTurn.checkGameOver() === true) {
		res.redirect('/victory');
	} else {
		battleTurn.switchTurn()
		if(battleTurn.playerArray[0].name === 'Gary') {
			const attackPlayer = battleTurn.currentTurn();
			const recievingPlayer = battleTurn.playerArray[1];
			const damage = Math.floor(Math.random()*101);
			battleTurn.damage(damage)
			res.render('pages/turn', {
				attackingPlayer: attackPlayer,
				recievingPlayer: recievingPlayer,
				damage: damage
		})
	}
		res.render('pages/battle', { 
			player: battleTurn.playerArray[0],
			opponent: battleTurn.playerArray[1]
		})
	}
})

app.post('/turn', (req,res) => {
	const attackPlayer = battleTurn.currentTurn();
	const recievingPlayer = battleTurn.playerArray[1];
	let attack
	if(req.body.buttonId === 'Attack') {
		attack = Math.floor(Math.random()*101);
		battleTurn.damage(attack)
	} if(req.body.buttonId === 'Paralyse') {
		attack = 0
		battleTurn.paralyse()
		battleTurn.damage(attack)
	} if(req.body.buttonId === 'Poison') {
		attack = Math.floor(Math.random()*30);
		battleTurn.damage(attack)
	} else if(req.body.buttonId === 'Sleep') {
		attack = 0
		battleTurn.sleep()
		battleTurn.damage(attack)
	}
	res.render('pages/turn', {
		attackingPlayer: attackPlayer,
		recievingPlayer: recievingPlayer,
		damage: attack
	})
})

app.post('/magic', (req, res) => {
	const attackPlayer = battleTurn.currentTurn();
	const recievingPlayer = battleTurn.playerArray[1];
	let attack
	let hpPoints
	req.body.buttonId === 'Magic Attack'
	attack = Math.floor(Math.random()*50);
	hpPoints = Math.floor(Math.random()*50)
	battleTurn.damage(attack)
	battleTurn.heal(hpPoints)

	res.render('pages/magic', {
		attackingPlayer: attackPlayer,
		recievingPlayer: recievingPlayer,
		damage: attack,
		heal: hpPoints
	})
})

app.get('/victory', (req,res) => {
res.render('pages/victory', {
	champion: battleTurn.playerArray[0].name,
	loser: battleTurn.playerArray[1].name
})
})


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})