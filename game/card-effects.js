var tokenTemplates = {
	micro: {
		name: 'micro',
		power: 1
	},
	mini: {
		name: 'mini',
		power: 2
	},
	bot: {
		name: 'bot',
		power: 3
	},
	boom: {
		name: 'boom',
		power: 4
	}
};
function createCreatureToken(template, game) {
	var creature = new game.components.Card(tokenTemplates[template], game.events);
	game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature.id).add(creature);
	return creature;
}
function discard(card, game) {
	game.zones.getZone('player-' + game.activePlayer).getStack('discard').add(card);
}

function globalDamage(amnt, game) {
	var c = game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').getCards();
	c.forEach(function(card){
		game.dealDamage(card,amnt);
	});

	c = game.zones.getZone('shared:player-' + (game.activePlayer?0:1) + '-inplay').getCards();
	c.forEach(function(card){
		game.dealDamage(card,amnt);
	});
	
	game.resolveInplayDeaths();
}

function addEffects(game) {
	game.effects = {
		createCreatureToken: function(template) { createCreatureToken(template,game); },
		discard: function(card) { discard(card,game); },
		globalDamage: function(amnt) { globalDamage(amnt,game); }
	};
}
module.exports = addEffects;