var lib = require('packs-lib');

var allCards = [];
var allCardsMap = {};
var loaded = false;
var cbs = [];

function load() {
	lib.api.getCards(function(err,cards){
		if (err) { return setTimeout(load, 1000);}
		cards.forEach(function(card){
			allCards.push(card);
			allCardsMap[card.name] = card;
		});
		loaded = true;
		cbs.forEach(function(cb){cb();});
	});
}

function onLoad(cb) {
	if (loaded) { return cb(); }
	cbs.push(cb);
}

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

load();

module.exports = {
	loaded: loaded,
	onLoad: onLoad,
	generatePack: generatePack,
	allCards: allCards,
	allCardsMap: allCardsMap
};