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
	it('may play a card from hand', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		//it should move the currency to the currency zone
		var toPlay = hand.cards[0].id;

		game.getActivePhase().action({
			type: 'play',
			id: toPlay
		});

		expect(z.getZone('player-' + game.activePlayer).getStack('currency').cards.length).toBe(1);
		expect(hand.cards.length).toBe(3);
	});
	it('should throw if trying to play something invalid', function() {
		game.start();

		expect(function() {
			game.getActivePhase().action({
				type: 'play',
				id: 'invalid'
			});
		}).toThrow(new Error('invalid play'));
	});
	it('playing a program should be able to create a bot', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');

		var card = hand.add(createCreatureCard);

		game.getActivePhase().action({
			type: 'play',
			id: card.id
		});

		expect(z.getZone('shared:player-' + game.activePlayer + '-inplay').getCards().length).toBe(1);
		expect(hand.cards.length).toBe(4);
		expect(z.getZone('player-' + game.activePlayer).getStack('discard').cards.length).toBe(1);

	});
	it('a bot should have an owner id', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');

		var card = hand.add(createCreatureCard);

		game.getActivePhase().action({
			type: 'play',
			id: card.id
		});
		expect(z.getZone('shared:player-' + game.activePlayer + '-inplay').getCards()[0].owner).toBe(game.activePlayer);
	});
	it('may buy a card from the buy stack', function() {
		game.start();
		var toBuy = z.getZone('shared:to-buy').getStack('buy1').cards[0];

		game.getActivePhase().action({
			type: 'buy',
			id: toBuy.id
		});

		expect(z.getZone('player-' + game.activePlayer).getStack('discard').cards.length).toBe(1);

	});
	it('should throw if attempting to buy something invalid', function() {
		game.start();
		
		expect(function() {
			game.getActivePhase().action({
				type: 'buy',
				id: 'notarealcard'
			});
		}).toThrow(new Error('invalid buy'));
	});
	it('may use an ability on their mainframe', function() {
		game.start();

		//cost is paid
		//resolve()

	});
	it('may advance to the next phase', function() {
		game.start();

		//pass during main
		game.getActivePhase().action(null, true);

		expect(game.getActivePhase().name).toBe('declare-attackers');
	});
	it('may play a targeted card', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		var c = hand.add(cards.cards.deal1Damage);
		var token = game.effects.createCreatureToken('micro', game);
		var inplay = z.getZone('shared:player-' + game.activePlayer + '-inplay');

		expect(inplay.getCards().length).toBe(1);

		game.getActivePhase().action({
			type: 'play',
			id: c.id,
			target: token.id
		});

		expect(inplay.getCards().length).toBe(0);
	});
	it('throws on invalid target', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		var c = hand.add(cards.cards.deal1Damage);
		
		expect(function() {
			game.getActivePhase().action({
				type: 'play',
				id: c.id,
				target: 'bad target'
			});
		}).toThrow();
	});
});