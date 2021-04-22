const Player = require('../src/player');

describe('Testing player class: ', () => {
	let testPlayer
	it('instantiates with correct values', () => {
		testPlayer = new Player('testName');
		expect(testPlayer.name).toEqual('testName');
		expect(testPlayer.hp).toEqual(100);
	})

	it('takeDamage method reduces player hp', () => {
		testPlayer = new Player('testName');
		expect(testPlayer.takeDamage(10)).toEqual(90);
	})

	it('takeDamage method reduces player hp to 0', () => {
		testPlayer = new Player('testName');
		expect(testPlayer.takeDamage(120)).toEqual(0);
	})
})