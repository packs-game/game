var Game = require('../../game');
var game;
var z;
var cards;

describe('main phase', function() {
	beforeEach(function() {
		game = Game.createGame(players);
		z = game.zones;
		cards = require('../../src/cards');
	});
	
	//main
	it('should give a bot +1', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		var c = hand.add(cards.cards.givePlus1);
		var token = game.effects.createCreatureToken('micro', game);

		game.getActivePhase().action({
			type: 'play',
			id: c.id,
			target: token.id
		});

		expect(z.getCard(token.id).power).toBe(2);
	});
	it('should heal 2', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		var mainframe = z.getZone('player-' + game.activePlayer).getStack('mainframe')
		mainframe.damage = 5;
		var c = hand.add(cards.cards.salve);

		game.getActivePhase().action({
			type: 'play',
			id: c.id
		});

		expect(mainframe.damage).toBe(3);
	});
});