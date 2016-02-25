module.exports = [{
	__v: 1,
	_id: "56ce80a1e2ff8aaa02865135",
	cost: 0,
	name: "BASIC-GAIN-1",
	tier: 0,
	type: "currency",
	abilities: [{
		value: "self",
		name: "moveCurrency"
	}]
}, {
	name: "MicroBot.exe",
	cost: 2,
	tier: 1,
	type: "program",
	text: "Deploy a 1/1 bot.",
	_id: "56ce80e72cfa66b604b7de0c",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "micro"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "MicroDefender.exe",
	cost: 2,
	tier: 1,
	type: "program",
	text: "Deploy a 0/2 bot.",
	_id: "56ce81242cfa66b604b7de0d",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "microdefender"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	__v: 1,
	_id: "56ce8b07d96d3d700760e4a6",
	cost: 3,
	name: "MiniAggroBot.exe",
	text: "Deploy a 2/1 bot.",
	tier: 1,
	type: "program",
	abilities: [{
		value: "miniaggro",
		name: "createCreatureToken"
	}, {
		value: "self",
		name: "discard"
	}]
}, {
	name: "MiniDefenderBot.exe",
	cost: 3,
	tier: 1,
	type: "program",
	text: "Deploy a 1/2 bot.",
	_id: "56ce8b5dd96d3d700760e4a7",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "minidefender"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "41bot.exe",
	cost: 5,
	tier: 2,
	type: "program",
	text: "Deploy a 4/1 bot.",
	_id: "56ce8b95d96d3d700760e4a8",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "bot41"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "14bot.exe",
	cost: 5,
	tier: 2,
	type: "program",
	text: "Deploy a 1/4 bot.",
	_id: "56ce8bb6d96d3d700760e4a9",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "bot14"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "DoubleMicro.exe",
	cost: 6,
	tier: 3,
	type: "program",
	text: "Deploy two\n1/1 bots.",
	_id: "56ce8be9d96d3d700760e4aa",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "micro"
	}, {
		name: "createCreatureToken",
		value: "micro"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	__v: 1,
	_id: "56ce8c1dd96d3d700760e4ab",
	cost: 8,
	name: "DoubleMini.exe",
	text: "Deploy two 2/2 bots.",
	tier: 3,
	type: "program",
	abilities: [{
		value: "bot",
		name: "createCreatureToken"
	}, {
		value: "bot",
		name: "createCreatureToken"
	}, {
		value: "self",
		name: "discard"
	}]
}, {
	__v: 0,
	_id: "56ce8ce3d96d3d700760e4ac",
	cost: 6,
	img: "einstein.png",
	name: "Albert Einstein",
	power: 2,
	text: "etb: Your bots gain +0/+2",
	tier: 4,
	toughness: 8,
	type: "ai",
	abilities: [{
		name: "globalToughnessEnhance",
		value: "2"
	}, {
		name: "putIntoPlay",
		value: "self"
	}]
}, {
	__v: 0,
	_id: "56ce8d94b460b8ee0983d1c1",
	cost: 7,
	img: "khan.png",
	name: "Genghis Khan",
	power: 6,
	text: "etb: Your bots gain +3/+0",
	tier: 4,
	toughness: 8,
	type: "ai",
	abilities: [{
		name: "globalPowerEnhance",
		value: "3"
	}, {
		name: "putIntoPlay",
		value: "self"
	}]
}, {
	name: "BackBot.exe",
	cost: 4,
	tier: 1,
	type: "program",
	text: "Deploy a 1/3 bot.",
	_id: "56cea781c49fd0de1248033f",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "backbot"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "32Bot.exe",
	cost: 5,
	tier: 2,
	type: "program",
	text: "Deploy a 3/2 bot.",
	_id: "56cea8a9c49fd0de12480342",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "bot32"
	}]
}, {
	name: "Bot.exe",
	cost: 4,
	tier: 1,
	type: "program",
	text: "Deploy a 2/2 bot.",
	_id: "56cea865c49fd0de12480340",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "bot"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "AttackBot.exe",
	cost: 4,
	tier: 1,
	type: "program",
	text: "Deploy a 3/1 bot.",
	_id: "56cea88dc49fd0de12480341",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "attackbot"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "23Bot.exe",
	cost: 5,
	tier: 2,
	type: "program",
	text: "Deploy a 2/3 bot.",
	_id: "56cea8ccc49fd0de12480343",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "bot23"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "Bangbot.exe",
	cost: 6,
	tier: 2,
	type: "program",
	text: "Deploy a 3/3 bot.",
	_id: "56cea8f6c49fd0de12480344",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "bang"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "Boombot.exe",
	cost: 7,
	tier: 3,
	type: "program",
	text: "Deploy a 4/4 bot.",
	_id: "56cea925c49fd0de12480345",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "boom"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "Fiver.exe",
	cost: 8,
	tier: 3,
	type: "program",
	text: "Deploy a 5/5 bot.",
	_id: "56cea951c49fd0de12480346",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "fivefive"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	__v: 1,
	_id: "56cea9a1c49fd0de12480347",
	cost: 6,
	img: "multibolt.png",
	name: "Jolt",
	text: "Deal 1 damage to all bots.",
	tier: 3,
	type: "action",
	abilities: [{
		value: "1",
		name: "globalDamage"
	}, {
		value: "self",
		name: "discard"
	}]
}, {
	name: "Crash",
	cost: 7,
	tier: 3,
	type: "action",
	text: "Deal 3 damage to all bots. Delete this.",
	img: "bigbolt.png",
	_id: "56ceaa24c49fd0de12480348",
	__v: 0,
	abilities: [{
		name: "globalDamage",
		value: "3"
	}, {
		name: "deleteCard",
		value: "self"
	}]
}, {
	name: "Empower",
	cost: 5,
	tier: 3,
	type: "action",
	text: "Give all your bots +2/+2. Delete this.",
	_id: "56ceaa59c49fd0de12480349",
	__v: 0,
	abilities: [{
		name: "globalEnhance",
		value: "2"
	}, {
		name: "deleteCard",
		value: "self"
	}]
}, {
	__v: 0,
	_id: "56ceb1e7c49fd0de1248034a",
	cost: 2,
	img: "bolt.png",
	name: "Terminate",
	targetZonePattern: "player-(opponent)-inplay",
	text: "Deal 1 damage to an enemy bot.",
	tier: 1,
	type: "action",
	abilities: [{
		name: "targetedDamage",
		value: "1"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	__v: 0,
	_id: "56ceb224c49fd0de1248034b",
	cost: 2,
	img: "enhance.png",
	name: "Enhance",
	targetZonePattern: "player-(self)-inplay",
	text: "Give a bot you control +1/+1.",
	tier: 1,
	type: "action",
	abilities: [{
		name: "buff",
		value: "1"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "Repair",
	cost: 4,
	tier: 2,
	type: "action",
	text: "Repair 2 damage to your mainframe.",
	img: "repair.png",
	_id: "56ceb253c49fd0de1248034c",
	__v: 0,
	abilities: [{
		name: "heal",
		value: "2"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "Dig",
	cost: 4,
	tier: 2,
	type: "action",
	text: "Draw 2 cards.",
	img: "book.png",
	_id: "56ceb27dc49fd0de1248034d",
	__v: 0,
	abilities: [{
		name: "activeDraw",
		value: ""
	}, {
		name: "activeDraw",
		value: ""
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	name: "Dome",
	cost: 4,
	tier: 2,
	type: "action",
	text: "Deal 2 damage to your opponent's mainframe.",
	img: "dome.png",
	_id: "56ceb2a6c49fd0de1248034e",
	__v: 0,
	abilities: [{
		name: "dome",
		value: "2"
	}, {
		name: "discard",
		value: "self"
	}]
}];