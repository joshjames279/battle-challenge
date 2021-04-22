describe('Testing index page: ', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('displays enter names heading, input fields and submit button', () => {
		cy.contains('Enter combatant names');
		cy.get('#player1-input').should('be.visible');
		cy.get('#player2-input').should('be.visible');
		cy.get('#submit-names').should('have.value', 'FIGHT!');
	})

	it('After submitting names, navigates to battle page', () => {
		cy.get('#player1-input').type('Antony');
		cy.get('#player2-input').type('Josh');
		cy.get('#submit-names').click();
		cy.url().should('include', '/battle');
	})
})

describe('Testing battle page: ', () => {
	before(() => {
		cy.visit('/');
		cy.get('#player1-input').type('Antony');
		cy.get('#player2-input').type('Josh');
		cy.get('#submit-names').click();
	})

	it('displays player1 name and hp', () => {
		cy.contains('Antony')
		cy.get('#player1hp').contains('100');
	})

	it('displays player2 name and hp', () => {
		cy.contains('Josh')
		cy.get('#player2hp').contains('100');
	})

	it('displays whose turn it is', () => {
		cy.contains("Antony's turn")
	})

	it('displays attack button', () => {
		cy.get('#attack-button').should('have.value', 'Attack');
	})

})

describe('Testing turn page: ', () => {
	beforeEach(() => {
		cy.intercept('/turn', )
		cy.visit('/');
		cy.get('#player1-input').type('Antony');
		cy.get('#player2-input').type('Josh');
		cy.get('#submit-names').click();
		cy.get('#attack-button').click();
	})

	it("Attack message:", function(){
        cy.url().should('include', '/turn');
		cy.contains("Antony attacked Josh and did 10 damage.")
		cy.get('#next-button').should('have.value', 'Continue');
	})

})


describe('Testing battle get request: ', () => {
	before(() => {
		cy.visit('/');
		cy.get('#player1-input').type('Antony');
		cy.get('#player2-input').type('Josh');
		cy.get('#submit-names').click();
		cy.get('#attack-button').click();
		cy.get('#next-button').click();
	})

	it("Swapped player turn, 'You' set as player whose turn it is", function(){
        cy.url().should('include', '/battle');
		cy.contains("You: Josh")
		cy.get('#player1hp').contains('90');
	})

	it('displays opponent name and hp', () => {
		cy.contains('Opponent: Antony')
		cy.get('#player2hp').contains('100');
	})

	it('displays whose turn it is', () => {
		cy.contains("Josh's turn")
	})

	it('displays attack button', () => {
		cy.get('#attack-button').should('have.value', 'Attack');
	})
})

describe('Testing battle for second attack turn: ', () => {
	before(() => {
		cy.visit('/');
		cy.get('#player1-input').type('Antony');
		cy.get('#player2-input').type('Josh');
		cy.get('#submit-names').click();
		cy.get('#attack-button').click();
		cy.get('#next-button').click();
		cy.get('#attack-button').click();
		cy.get('#next-button').click();
		
	})

	it("Swapped player turn, 'You' set as player whose turn it is", function(){
        cy.url().should('include', '/battle');
		cy.contains("You: Antony")
		cy.get('#player1hp').contains('90');
	})

	it('displays opponent name and hp', () => {
		cy.contains('Opponent: Josh')
		cy.get('#player2hp').contains('90');
	})

	it('displays whose turn it is', () => {
		cy.contains("Antony's turn")
	})

	it('displays attack button', () => {
		cy.get('#attack-button').should('have.value', 'Attack');
	})
})

describe('Game ends when player hp is 0: ', () => {
	before(() => {
		cy.visit('/');
		cy.get('#player1-input').type('Antony');
		cy.get('#player2-input').type('Josh');
		cy.get('#submit-names').click();

		for(let i = 0; i < 19; i ++) {
			cy.get('#attack-button').click();
			cy.get('#next-button').click();
		}
	})

	it('should display fight over page', () => {
		cy.url().should('include', '/victory');
		cy.contains('Congratulations Antony, you beat the shit out of Josh. Feel good about yourself?')
		cy.get('#new-game-button').should('have.value', 'Fight Again');
	})


})
