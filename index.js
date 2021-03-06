var lib = require('packs-lib');
var queue = lib.queue;
var cards = require('./src/card-loader');

var mongoose = require('mongoose');
var services = lib.services;

mongoose.connect(services.mongo);

var create = require('./game').createGame;

var games = {};

cards.onLoad(function() {
	//dont start listening for the games till after we know we have the card data
	var createGameQueueParser = queue.listen('game-pairing', createGame);
});

function createGame(data, done) {
	var players = [];

	var cardNames = [];
	data.players.forEach(function(id) {
		var pack = cards.generatePack(cardNames);
		pack.forEach(function(c) {
			cardNames.push(c.name);
		});
		players.push({
			id: id,
			name: id,
			pack: pack
		});
	});
	var game = create(players, cards);
	game.start();
	games['game' + Object.keys(games).length] = game;
	sendEvents(game, 'game-started');
	done();
}

function getPlayerIds(game) {
	var playerIds = [];
	game.players.forEach(function(p) {
		playerIds.push(p.id);
	});
	return playerIds;
}
function sendEvents(game, event) {
	var toSend = {
		type: event,
		to: getPlayerIds(game),
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
			id: req.body.card,
			target: req.body.target || null
		});
	} catch(e) {
		return res.status(400).json({name: e.name, message: e.message});
	}

	//tell the players a card was played
	var playerIds = getPlayerIds(game);
	var toSend = {
		type: 'card-played',
		to: playerIds,
		data: game.zones.getCard(req.body.card)
	};
	queue.send('socket', toSend);

	sendEvents(game, 'game-event');

	return res.send(game.serialize());
});

restApp.post('/game/pass', checkAuth, function(req, res) {
	var game = findUserGame(req.body.id);
	if (!game) { return res.sendStatus(400); }

	var passingPlayerIndex = game.activePlayer;
	//ensure active player
	if (req.body.id !== game.players[passingPlayerIndex].id) { return res.sendStatus(400); }

	var endingTurn = false;
	if (game.getActivePhase().name === 'second-main') { endingTurn = true; }
	//call the pass
	game.getActivePhase().action(null, true);

	//tell the players a pass
	var playerIds = getPlayerIds(game);
	var toSend = {
		type: 'active-pass',
		to: playerIds,
		data: passingPlayerIndex
	};
	queue.send('socket', toSend);

	if (endingTurn) {
		toSend = {
			type: 'end-turn',
			to: playerIds,
			data: passingPlayerIndex
		};
		queue.send('socket', toSend);
	}

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

	var active = game.activePlayer;
	//ensure active player
	if (req.body.id !== game.players[active].id) {  }

	try {
		game.getActivePhase().action({
			type: 'buy',
			id: req.body.card
		});
	} catch(e) {
		return res.sendStatus(400);
	}

	//tell the players a card was bought
	var playerIds = getPlayerIds(game);
	var toSend = {
		type: 'buy',
		to: playerIds,
		data: active
	};
	queue.send('socket', toSend);
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

	//tell the players attacks
	var playerIds = getPlayerIds(game);
	var toSend = {
		type: 'attacks',
		to: playerIds,
		data: req.body.attacks
	};
	queue.send('socket', toSend);
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

	var playerIds = getPlayerIds(game);
	var toSend = {
		type: 'blocks',
		to: playerIds,
		data: req.body.blocks
	};
	queue.send('socket', toSend);
	sendEvents(game, 'game-event');

	return res.send(game.serialize());
});
restApp.get('/cards', function(req,res){
	res.send(cards.allCards);
});
restApp.get('/refresh-cards', function(req,res){
	cards.load();
	res.sendStatus(200);
});
restApp.listen(3005);