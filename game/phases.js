module.exports = function(game) {
	function mainPhaseAction(opts, pass) {
		if (opts && opts.type === 'play') {
			//ensure card is in hand
			var card = game.zones.getZone('player-'+game.activePlayer+':hand').getStack('hand').getCard(opts.id);
			if (!card) {
				throw new Error('invalid play');
			}
			//check a target if there is one
			var target;
			if (card.targets) {
				if (!opts.target) { throw new Error('no target'); }
				target = card.targets(game, opts.target);
				if (!target) { throw new Error('invalid target'); }
			}
			//allow player to play things from their hand
			var c = game.zones.getZone('player-' + game.activePlayer + ':hand').getStack('hand').getCard(opts.id, true);

			c.resolve(game, target);
		}
		if (opts && opts.type === 'buy') {
			//ensure its in the buy
			var inBuy = false;
			game.zones.getZone('shared:to-buy').getCards().forEach(function(c){
				if (c.id === opts.id) { inBuy = true; }
			});
			if (!inBuy) {
				throw new Error('invalid buy');
			}

			game.buy(opts.id);
		}
		if (opts && opts.type === 'mainframe') {
			//do mainframe abilities
			
		}
		if (pass) {
			game.cycleActivePhase();
		}
	}

	var startOfTurn = {
		name: 'start-of-turn',
		priority: false,
		enter: function() {
			//untap
			game.zones.getZone('shared:player-'+game.activePlayer+'-inplay').getCards().forEach(function(c){
				c.tapped = false;
			});
			game.cycleActivePhase();
		}
	};
	var main = {
		name: 'main',
		priority: 'activePlayer',
		action: mainPhaseAction
	};
	var declareAttackers = {
		name: 'declare-attackers',
		priority: 'activePlayer',
		action: function(attackers, pass) {
			if (attackers) {
				var invalidAttack = false;
				attackers.forEach(function(attacker){
					var c = game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').getStack(attacker.id).getCard(attacker.id);
					if (!c) { invalidAttack = true; }
					if (c.tapped) { invalidAttack = true; }
				});
				if (invalidAttack) { throw new Error('invalid attack'); }
				//allow player to declare attacks
				attackers.forEach(function(attacker){
					var c = game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').getStack(attacker.id).getCard(attacker.id, true);
					c.target = attacker.target;
					c.tapped = true;
					game.zones.getZone('shared:battle').addStack(attacker.id).add(c);
				});
				//switch so defender can make blocks
				game.cycleActivePlayer();
				game.cycleActivePhase();
			}
			if (pass) {
				//no attackers, so no defender step will happen
				game.cycleActivePhase();
			}
		}
	};
	var declareDefenders = {
		name: 'declare-defenders',
		priority: 'inactivePlayer',
		action: function(defenders, pass) {
			if (defenders) {
				var invalidBlock = false;
				defenders.forEach(function(defender){
					var c = game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').getStack(defender.id).getCard(defender.id);
					if (!c) { invalidBlock = true; }
					if (c.tapped) { invalidBlock = true; }
				});
				if (invalidBlock) { throw new Error('invalid block'); }

				//allow player to declare blocks
				defenders.forEach(function(defender){
					var defendingCard = game.zones.getZone('shared:player-' + game.activePlayer + '-inplay').getCard(defender.id, true);
					defendingCard.target = defender.target;
					
					var combatZone = game.zones.getZone('shared:combats');
					//check if the attacking bot has moved zones already
					var attackingBot = game.zones.getZone('shared:battle').getCard(defender.target,true);

					var combatSubzone;
					if (attackingBot) {
						//create the new combat zone
						combatSubZone = combatZone.addZone('combat'+Object.keys(combatZone.zones).length);
						combatSubZone.addStack('attackers').add(attackingBot);
						combatSubZone.addStack('defenders');
					} else {
						combatSubZone = combatZone.getZone(combatZone.getCard(defender.target).zone);
					}
					
					combatSubZone.getStack('defenders').add(defendingCard);
				});
				//switch back
				game.cycleActivePlayer();
				game.cycleActivePhase();
			}
			if (pass) {
				game.cycleActivePlayer();
				game.cycleActivePhase();
			}
		},
		enter: function(activePlayer) {
			//check to make sure there are attackers
			if (!game.zones.getZone('shared:battle').getCards().length) {
				return game.cycleActivePhase();
			}
			game.events.emit('phase:entered', this);
		}
	};
	var resolveDamage = {
		name: 'resolve-damage',
		priority: false,
		action: function() {
			game.resolveCombatDamage();

			game.resolveInplayDeaths();

			if (!game.ended) { game.cycleActivePhase(); }
		},
		enter: function() {
			//check to make sure there are combats to resolve
			var battleZone = game.zones.getZone('shared:battle');
			var combatsZone = game.zones.getZone('shared:combats');
			if (!battleZone.getCards().length && !combatsZone.getCards().length) {
				return game.cycleActivePhase();
			}
			game.events.emit('phase:entered', this);
			this.action();
		}
	};
	var secondMain = {
		name: 'second-main',
		priority: 'activePlayer',
		action: mainPhaseAction,
		enter: function() {
		
		}
	};
	var endOfTurn = {
		name: 'end-of-turn',
		priority: false,
		action: function() {
			//Replace any bought cards
			game.zones.getZone('shared:to-buy').forEachStack(function(stack){
				if (stack.cards.length === 0) {
					stack.add(game.zones.getZone('shared:purchase').getStack('packs').draw());
				}
			});
			game.cycleActivePhase();
		}
	};
	var draw = {
		name: 'draw',
		priority: false,
		action: function() {
			//make the active player draw to 4
			var hand = game.zones.getZone('player-'+game.activePlayer+':hand').getStack('hand');
			while (hand.cards.length < 4) {
				var canDraw = game.activeDraw();
				if (!canDraw) { break; }
			}
			game.cycleActivePhase();
		}
	};
	game.addPhase(startOfTurn);
	game.addPhase(main);
	game.addPhase(declareAttackers);
	game.addPhase(declareDefenders);
	game.addPhase(resolveDamage);
	game.addPhase(secondMain);
	game.addPhase(endOfTurn);
	game.addPhase(draw);
};