var lib = require('packs-lib');
var queue = lib.queue;

var mongoose = require('mongoose');
var services = lib.services;

if (mongoose.connection.readyState !== 2) {
	mongoose.connect(services.mongo);
}

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
	sendEvents(game);
	done();
}

function sendEvents(game) {
	var playerIds = [];
	game.players.forEach(function(p) {
		playerIds.push(p.id);
	});
	var toSend = {
		type: 'game-started',
		to: playerIds,
		data: {}
	};
	queue.send('socket', toSend);

}

var createGameQueueParser = queue.listen('game-pairing', createGame);

var restApp = require('./src/rest-server');
var checkAuth = lib.checkAuth;
restApp.post('/game', checkAuth, function(req, res) {
	if (!req.body.id) { res.sendStatus(400); }
	var toRet = null;
	for(var game in games) {
		games[game].players.forEach(function(p) {
			if (p.id === req.body.id) {
				toRet = games[game];
			}
		});
	}
	if (!toRet) { return res.sendStatus(400).send('No game for user'); }
	return res.send(toRet.serialize());
});

restApp.listen(3005);