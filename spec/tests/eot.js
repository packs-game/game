var Game = require('../../game');
var game;
var z;

describe('EOT and Draw Phases', function() {
	beforeEach(function() {
		game = Game.createGame(players);
		z = game.zones;
	});

	it('end of turn flip new cards from the PURCHASE to the BUY stack', function() {
		game.start();
		var toBuy = z.getZone('shared:to-buy').getStack('buy1').cards[0];

		game.getActivePhase().action({
			type: 'buy',
			id: toBuy.id
		});

		expect(z.getZone('player-' + game.activePlayer).getStack('discard').cards.length).toBe(1);
		game.getActivePhase().action(null, true); //pass main
		game.getActivePhase().action(null, true); //combat
		game.getActivePhase().action(null, true); //second main

		expect(game.turn).toBe(2);
		expect(z.getZone('shared:to-buy').getCards().length).toBe(3);
	});


	it('should move stuff from the turn-discard into the discard', function() {
		game.start();
		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		var card = hand.add(createCreatureCard);
		game.getActivePhase().action({
			type: 'play',
			id: card.id
		});

		var active = game.activePlayer;
		game.getActivePhase().action(null, true); //pass main
		game.getActivePhase().action(null, true); //combat
		
		expect(z.getZone('player-'+active).getStack('turn-discard').getCards().length).toBe(1);
		game.getActivePhase().action(null, true); //second main
		
		expect(z.getZone('player-'+active).getStack('turn-discard').getCards().length).toBe(0);
		expect(z.getZone('player-'+active).getStack('discard').getCards().length).toBe(1);
	});

	it('draw phase, active player draws till they have 4 cards in hand', function() {
		game.start();
		playHand(game,z);
		game.getActivePhase().action(null, true); //pass main
		game.getActivePhase().action(null, true); //combat
		game.getActivePhase().action(null, true); //second main
		expect(game.turn).toBe(2);
		expect(z.getZone('player-' + game.activePlayer + ':hand').getCards().length).toBe(4);
	});

});