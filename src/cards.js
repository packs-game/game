var basicGain1 = {
	tier: 0,
	cost: 0,
	name: 'BASIC-GAIN-1',
	resolve: function(game) {
		//adds itself to the currency stack
		game.zones.getZone('player-' + game.activePlayer).getStack('currency').add(this);
	}
};
var createCreature = {
	cost: 1,
	tier: 1,
	name: 'MicroBot.exe',
	text: 'Deploy a 1-power bot.',
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
var createPower2Creature = {
	cost: 2,
	tier: 1,
	name: 'MiniBot.exe',
	text: 'Deploy a 2-power bot.',
	resolve: function(game) {
		//create the creature
		var creature = new game.components.Card({
			name: 'mini',
			power: 2
		}, game.events);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature.id).add(creature);
		//move to discard
		game.zones.getZone('player-' + game.activePlayer).getStack('discard').add(this);
	}
};
var createPower3Creature = {
	cost: 3,
	tier: 2,
	name: 'Bot.exe',
	text: 'Deploy a 3-power bot.',
	resolve: function(game) {
		//create the creature
		var creature = new game.components.Card({
			name: 'bot',
			power: 3
		}, game.events);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature.id).add(creature);
		//move to discard
		game.zones.getZone('player-' + game.activePlayer).getStack('discard').add(this);
	}
};
var create21PowerCreature = {
	cost: 2,
	tier: 1,
	name: 'DoubleMicro.exe',
	text: 'Deploy two 1-power bots.',
	resolve: function(game) {
		//create the creature
		var creature = new game.components.Card({
			name: 'micro bot',
			power: 1
		}, game.events);
		var creature2 = new game.components.Card({
			name: 'micro bot',
			power: 1
		}, game.events);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature.id).add(creature);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature2.id).add(creature2);
		//move to discard
		game.zones.getZone('player-' + game.activePlayer).getStack('discard').add(this);
	}
};
var create22PowerCreature = {
	cost: 4,
	tier: 2,
	name: 'DoubleMini.exe',
	text: 'Deploy two 2-power bots.',
	resolve: function(game) {
		//create the creature
		var creature = new game.components.Card({
			name: 'mini bot',
			power: 2
		}, game.events);
		var creature2 = new game.components.Card({
			name: 'mini bot',
			power: 2
		}, game.events);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature.id).add(creature);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature2.id).add(creature2);
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

var allCards = [
	basicGain1,
	createCreature,
	createPower2Creature,
	createPower3Creature,
	create21PowerCreature,
	create22PowerCreature,
	brokenCreature,
];

function randomTier(tier) {
	var tierCards = [];
	allCards.forEach(function(c){
		if (c.tier === tier) {
			tierCards.push(c);
		}
	});
	return tierCards[Math.floor(Math.random()*tierCards.length)];
};

function generatePack() {
	return [randomTier(1), randomTier(1), randomTier(1), randomTier(2), randomTier(2)];
}

module.exports = {
	generatePack: generatePack,
	cards: {
		basicGain1: basicGain1,
		createCreature: createCreature,
		brokenCreature: brokenCreature
	}
};