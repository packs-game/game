//deal x to player

var basicGain1 = {
	tier: 0,
	cost: 0,
	type: 'currency',
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
	type: 'program',
	text: 'Deploy a 1-power bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('micro');
		//move to discard
		game.effects.discard(this);
	}
};
var deal1Damage = {
	cost: 1,
	tier: 1,
	name: 'Terminate',
	type: 'action',
	text: 'Deal 1 damage\nto an enemy bot.',
	targets: function(game, targetId) {
		var card = game.zones.getZone('shared:player-'+(game.activePlayer?0:1)+'-inplay').getCard(targetId);
		return card;
	},
	targetZonePattern: 'player-(opponent)-inplay',
	resolve: function(game, target){
		game.dealDamage(target,1);
		game.resolveInplayDeaths();
		game.effects.discard(this);
	}

};
var givePlus1 = {
	cost: 1,
	tier: 1,
	name: 'Enhance',
	type: 'action',
	text: 'Give a bot you\ncontrol +1 power.',
	targets: function(game, targetId) {
		var card = game.zones.getZone('shared:player-'+game.activePlayer+'-inplay').getCard(targetId);
		return card;
	},
	targetZonePattern: 'player-(self)-inplay',
	resolve: function(game, target){
		target.power += 1;
		game.effects.discard(this);
	}

};
var createPower2Creature = {
	cost: 2,
	tier: 1,
	name: 'MiniBot.exe',
	type: 'program',
	text: 'Deploy a 2-power bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('mini');
		//move to discard
		game.effects.discard(this);
	}
};



/*TIER 2*/
var salve = {
	cost: 2,
	tier: 2,
	name: 'Repair',
	type: 'action',
	text: 'Repair 2 damage\nto your mainframe.',
	resolve: function(game) {
		var target = game.zones.getZone('player-'+game.activePlayer).getStack('mainframe');
		target.damage -= 2;
		if (target.damage < 0) { target.damage = 0; }
		//move to discard
		game.effects.discard(this);
	}
};
var createPower3Creature = {
	cost: 3,
	tier: 2,
	name: 'Bot.exe',
	type: 'program',
	text: 'Deploy a 3-power bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('bot');
		//move to discard
		game.effects.discard(this);
	}
};
var draw2 = {
	cost: 2,
	tier: 2,
	name: 'Dig',
	type: 'action',
	text: 'Draw 2 cards.',
	resolve: function(game) {
		game.activeDraw();
		game.activeDraw();
		//move to discard
		game.effects.discard(this);
	}
};
var dome2 = {
	cost: 2,
	tier: 2,
	name: 'Dome',
	type: 'action',
	text: 'Deal 2 damage\nto the opponent.',
	resolve: function(game) {
		var inactivePlayer = game.activePlayer ? 0 : 1;
		var target = game.zones.getZone('player-'+inactivePlayer).getStack('mainframe');
		target.damage += 2;
		//move to discard
		game.checkGameOver();
		game.effects.discard(this);
	}
};


/*TIER 3*/
var create21PowerCreature = {
	cost: 3,
	tier: 3,
	name: 'DoubleMicro.exe',
	type: 'program',
	text: 'Deploy two\n1-power bots.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('micro');
		game.effects.createCreatureToken('micro');
		//move to discard
		game.effects.discard(this);
	}
};
var create22PowerCreature = {
	cost: 4,
	tier: 3,
	name: 'DoubleMini.exe',
	type: 'program',
	text: 'Deploy two\n2-power bots.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('mini');
		game.effects.createCreatureToken('mini');
		//move to discard
		game.effects.discard(this);
	}
};
var boombot = {
	cost: 4,
	tier: 3,
	name: 'Boombot.exe',
	type: 'program',
	text: 'Deploy a 4-power bot.',
	resolve: function(game) {
		game.effects.createCreatureToken('boom');
		//move to discard
		game.effects.discard(this);
	}
};
var pyroclasm = {
	cost: 7,
	tier: 3,
	name: 'Crash',
	type: 'action',
	text: 'Deal 2 damage\nto all bots.',
	resolve: function(game) {
		game.effects.globalDamage(2);
		//move to discard
		game.effects.discard(this);
	}
};
var miniclasm = {
	cost: 5,
	tier: 3,
	name: 'Jolt',
	type: 'action',
	text: 'Deal 1 damage\nto all bots.',
	resolve: function(game) {
		game.effects.globalDamage(1);
		//move to discard
		game.effects.discard(this);
	}
};
//semi-symetrical draw effect

var brokenCreature = {
	cost: 1,
	tier: 3,
	name: 'Broken',
	type: 'program',
	resolve: function(game) {
		//create the creature
		var creature = new game.components.Card({
			name: 'broken',
			power: 20,
			type: 'token'
		}, game.events);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature.id).add(creature);
		//move to discard
		game.effects.discard(this);
	}
};

var allCards = [
	basicGain1,
	createCreature,
	deal1Damage,
	givePlus1,
	createPower2Creature,
	salve,

	createPower3Creature,
	draw2,
	dome2,

	create21PowerCreature,
	create22PowerCreature,
	miniclasm,
	pyroclasm,
	boombot
];

function randomTier(tier, excludeNames) {
	var tierCards = [];
	allCards.forEach(function(c){
		if (c.tier === tier && excludeNames.indexOf(c.name) === -1) {
			tierCards.push(c);
		}
	});
	return tierCards[Math.floor(Math.random()*tierCards.length)];
}

function generatePack(excludeNames) {
	excludeNames = excludeNames || [];
	var c1 = randomTier(1,excludeNames);
	excludeNames.push(c1.name);
	var c2 = randomTier(1,excludeNames);
	excludeNames.push(c2.name);
	var c3 = randomTier(2,excludeNames);
	excludeNames.push(c3.name);
	var c4 = randomTier(2,excludeNames);
	excludeNames.push(c4.name);
	var c5 = randomTier(3,excludeNames);

	return [
		c1,
		c2,
		c3,
		c4,
		c5
	];

}

module.exports = {
	allCards: allCards,
	generatePack: generatePack,
	cards: {
		basicGain1: basicGain1,
		createCreature: createCreature,
		brokenCreature: brokenCreature,
		deal1Damage: deal1Damage,
		givePlus1: givePlus1,
		salve: salve
	}
};