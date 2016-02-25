//deal x to player
// 2 - 2 pts (1/1, 0/2)
// 3 - 3 pts (2/1, 1/2)
// 4 - 4 pts (1/3, 2/2, 3,1)
// 5 - 5 pts (1/4, 2/3, 3/2, 4/1)
// 6 - 6 pts (3/3)
// 7 - 8 pts (4/4)
// 8 - 10 pts (5/5)

// 4 - 2pts split (2x 0/1) 
// 5 - 3pts split (1/1+0/1)
// 6 - 4pts split (2x 1/1)
// 7 - 6pts split (1/2, 2/1)
// 8 - 8pts split (2/2,2/2)

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
	cost: 2,
	tier: 1,
	name: 'MicroBot.exe',
	type: 'program',
	text: 'Deploy a 1/1 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('micro');
		//move to discard
		game.effects.discard(this);
	}
};
var createCreatureDefender = {
	cost: 2,
	tier: 1,
	name: 'MicroDefender.exe',
	type: 'program',
	text: 'Deploy a 0/2 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('microdefender');
		//move to discard
		game.effects.discard(this);
	}
};
var deal1Damage = {
	cost: 2,
	tier: 1,
	name: 'Terminate',
	type: 'action',
	img: 'bolt.png',
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
	cost: 2,
	tier: 1,
	name: 'Enhance',
	type: 'action',
	img: 'enhance.png',
	text: 'Give a bot you\ncontrol +1/+1.',
	targets: function(game, targetId) {
		var card = game.zones.getZone('shared:player-'+game.activePlayer+'-inplay').getCard(targetId);
		return card;
	},
	targetZonePattern: 'player-(self)-inplay',
	resolve: function(game, target){
		target.power += 1;
		target.toughness += 1;
		game.effects.discard(this);
	}

};
var createPower2Creature = {
	cost: 3,
	tier: 1,
	name: 'MiniAggroBot.exe',
	type: 'program',
	text: 'Deploy a 2/1 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('miniaggro');
		//move to discard
		game.effects.discard(this);
	}
};
var createToughness2Creature = {
	cost: 3,
	tier: 1,
	name: 'MiniDefenderBot.exe',
	type: 'program',
	text: 'Deploy a 1/2 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('minidefender');
		//move to discard
		game.effects.discard(this);
	}
};
var createToughness3Creature = {
	cost: 4,
	tier: 1,
	name: 'BackBot.exe',
	type: 'program',
	text: 'Deploy a 1/3 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('backbot');
		//move to discard
		game.effects.discard(this);
	}
};
var create22Creature = {
	cost: 4,
	tier: 1,
	name: 'Bot.exe',
	type: 'program',
	text: 'Deploy a 2/2 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('bot');
		//move to discard
		game.effects.discard(this);
	}
};
var create3PowerCreature = {
	cost: 4,
	tier: 1,
	name: 'Bot.exe',
	type: 'program',
	text: 'Deploy a 3/1 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('attackbot');
		//move to discard
		game.effects.discard(this);
	}
};

/*TIER 2*/
var create41 = {
	cost: 5,
	tier: 2,
	name: '41bot.exe',
	type: 'program',
	text: 'Deploy a 4/1 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('bot41');
		//move to discard
		game.effects.discard(this);
	}
};
var create14 = {
	cost: 5,
	tier: 2,
	name: '14bot.exe',
	type: 'program',
	text: 'Deploy a 1/4 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('bot14');
		//move to discard
		game.effects.discard(this);
	}
};
var create32 = {
	cost: 5,
	tier: 2,
	name: '32Bot.exe',
	type: 'program',
	text: 'Deploy a 3/2 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('bot32');
		//move to discard
		game.effects.discard(this);
	}
};
var create23 = {
	cost: 5,
	tier: 2,
	name: '23Bot.exe',
	type: 'program',
	text: 'Deploy a 2/3 bot.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('bot23');
		//move to discard
		game.effects.discard(this);
	}
};
var bangbot = {
	cost: 6,
	tier: 2,
	name: 'Bangbot.exe',
	type: 'program',
	text: 'Deploy a 3/3 bot.',
	resolve: function(game) {
		game.effects.createCreatureToken('bang');
		//move to discard
		game.effects.discard(this);
	}
};
var salve = {
	cost: 4,
	tier: 2,
	name: 'Repair',
	type: 'action',
	img: 'repair.png',
	text: 'Repair 2 damage\nto your mainframe.',
	resolve: function(game) {
		var target = game.zones.getZone('player-'+game.activePlayer).getStack('mainframe');
		target.damage -= 2;
		if (target.damage < 0) { target.damage = 0; }
		//move to discard
		game.effects.discard(this);
	}
};
var draw2 = {
	cost: 4,
	tier: 2,
	name: 'Dig',
	img: 'book.png',
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
	cost: 4,
	tier: 2,
	name: 'Dome',
	type: 'action',
	img: 'dome.png',
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
	cost: 6,
	tier: 3,
	name: 'DoubleMicro.exe',
	type: 'program',
	text: 'Deploy two\n1/1 bots.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('micro');
		game.effects.createCreatureToken('micro');
		//move to discard
		game.effects.discard(this);
	}
};
var create22PowerCreature = {
	cost: 8,
	tier: 3,
	name: 'DoubleMini.exe',
	type: 'program',
	text: 'Deploy two\n2/2 bots.',
	resolve: function(game) {
		//create the creature
		game.effects.createCreatureToken('mini');
		game.effects.createCreatureToken('mini');
		//move to discard
		game.effects.discard(this);
	}
};
var boombot = {
	cost: 7,
	tier: 3,
	name: 'Boombot.exe',
	type: 'program',
	text: 'Deploy a 4/4 bot.',
	resolve: function(game) {
		game.effects.createCreatureToken('boom');
		//move to discard
		game.effects.discard(this);
	}
};
var fivefive = {
	cost: 8,
	tier: 3,
	name: 'FiverBot.exe',
	type: 'program',
	text: 'Deploy a 5/5 bot.',
	resolve: function(game) {
		game.effects.createCreatureToken('fivefive');
		//move to discard
		game.effects.discard(this);
	}
};


var miniclasm = {
	cost: 6,
	tier: 3,
	name: 'Jolt',
	type: 'action',
	img: 'multibolt.png',
	text: 'Deal 1 damage\nto all bots.',
	resolve: function(game) {
		game.effects.globalDamage(1);
		//move to discard
		game.effects.discard(this);
	}
};
var pyroclasm = {
	cost: 7,
	tier: 3,
	name: 'Crash',
	img: 'bigbolt.png',
	type: 'action',
	text: 'Deal 3 damage\nto all bots. Delete this.',
	resolve: function(game) {
		game.effects.globalDamage(3);
		game.effects.deleteCard(this);
	}
};
var anthem = {
	cost: 5,
	tier: 3,
	name: 'Empower',
	type: 'action',
	text: 'Give all your\nbots +2/+2.\nDelete this.',
	resolve: function(game) {
		game.effects.globalEnhance(2);
		game.effects.deleteCard(this);
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
			toughness: 20,
			type: 'token'
		}, game.events);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature.id).add(creature);
		//move to discard
		game.effects.discard(this);
	}
};


//AI
var einstein = {
	cost: 6,
	tier: 4,
	name: 'Albert Einstein',
	type: 'ai',
	power: 2,
	toughness: 8,
	text: 'etb: Your bots\ngain +0/+2',
	img: 'einstein.png',
	resolve: function(game) {
		game.effects.globalToughnessEnhance(2);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(this.id).add(this);
	}
};
var khan = {
	cost: 7,
	tier: 4,
	name: 'Genghis Khan',
	type: 'ai',
	power: 2,
	toughness: 8,
	text: 'etb: Your bots\ngain +3/+0',
	img: 'khan.png',
	resolve: function(game) {
		game.effects.globalPowerEnhance(3);
		game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(this.id).add(this);
	}
};

var allCards = [
//TIER1
	basicGain1,
	//createCreature,
	//createCreatureDefender,
	deal1Damage,
	givePlus1,
	createPower2Creature,
	createToughness2Creature,
	createToughness3Creature,
	create22Creature,
	create3PowerCreature,

//TIER2
	salve,
	draw2,
	dome2,
	create14,
	create41,
	create23,
	create32,
	bangbot,

//TIER3
	create21PowerCreature,
	create22PowerCreature,
	boombot,
	fivefive,

	miniclasm,
	pyroclasm,
	anthem,

//AI
	einstein,
	khan
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
	var c4 = randomTier(3,excludeNames);
	excludeNames.push(c4.name);
	var c5 = randomTier(4,excludeNames);

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
		salve: salve,
		einstein: einstein
	}
};