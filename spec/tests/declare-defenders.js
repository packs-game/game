var Game = require('../../game');
var game;
var z;

describe('declare defenders phase', function() {
	beforeEach(function() {
		game = Game.createGame(players);
		z = game.zones;
	});

	// declare-defenders
	it('inactive player declares blocks and attacker and blocker are moved into a SHARED:COMBATS:COMBAT# zone in an ATTACKING & DEFENDING', function() {
		game.start();
		//disable the damage phase
		game.phases[4].enter = function() {
			game.cycleActivePhase();
		};
		game.phases[5].enter = function() {
			//disable cleanup
		};

		var creatures = playCreatures(game, z);
		game.getActivePhase().action(null, true); //pass main
		game.getActivePhase().action(null, true); //pass attack
		game.getActivePhase().action(null, true); //pass 2nd main
		expect(game.getActivePhase().name).toBe('main');
		var creatures2 = playCreatures(game, z);
		game.getActivePhase().action(null, true);
		game.getActivePhase().action(null, true);
		game.getActivePhase().action(null, true);
		expect(game.getActivePhase().name).toBe('main');
		var activePlayer = game.activePlayer;
		game.getActivePhase().action(null, true); //pass main
		declareAttacks(game, z, creatures);

		expect(game.activePlayer).not.toEqual(activePlayer);
		expect(game.getActivePhase().name).toBe('declare-defenders');

		declareBlocks(game, z, creatures2, creatures);

		expect(z.getZone('shared:battle').getCards().length).toBe(0);
		expect(z.getZone('shared:combats').getCards().length).toBe(4);
		var totalZones = 0;
		z.getZone('shared:combats').forEach(function(zone) {
			expect(zone.getCards().length).toBe(2);
			totalZones++;
		});
		expect(totalZones).toBe(2);

	});

	it('should skip phase if there are nothing in both the shared:battle and shared:combats zones', function() {
		game.start();
		game.getActivePhase().action(null, true); //pass main
		game.getActivePhase().action(null, true); //pass attack
		expect(game.getActivePhase().name).toBe('second-main');
	});

	it('cant block with tapped creatures', function() {
		game.start();
		var creatures = playCreatures(game, z);
		game.getActivePhase().action(null, true);
		declareAttacks(game, z, creatures);
		game.getActivePhase().action(null, true); //pass block
		game.getActivePhase().action(null, true); //pass 2nd main
		
		var creatures2 = playCreatures(game, z);
		game.getActivePhase().action(null, true);
		declareAttacks(game, z, creatures2);


		expect(function() {declareBlocks(game, z, creatures, creatures2);}).toThrow(new Error('invalid block'));
	});

	it('should allow for multiblocks', function() {
		game.start();
		game.start();
		game.phases[4].enter = function() {
			game.cycleActivePhase();
		}; //disable the damage phase
		game.phases[5].enter = function() {
		}; //disable the zone and stack cleanup

		var creatures = playCreatures(game, z);
		game.getActivePhase().action(null, true); //pass main
		game.getActivePhase().action(null, true); //pass attack
		game.getActivePhase().action(null, true); //pass 2nd main
		expect(game.getActivePhase().name).toBe('main');
		var creatures2 = playCreatures(game, z);
		game.getActivePhase().action(null, true);
		game.getActivePhase().action(null, true);
		game.getActivePhase().action(null, true);
		expect(game.getActivePhase().name).toBe('main');
		var activePlayer = game.activePlayer;
		game.getActivePhase().action(null, true); //pass main
		declareAttacks(game, z, creatures);

		expect(game.activePlayer).not.toEqual(activePlayer);
		expect(game.getActivePhase().name).toBe('declare-defenders');

		game.getActivePhase().action([{id: creatures2[0].id, target: creatures[0].id}, {id: creatures2[1].id, target: creatures[0].id}]);

		expect(z.getZone('shared:battle').getCards().length).toBe(1);
		expect(z.getZone('shared:combats').getCards().length).toBe(3);
		var totalZones = 0;
		z.getZone('shared:combats').forEach(function(zone) {
			expect(zone.getCards().length).toBe(3);
			totalZones++;
		});
		expect(totalZones).toBe(1);

	});
});