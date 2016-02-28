var Game = require('../../game');
var game;
var z;
var cards;

describe('main phase', function() {
	beforeEach(function() {
		game = Game.createGame(players, require('../helpers/cards'));
		z = game.zones;
		cards = require('../helpers/cards');
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
		expect(z.getZone('player-' + game.activePlayer).getStack('turn-discard').cards.length).toBe(1);

	});
	it('should only allow 6 creatures in play', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');

		var i = 0;
		while (i < 6) {
			var card = hand.add(cards.allCardsMap['MicroBot.exe']);
			game.getActivePhase().action({
				type: 'play',
				id: card.id
			});
			i++;
		}
		expect(z.getZone('shared:player-'+game.activePlayer+'-inplay').getCards().length).toBe(6);

		expect(function() {
			var card = hand.add(cards.allCardsMap['MicroBot.exe']);
			game.getActivePhase().action({
				type: 'play',
				id: card.id
			});
		}).toThrow();

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
	it('a bot should have a timestamp', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');

		var card = hand.add(createCreatureCard);

		game.getActivePhase().action({
			type: 'play',
			id: card.id
		});
		expect(z.getZone('shared:player-' + game.activePlayer + '-inplay').getCards()[0].enterPlayTS).toBeTruthy();
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
	it('should reduce the # of copies when buy happens', function() {
		game.start();
		var toBuy = z.getZone('shared:to-buy').getStack('buy1').cards[0];
		expect(toBuy.copies).toBe(4);
		game.getActivePhase().action({
			type: 'buy',
			id: toBuy.id
		});

		expect(toBuy.copies).toBe(3);

	});
	it('should remove the card when buy happens and copies is at 1', function() {
		game.start();
		var toBuy = z.getZone('shared:to-buy').getStack('buy1').cards[0];
		toBuy.copies = 1;
		game.getActivePhase().action({
			type: 'buy',
			id: toBuy.id
		});
		expect(z.getCard(toBuy.id)).toBe(null);
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
});