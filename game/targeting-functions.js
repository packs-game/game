function inactivePlayerInPlay(game, targetId) {
	var card = game.zones.getZone('shared:player-'+(game.activePlayer?0:1)+'-inplay').getCard(targetId);
	return card;
}
function inPlay(game, targetId) {
	var card = game.zones.getZone('shared:player-'+game.activePlayer+'-inplay').getCard(targetId);
	return card;
}
module.exports = {
	'player-(opponent)-inplay': inactivePlayerInPlay,
	'player-(self)-inplay': inPlay
};