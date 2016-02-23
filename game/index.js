var GameComponents = require('deck-game-components');

GameComponents.components.Stack.prototype.damage = 0;
GameComponents.components.Card.prototype.tapped = false;
GameComponents.components.Card.prototype.owner = null;

GameComponents.components.Game.prototype.PLAYERHEALTH = 20;

GameComponents.components.Game.prototype.getActivePlayerCurrency = function() {
		return this.zones.getZone('player-' + this.activePlayer).getStack('currency').cards.length;
};
GameComponents.components.Game.prototype.spendActivePlayerCurrency = function(amount) {
	while (amount > 0) {
		c = this.zones.getZone('player-' + this.activePlayer).getStack('currency').draw();
		this.zones.getZone('player-' + this.activePlayer).getStack('discard').add(c);
		amount--;
	}
};
GameComponents.components.Game.prototype.buy = function(cardId) {
	if (!cardId) { throw new Error('No card passed to buy'); }

	var toBuy;
	var cards = this.zones.getZone('shared:to-buy').getCards();
	cards.forEach(function(c){
		if (c.id === cardId) {
			toBuy = c;
		}
	});
	if (!toBuy) { throw Error('Not a valid buy'); }
	if (!toBuy.cost) { toBuy.cost = 0; }

	if (toBuy.cost <= this.getActivePlayerCurrency()) {
		var card = this.zones.getZone('shared:to-buy').getStack(toBuy.stack).getCard(toBuy.id, true);
		var copy = new this.components.Card(card, this.events);
		
		card.copies -= 1;
		if (card.copies > 0) {
			this.zones.getZone('shared:purchase').getStack('packs').add(card, 'random');
		}
		this.zones.getZone('player-' + this.activePlayer).getStack('discard').add(copy);
		this.spendActivePlayerCurrency(card.cost);
	} else {
		throw Error('Invalid currency to perform buy');
	}
	
};
GameComponents.components.Game.prototype.resolveInplayDeaths = function() {
	var self = this;
	self.players.forEach(function(p,i){
		var inPlay = self.zones.getZone('shared:player-'+i+'-inplay').getCards();
		inPlay.forEach(function(c){
			if (c.power === 0) {
				//kill it
				self.zones.getZone('shared:player-'+i+'-inplay').getStack(c.stack).getCard(c.id, true);
				//TODO move other stuff in the stack?
				
				//remove its in play stack
				self.zones.getZone('shared:player-'+i+'-inplay').removeStack(c.stack);
			}
		});
	});

	self.checkGameOver();
};

GameComponents.components.Game.prototype.checkGameOver = function() {
	var self = this;
	self.players.forEach(function(p,i){
		//check loss
		var mainframe = self.zones.getZone('player-'+i).getStack('mainframe');
		if (mainframe.damage >= self.PLAYERHEALTH) {
			p.loss = true;
			self.ended = true;
		}
	});
	if(self.ended) {
		self.players.forEach(function(p){
			if (!p.loss) {
				p.win = true;
			}
		});
		this.events.emit('game:over', self.players);
	}
};

GameComponents.components.Game.prototype.dealDamage = function(card, amnt) {
	card.power -= amnt;
	if (card.power < 0) { card.power = 0; }
};

GameComponents.components.Game.prototype.resolveCombatDamage = function() {
	var game = this;
	var battleZone = game.zones.getZone('shared:battle');
	var combatsZone = game.zones.getZone('shared:combats');
	//resolve damage between creatures
	combatsZone.forEach(function(zone) {
		var attackerTotal = 0;
		var defenderTotal = 0;
		zone.getStack('attackers').cards.forEach(function(c) {
			attackerTotal += c.power;
		});
		zone.getStack('defenders').cards.forEach(function(c) {
			defenderTotal += c.power;
			game.dealDamage(c,attackerTotal);
		});
		zone.getStack('attackers').cards.forEach(function(c) {
			game.dealDamage(c,defenderTotal);
		});
	});
	//resolve damage dealt to node/mainframe stacks
	battleZone.getCards().forEach(function(c) {
		var inactivePlayer = game.activePlayer ? 0 : 1;
		var target = game.zones.getZone('player-'+inactivePlayer).getStack(c.target);
		target.damage += c.power;
	});

	//move all creatures back to their owners inplay
	battleZone.getCards().forEach(function(c){
		var removedCard = battleZone.getStack(c.stack).getCard(c.id, true);
		game.zones.getZone('shared:player-' + c.owner + '-inplay').getStack(c.id).add(removedCard);
	});
	combatsZone.getCards().forEach(function(c){
		var removedCard = combatsZone.getZone(c.zone).getStack(c.stack).getCard(c.id, true);
		game.zones.getZone('shared:player-' + c.owner + '-inplay').getStack(c.id).add(removedCard);
	});
};

GameComponents.components.Game.prototype.shuffleDiscard = function() {
	var game = this;
	var discard = game.zones.getZone('player-'+game.activePlayer).getStack('discard');
	if (!discard.cards.length) { return; } //no cards to shuffle back in
	discard.shuffle();
	game.zones.getZone('player-'+game.activePlayer+':deck').getStack('deck').add(discard.cards);
	game.zones.getZone('player-'+game.activePlayer).getStack('discard').empty();
};

GameComponents.components.Game.prototype.activeDraw = function() {
	var game = this;
	var hand = game.zones.getZone('player-'+game.activePlayer+':hand').getStack('hand');
	var card = game.zones.getZone('player-' + game.activePlayer + ':deck').getStack('deck').draw();
	if (!card) {
		game.shuffleDiscard();
		card = game.zones.getZone('player-' + game.activePlayer + ':deck').getStack('deck').draw();
	}
	if (!card) {
		//no cards to shuffle in and continue drawing
		return false;
	}
	
	hand.add(card);
	return true;
};

GameComponents.components.Game.prototype.getInactivePlayer = function() {
	return this.activePlayer ? 0 : 1;
};

GameComponents.components.Game.prototype.serializeAs = function(playerId) {
	var playerIndex;
	this.players.forEach(function(p, i){
		if (p.id === playerId) {
			playerIndex = i;
		}
	});
	var dump = this.serialize();
	return dump;
};

//map of tier # to how many copies show up in the buy
GameComponents.components.Game.prototype.copyMap = [null,4,3,2];

var phases = require('./phases');
var addZones = require('./zones-stacks');
var cardEffects = require('./card-effects');


function onStart() {
	var self = this;
	//shuffle the purchase
	this.zones.getZone('shared:purchase').getStack('packs').shuffle();

	//Flip the top 3 cards of the PURCHASE to stacks BUY1 BUY2 and BUY3
	c1 = this.zones.getZone('shared:purchase').getStack('packs').draw();
	this.zones.getZone('shared:to-buy').getStack('buy1').add(c1);
	c2 = this.zones.getZone('shared:purchase').getStack('packs').draw();
	this.zones.getZone('shared:to-buy').getStack('buy2').add(c2);
	c3 = this.zones.getZone('shared:purchase').getStack('packs').draw();
	this.zones.getZone('shared:to-buy').getStack('buy3').add(c3);

	//Each player draws 4 cards
	var toDraw = 4;
	
	this.players.forEach(function(p,pIndex){
		var i = 0;
		while (i < 4) {
			var card = self.zones.getZone('player-'+pIndex+':deck').getStack('deck').draw();
			self.zones.getZone('player-'+pIndex+':hand').getStack('hand').add(card);
			i++;
		}
	});

	//make sure we give cards an owner
	self.events.on('card:created', function(card){
		card.owner = self.activePlayer;
	});
}

module.exports = {
	createGame: function(players) {
		var game = new GameComponents.createGame({
			onStart: onStart
		});
		phases(game);
		addZones(game, players);
		cardEffects(game);
		return game;
	}
};