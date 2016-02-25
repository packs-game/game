var allCards = require('./card-mock');

function randomTier(tier, excludeNames) {
	var tierCards = [];
	allCards.forEach(function(c) {
		if (c.tier === tier && excludeNames.indexOf(c.name) === -1) {
			tierCards.push(c);
		}
	});
	return tierCards[Math.floor(Math.random() * tierCards.length)];
}

function generatePack(excludeNames) {
	excludeNames = excludeNames || [];
	var c1 = randomTier(1, excludeNames);
	excludeNames.push(c1.name);
	var c2 = randomTier(1, excludeNames);
	excludeNames.push(c2.name);
	var c3 = randomTier(2, excludeNames);
	excludeNames.push(c3.name);
	var c4 = randomTier(3, excludeNames);
	excludeNames.push(c4.name);
	var c5 = randomTier(4, excludeNames);

	return [
		c1,
		c2,
		c3,
		c4,
		c5
	];

}
var allCardsMap = {};
allCards.forEach(function(c) {
	allCardsMap[c.name] = c;
});
module.exports = {
	allCards: allCards,
	allCardsMap: allCardsMap,
	generatePack: generatePack,
	cards: {
		basicGain1: allCardsMap['BASIC-GAIN-1'],
		createCreature: allCardsMap['MicroBot.exe'],
		deal1Damage: allCardsMap['Terminate'],
		givePlus1: allCardsMap['Enhance'],
		salve: allCardsMap['Repair'],
		einstein: allCardsMap['Albert Einstein']
	},
	onLoad: function(fn) {
		fn();
	}
};