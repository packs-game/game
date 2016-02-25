var cards;
function addEffects(game, cardPool) {
	cards = cardPool;
	game.effects = {
		createCreatureToken: function(template) { return createCreatureToken(template,game); },
		addCardToCurrency: function(template) { return addCardToCurrency(template, game); },
		addCardToDiscard: function(template) { return addCardToDiscard(template, game); },
		
		globalEnhance: function(amnt) { return globalEnhance(amnt,game); },
		globalToughnessEnhance: function(amnt) { return globalToughnessEnhance(amnt,game); },
		globalPowerEnhance: function(amnt) { return globalPowerEnhance(amnt,game); },
		buff: function(amnt,target) { return buff(amnt,target,game); },
		
		globalDamage: function(amnt) { return globalDamage(amnt,game); },
		targetedDamage: function(amnt,target) { return targetedDamage(amnt,target,game); },
		
		activeDraw: function() { return game.activeDraw(); },
		heal: function(amnt) { return heal(amnt,game); },
		dome: function(amnt) { return dome(amnt,game); },
		
		moveCurrency: function(card) { return moveCurrency(card, game); },
		putIntoPlay: function(card) { return putIntoPlay(card,game); },
		discard: function(card) { return discard(card,game); },
		deleteCard: function(card) { return deleteCard(card,game); }
	};
}
function addCardToZone(template,zone,stack,game) {
	var card = new game.components.Card(cards.allCardsMap[template], game.events);
	game.zones.getZone(zone).getStack(stack).add(card);
}
function addCardToCurrency(template, game) {
	addCardToZone(template, 'player-' + game.activePlayer, 'currency', game);
}
function addCardToDiscard(template, game) {
	addCardToZone(template, 'player-' + game.activePlayer, 'discard', game);
}
function moveCurrency(card,game) {
	game.zones.getZone('player-' + game.activePlayer).getStack('currency').add(card);
}

function putIntoPlay(card,game) {
	card.summoningSick = true;
	game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').addStack(card.id).add(card);
}
function createCreatureToken(template, game) {
	var creature = new game.components.Card(cards.allCardsMap[template], game.events);
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

function targetedDamage(amnt,target,game) {
	game.dealDamage(target,amnt);
	game.resolveInplayDeaths();
}

function buff(amnt,target,game) {
	target.power += amnt;
	target.toughness += amnt;
}

function heal(amnt, game) {
	var target = game.zones.getZone('player-'+game.activePlayer).getStack('mainframe');
	target.damage -= 2;
	if (target.damage < 0) { target.damage = 0; }
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
		card.power +=amnt;
		card.toughness +=amnt;
	});
}
function globalToughnessEnhance(amnt, game) {
	var c = game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').getCards();
	c.forEach(function(card){
		card.toughness +=amnt;
	});
}
function globalPowerEnhance(amnt, game) {
	var c = game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').getCards();
	c.forEach(function(card){
		card.power +=amnt;
	});
}

function dome(amnt,game) {
	var inactivePlayer = game.activePlayer ? 0 : 1;
	var target = game.zones.getZone('player-'+inactivePlayer).getStack('mainframe');
	target.damage += amnt;
	game.checkGameOver();
}

module.exports = addEffects;