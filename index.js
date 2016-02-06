var lib = require('packs-lib');
var queue = lib.queue;

var mongoose = require('mongoose');
var services = lib.services;

mongoose.connect(services.mongo);

var create = require('./game').createGame;

var games = {};

function createGame(data, done) {
	var players = [];

	data.players.forEach(function(id) {
		players.push({
			id: id,
			name: id,
			pack: [{name: 'c1'},{name: 'c2'},{name: 'c3'},{name: 'c4'},{name: 'c5'}]
		});
	});
	var game = create(players);
	game.start();
	games['game' + Object.keys(games).length] = game;
	sendEvents(game, 'game-started');
	done();
}

function sendEvents(game, event) {
	var playerIds = [];
	game.players.forEach(function(p) {
		playerIds.push(p.id);
	});
	var toSend = {
		type: event,
		to: playerIds,
		data: {}
	};
	queue.send('socket', toSend);

}

function findUserGame(userId) {
	var toRet = null;
	for(var game in games) {
		games[game].players.forEach(function(p) {
			if (p.id === userId) {
				toRet = games[game];
			}
		});
	}
	return toRet;
}

var createGameQueueParser = queue.listen('game-pairing', createGame);

var restApp = require('./src/rest-server');
var checkAuth = lib.checkAuth;
restApp.post('/game', checkAuth, function(req, res) {
	var game = findUserGame(req.body.id);
	if (!game) { return res.sendStatus(400); }
	return res.send(game.serialize());
});

restApp.post('/game/play-card', checkAuth, function(req, res) {
	if (!req.body.card) { return res.sendStatus(400); }
	var game = findUserGame(req.body.id);
	if (!game) { return res.sendStatus(400); }

	//ensure active player
	if (req.body.id !== game.players[game.activePlayer].id) { return res.sendStatus(400); }

	//ensure card is in hand
	if (!game.zones.getZone('player-'+game.activePlayer+':hand').getStack('hand').getCard(req.body.card)) {
		return res.sendStatus(400);
	}

	game.getActivePhase().action({
		type: 'play',
		id: req.body.card
	});

	sendEvents(game, 'game-event');

	return res.send(game.serialize());
});

restApp.post('/game/pass', checkAuth, function(req, res) {
	var game = findUserGame(req.body.id);
	if (!game) { return res.sendStatus(400); }

	//ensure active player
	if (req.body.id !== game.players[game.activePlayer].id) { return res.sendStatus(400); }

	//call the pass
	game.getActivePhase().action(null, true);

	sendEvents(game, 'game-event');

	return res.send(game.serialize());
});

restApp.post('/game/buy', checkAuth, function(req, res) {
	var game = findUserGame(req.body.id);
	if (!game) { return res.sendStatus(400); }

	//ensure active player
	if (req.body.id !== game.players[game.activePlayer].id) { return res.sendStatus(400); }

	var inBuy = false;
	game.zones.getZone('shared:to-buy').getCards().forEach(function(c){
		if (c.id === req.body.card) { inBuy = true; }
	});
	if (!inBuy) {
		return res.sendStatus(400);
	}

	game.getActivePhase().action({
		type: 'buy',
		id: req.body.card
	});

	sendEvents(game, 'game-event');

	return res.send(game.serialize());
});

restApp.listen(3005);