var Game = require('../../game');
var game;
var z;

describe('declare attackers phase', function() {
	beforeEach(function() {
		game = Game.createGame(players, require('../helpers/cards'));
		z = game.zones;
	});
	
	it('should be declare-attackers after main', function() {
		game.start();
		game.getActivePhase().action(null, true);

		expect(game.getActivePhase().name).toBe('declare-attackers');
	});
	it('active player can declare which bots are attacking and they should be moved to the shared:battle zone', function() {
		game.start();
		var creatures = playCreatures(game, z);
		game.getActivePhase().action(null, true);

		declareAttacks(game, z, creatures);

		expect(z.getZone('shared:battle').getCards().length).toBe(2);
		expect(z.getZone('shared:player-' + game.activePlayer + '-inplay').getCards().length).toBe(0);
	});

	it('active player can declare which bots are attacking which nodes or mainframe', function() {
		game.start();
		var creatures = playCreatures(game, z);
		game.getActivePhase().action(null, true);

		declareAttacks(game, z, creatures);
		expect(z.getZone('shared:battle').getCards()[0].target).toBe('mainframe');
		expect(z.getZone('shared:battle').getCards()[1].target).toBe('mainframe');
	});

	it('attacking bots are tapped', function() {
		game.start();
		var creatures = playCreatures(game, z);
		game.getActivePhase().action(null, true);

		declareAttacks(game, z, creatures);
		expect(z.getZone('shared:battle').getCards()[0].tapped).toBe(true);
		expect(z.getZone('shared:battle').getCards()[1].tapped).toBe(true);
	});
	it('cant attack with tapped bots', function() {
		game.start();
		var creatures = playCreatures(game, z);
		game.getActivePhase().action(null, true);
		creatures[0].tapped = true;

		expect(function() {declareAttacks(game, z, creatures)}).toThrow(new Error('invalid attack'));
		
	});

	it('combat shouldnt change a timestamp', function() {
		game.start();
		var creatures = playCreatures(game, z);
		var origts = game.zones.getZone('shared:player-'+game.activePlayer+'-inplay').getCards()[0].enterPlayTS;
		game.getActivePhase().action(null, true);

		declareAttacks(game, z, creatures);

		game.getActivePhase().action(null,true);
		var ts = game.zones.getZone('shared:player-'+game.activePlayer+'-inplay').getCards()[0].enterPlayTS;
		expect(origts).toBe(ts);
	});
});