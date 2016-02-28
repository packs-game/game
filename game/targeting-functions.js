function inactivePlayerInPlay(game, targetId) {
	var card = game.zones.getZone('shared:player-'+(game.getInactivePlayer())+'-inplay').getCard(targetId);
	return card;
}
function inPlay(game, targetId) {
	var card = game.zones.getZone('shared:player-'+game.activePlayer+'-inplay').getCard(targetId);
	return card;
}
function anyCreature(game,targetId) {
	var card = game.zones.getZone('shared:player-'+game.activePlayer+'-inplay').getCard(targetId);
	if (!card) { card = game.zones.getZone('shared:player-'+game.getInactivePlayer()+'-inplay').getCard(targetId); }
	return card;
}
module.exports = {
	'player-(opponent)-inplay': inactivePlayerInPlay,
	'player-(self)-inplay': inPlay,
	'inplay': anyCreature
};