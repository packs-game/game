function addEffects(game) {
	game.effects = {
		createCreatureToken: function(template) { return createCreatureToken(template,game); },
		discard: function(card) { return discard(card,game); },
		globalDamage: function(amnt) { return globalDamage(amnt,game); },
		globalEnhance: function(amnt) { return globalEnhance(amnt,game); },
		deleteCard: function(card) { return deleteCard(card,game); }
	};
}

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
	creature.type = 'token';
	creature.summoningSick = true;
	game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(creature.id).add(creature);
	return creature;
}
function discard(card, game) {
	game.zones.getZone('player-' + game.activePlayer).getStack('turn-discard').add(card);
}
function deleteCard(card, game) {
	game.zones.getZone('deleted').getStack('deleted').add(card);
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
function globalEnhance(amnt,game) {
	var c = game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').getCards();
	c.forEach(function(card){
		card.power +=1;
	});
}
module.exports = addEffects;