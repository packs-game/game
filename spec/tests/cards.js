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
		var mainframe = z.getZone('player-' + game.activePlayer).getStack('mainframe');
		mainframe.damage = 5;
		var c = hand.add(cards.cards.salve);

		game.getActivePhase().action({
			type: 'play',
			id: c.id
		});

		expect(mainframe.damage).toBe(3);
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
		var game = Game.createGame(players);
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



	it('should not muck with other cards when things are played', function() {
		game.start();

		playHand(game, z);
		game.getActivePhase().action(null, true);
		game.getActivePhase().action(null, true);
		game.getActivePhase().action(null, true);
		expect(game.turn).toBe(2);

		z.getZone('player-' + game.getInactivePlayer() + ':hand').getStack('hand').getCards().forEach(function(c) {
			expect(c.previousZone).toBe('deck');
			expect(c.zone).toBe('hand');
		});
	});

	it('should fire when zone or stack are changed', function() {
		game.start();
		fireTotal = 0;

		function change(card) {
			fireTotal++;
		}
		game.events.on('card:zoneChange', change)
		game.events.on('card:stackChange', change)

		playHand(game, z);
		game.getActivePhase().action(null, true);
		game.getActivePhase().action(null, true);
		game.getActivePhase().action(null, true);
		expect(game.turn).toBe(2);
		expect(fireTotal).toBe(16);
	});
});