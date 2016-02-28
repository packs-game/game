var Game = require('../../game');
var game;
var z;
var cards;

describe('cards', function() {
	beforeEach(function() {
		game = Game.createGame(players, require('../helpers/cards'));
		z = game.zones;
		cards = require('../helpers/cards');
	});

	//main
	it('should give a bot +1', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		var c = hand.add(cards.cards.givePlus1);
		var token = game.effects.createCreatureToken('micro');
		game.getActivePhase().action({
			type: 'play',
			id: c.id,
			target: token.id
		});

		expect(z.getCard(token.id).power).toBe(2);
		expect(z.getCard(token.id).toughness).toBe(2);
	});
	it('should heal 2', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		var mainframe = z.getZone('player-' + game.activePlayer).getStack('mainframe').getCards()[0];
		mainframe.toughness -= 5;
		var c = hand.add(cards.cards.salve);

		game.getActivePhase().action({
			type: 'play',
			id: c.id
		});

		expect(mainframe.toughness).toBe(17);
	});

	it('should not return dupes on a pack', function() {
		var p1 = cards.generatePack();
		var names = [];
		p1.forEach(function(c) {
			names.push(c.name);
		});
		var p2 = cards.generatePack(names);
		var players = [{
			name: 'p1',
			pack: p1
		}, {
			name: 'p2',
			pack: p2
		}];
		var game = Game.createGame(players, cards);
		var c = game.zones.getZone('shared:purchase').getStack('packs').getCards();
		var cardNames = [];
		expect(function() {
			c.forEach(function(c) {
				if (cardNames.indexOf(c.name) !== -1) {
					throw new Error('found dupes in packs');
				}
				cardNames.push(c.name);
			});
		}).not.toThrow();
	});

	it('may play a targeted card', function() {
		game.start();

		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		var c = hand.add(cards.cards.deal1Damage);
		game.getActivePhase().action(null,true);
		game.getActivePhase().action(null,true);
		game.getActivePhase().action(null,true);
		var token = game.effects.createCreatureToken('micro', game);
		var inplay = z.getZone('shared:player-' + game.activePlayer + '-inplay');

		expect(inplay.getCards().length).toBe(1);
		game.getActivePhase().action(null,true);
		game.getActivePhase().action(null,true);
		game.getActivePhase().action(null,true);

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

	it('should add a timestamp to an AI', function() {
		game.start();
		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		var c = hand.add(cards.cards.einstein);
		
		
		game.getActivePhase().action({
			type: 'play',
			id: c.id
		});
		expect(c.enterPlayTS).toBeTruthy();
	});

	it('AI should be summoning sick too', function() {
		game.start();
		var hand = z.getZone('player-' + game.activePlayer + ':hand').getStack('hand');
		var c = hand.add(cards.cards.einstein);
		
		game.getActivePhase().action({
			type: 'play',
			id: c.id
		});
		expect(c.summoningSick).toBeTruthy();
	});

	it('should add a new card to a currency zone', function() {
		game.start();
		game.effects.addCardToCurrency('BASIC-GAIN-1');
		expect(z.getZone('player-' +game.activePlayer).getStack('currency').getCards().length).toBe(1);
	})
	it('should add a new card to a discard zone', function() {
		game.start();
		game.effects.addCardToDiscard('BASIC-GAIN-1');
		expect(z.getZone('player-' +game.activePlayer).getStack('discard').getCards().length).toBe(1);
	})
});