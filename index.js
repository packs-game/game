var lib = require('packs-lib');
var queue = lib.queue;
var cards = require('./src/cards');

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
			pack: cards.generatePack()
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
	function checkUser(p) {
		if (p.id === userId) {
			toRet = games[game];
		}
	}
	
	for(var game in games) {
		games[game].players.forEach(checkUser);
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

	//ensure main phase
	if (game.getActivePhase().name !== 'main' && game.getActivePhase().name !== 'second-main') {
		return res.sendStatus(400);
	}

	//ensure active player
	if (req.body.id !== game.players[game.activePlayer].id) { return res.sendStatus(400); }

	try {
		game.getActivePhase().action({
			type: 'play',
			id: req.body.card
		});
	} catch(e) {
		return res.sendStatus(400);
	}

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

	//ensure main phase
	if (game.getActivePhase().name !== 'main' && game.getActivePhase().name !== 'second-main') {
		return res.sendStatus(400);
	}

	//ensure active player
	if (req.body.id !== game.players[game.activePlayer].id) {  }

	try {
		game.getActivePhase().action({
			type: 'buy',
			id: req.body.card
		});
	} catch(e) {
		return res.sendStatus(400);
	}

	sendEvents(game, 'game-event');

	return res.send(game.serialize());
});

restApp.post('/game/attack', checkAuth, function(req, res) {
	var game = findUserGame(req.body.id);
	if (!game) { return res.sendStatus(400); }

	//ensure phase
	if (game.getActivePhase().name !== 'declare-attackers') {
		return res.sendStatus(400);
	}

	//ensure active player
	if (req.body.id !== game.players[game.activePlayer].id || !req.body.attacks) { return res.sendStatus(400); }

	try {
		game.getActivePhase().action(req.body.attacks);
	} catch(e) {
		return res.sendStatus(400);
	}

	sendEvents(game, 'game-event');

	return res.send(game.serialize());
});

restApp.post('/game/block', checkAuth, function(req, res) {
	var game = findUserGame(req.body.id);
	if (!game) { return res.sendStatus(400); }

	//ensure phase
	if (game.getActivePhase().name !== 'declare-defenders') {
		return res.sendStatus(400);
	}

	//ensure active player
	if (req.body.id !== game.players[game.activePlayer].id || !req.body.blocks) { return res.sendStatus(400); }

	try {
		game.getActivePhase().action(req.body.blocks);
	} catch(e) {
		return res.sendStatus(400);
	}

	sendEvents(game, 'game-event');

	return res.send(game.serialize());
});

restApp.listen(3005);