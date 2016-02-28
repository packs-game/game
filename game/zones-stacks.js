/*
access is:
	public - all players can see all cards in all stacks
	private - just the owner can see cards, others can count
	hidden - only can be counted
 */

function addZones(game, players, cards) {
	if (!players || !Array.isArray(players)) { console.log(players); throw new Error('no players');}
	game.zones.addZone('deleted').addStack('deleted');
	var sharedZones = game.zones.addZone('shared', {
		access: 'public',
		owner: 'game'
	});

	sharedZones.addZone('battle', {
		access: 'public',
		owner: 'game'
	});
	sharedZones.addZone('combats', {
		access: 'public',
		owner: 'game'
	});
	sharedZones.addZone('purchase', {
		access: 'hidden',
		owner: 'game'
	});
	sharedZones.getZone('purchase').addStack('packs');
	
	var toBuyZone = sharedZones.addZone('to-buy', {
		access: 'public',
		owner: 'game'
	});
	toBuyZone.addStack('buy1');
	toBuyZone.addStack('buy2');
	toBuyZone.addStack('buy3');

	var deck = [];
	
	var card = cards.allCardsMap['BASIC-GAIN-1'];
	var i = 0;
	while (i < 8) {
		deck.push(card);
		i++;
	}
	var mainframe = cards.allCardsMap['MAINFRAME'];

	players.forEach(function(p, i) {
		if (!p.pack) { console.log(p); throw new Error('no pack provided for player'); }
		game.addPlayer(p);
		var playerZones = game.zones.addZone('player-' + i, {
			access: 'public',
			owner: p
		});

		playerHandZone = playerZones.addZone('hand', {
			access: 'private',
			owner: p
		});
		playerHandZone.addStack('hand');
		playerDeckZone = playerZones.addZone('deck', {
			access: 'hidden',
			owner: p
		});
		playerDeckZone.addStack('deck');

		playerZones.addStack('turn-discard');
		playerZones.addStack('discard');
		playerZones.addStack('currency');
		playerZones.addStack('mainframe').add(mainframe);

		sharedZones.addZone('player-' + i + '-inplay', {
			access: 'public',
			owner: p
		});

		//construct the players deck
		var deckCopy = deck.slice(0); //otherwise it starts mucking up things
		deckCopy.forEach(function(c) { //set the owner for the new cards
			c.owner = i;
		});
		var cards = playerDeckZone.getStack('deck').add(deckCopy);
		p.pack.forEach(function(c){
			c.copies = game.copyMap[c.tier];
		});
		sharedZones.getZone('purchase').getStack('packs').add(p.pack);
	});
}

module.exports = addZones;