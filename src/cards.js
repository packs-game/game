var basicGain1 = {
	cost: 0,
	name: 'BASIC-GAIN-1',
	resolve: function(game) {
		//adds itself to the currency stack
		game.zones.getZone('player-' + game.activePlayer).getStack('currency').add(this);
	}
};
var createCreature = {
	cost: 1,
	name: 'Micro Bot',
	resolve: function(game) {
		//create the creature
		var creature = new game.components.Card({
			name: 'micro',
			power: 1
		}, game.events);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature.id).add(creature);
		//move to discard
		game.zones.getZone('player-' + game.activePlayer).getStack('discard').add(this);
	}
};
var brokenCreature = {
	cost: 1,
	name: 'Broken',
	resolve: function(game) {
		//create the creature
		var creature = new game.components.Card({
			name: 'broken',
			power: 20
		}, game.events);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature.id).add(creature);
		//move to discard
		game.zones.getZone('player-' + game.activePlayer).getStack('discard').add(this);
	}
};
function generatePack() {
	return [createCreature, createCreature, createCreature, createCreature, createCreature];
}

module.exports = {
	generatePack: generatePack,
	cards: {
		basicGain1: basicGain1,
		createCreature: createCreature,
		brokenCreature: brokenCreature
	}
};