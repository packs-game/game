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
	__v: 2,
	_id: "56ce80e72cfa66b604b7de0c",
	cost: 2,
	name: "MicroBot.exe",
	text: "Deploy a 1/1 bot.",
	tier: 1,
	type: "command",
	abilities: [{
		name: "createCreatureToken",
		value: "micro"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	__v: 2,
	_id: "56ce81242cfa66b604b7de0d",
	cost: 2,
	name: "MicroDefender.exe",
	text: "Deploy a 0/2 bot.",
	tier: 1,
	type: "command",
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
	type: "command",
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
	type: "command",
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
	type: "command",
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
	type: "command",
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
	__v: 0,
	_id: "56ce8be9d96d3d700760e4aa",
	cost: 6,
	name: "DoubleMicro.exe",
	text: "Deploy two 1/1 bots.",
	tier: 3,
	type: "command",
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
	type: "command",
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
	__v: 1,
	_id: "56cea781c49fd0de1248033f",
	cost: 4,
	name: "BackBot.exe",
	text: "Deploy a 1/3 bot.",
	tier: 1,
	type: "command",
	abilities: [{
		value: "butbot",
		name: "createCreatureToken"
	}, {
		value: "self",
		name: "discard"
	}]
}, {
	name: "32Bot.exe",
	cost: 5,
	tier: 2,
	type: "command",
	text: "Deploy a 3/2 bot.",
	_id: "56cea8a9c49fd0de12480342",
	__v: 0,
	abilities: [{
		name: "createCreatureToken",
		value: "bot32"
	}]
}, {
	_id: "56cec8b0bc9a7a6f0d6e67b0",
	name: "miniaggro",
	power: 2,
	subtype: "bot",
	tier: 0,
	toughness: 1,
	type: "program",
	abilities: []
}, {
	__v: 1,
	_id: "56cec8b0bc9a7a6f0d6e67b9",
	name: "bang",
	power: 3,
	subtype: "bot",
	tier: 0,
	toughness: 3,
	type: "program",
	abilities: []
}, {
	_id: "56cec8b0bc9a7a6f0d6e67b3",
	name: "bot",
	power: 2,
	subtype: "bot",
	tier: 0,
	toughness: 2,
	type: "program",
	abilities: []
}, {
	_id: "56cec8b0bc9a7a6f0d6e67b7",
	name: "bot23",
	power: 2,
	subtype: "bot",
	tier: 0,
	toughness: 3,
	type: "program",
	abilities: []
}, {
	name: "Bot.exe",
	cost: 4,
	tier: 1,
	type: "command",
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
	type: "command",
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
	type: "command",
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
	type: "command",
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
	type: "command",
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
	__v: 1,
	_id: "56cea951c49fd0de12480346",
	cost: 8,
	name: "Fiver.exe",
	text: "Deploy a 5/5 bot.",
	tier: 3,
	type: "command",
	abilities: [{
		value: "fiver",
		name: "createCreatureToken"
	}, {
		value: "self",
		name: "discard"
	}]
}, {
	__v: 1,
	_id: "56cea9a1c49fd0de12480347",
	cost: 6,
	img: "multibolt.png",
	name: "Jolt",
	text: "Deal 1 damage to all programs.",
	tier: 3,
	type: "command",
	abilities: [{
		value: "1",
		name: "globalDamage"
	}, {
		value: "self",
		name: "discard"
	}]
}, {
	__v: 0,
	_id: "56ceaa24c49fd0de12480348",
	cost: 7,
	img: "bigbolt.png",
	name: "Crash",
	text: "Deal 3 damage to ALL programs. Delete this.",
	tier: 3,
	type: "command",
	abilities: [{
		name: "globalDamage",
		value: "3"
	}, {
		name: "deleteCard",
		value: "self"
	}]
}, {
	__v: 0,
	_id: "56ceaa59c49fd0de12480349",
	cost: 5,
	name: "Empower",
	text: "Give all your programs +2/+2. Delete this.",
	tier: 3,
	type: "command",
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
	text: "Deal 1 damage to an enemy program.",
	tier: 1,
	type: "command",
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
	text: "Give a program you control +1/+1.",
	tier: 1,
	type: "command",
	abilities: [{
		name: "buff",
		value: "1"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	__v: 0,
	_id: "56ceb253c49fd0de1248034c",
	cost: 4,
	img: "repair.png",
	name: "Repair",
	text: "Repair 2 damage to your mainframe.",
	tier: 2,
	type: "command",
	abilities: [{
		name: "heal",
		value: "2"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	__v: 0,
	_id: "56ceb27dc49fd0de1248034d",
	cost: 4,
	img: "book.png",
	name: "Dig",
	text: "Draw 2 cards.",
	tier: 2,
	type: "command",
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
	__v: 0,
	_id: "56ceb2a6c49fd0de1248034e",
	cost: 4,
	img: "dome.png",
	name: "Dome",
	text: "Deal 2 damage to the opponent.",
	tier: 2,
	type: "command",
	abilities: [{
		name: "dome",
		value: "2"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	__v: 0,
	_id: "56ced771e994ed4522c4d7d2",
	cost: 3,
	name: "Energy Rush",
	text: "Add 2 energy to your reserves.",
	tier: 1,
	type: "command",
	abilities: [{
		name: "addCardToCurrency",
		value: "BASIC-GAIN-1"
	}, {
		name: "addCardToCurrency",
		value: "BASIC-GAIN-1"
	}, {
		name: "discard",
		value: "self"
	}]
}, {
	__v: 1,
	_id: "56d1111c0845965b9c740ece",
	cost: 5,
	img: "tesla.png",
	name: "Nikola Tesla",
	power: 3,
	subtype: "ai",
	targetZonePattern: "anycreatureplayer",
	text: "Install: Deal 1 damage.",
	tier: 4,
	toughness: 4,
	type: "program",
	abilities: [{
		value: "1",
		name: "targetedDamage"
	}, {
		value: "self",
		name: "putIntoPlay"
	}]
}, {
	__v: 0,
	_id: "56d261b26245f300aaa3196b",
	name: "MAINFRAME",
	tier: 0,
	toughness: 20,
	type: "mainframe",
	abilities: []
}, {
	__v: 1,
	_id: "56d2706b9144e268abffd39c",
	cost: 3,
	name: "Shock",
	targetZonePattern: "anycreatureplayer",
	text: "Deal 1 damage.",
	tier: 1,
	type: "command",
	abilities: [{
		value: "1",
		name: "targetedDamage"
	}, {
		value: "self",
		name: "discard"
	}]
}, {
	__v: 1,
	_id: "56d2ad027e5dcc85ad57e97c",
	cost: 4,
	name: "KavuBot",
	power: 4,
	subtype: "ai",
	targetZonePattern: "anycreatureplayer",
	text: "Install: Deal 2 damage.",
	tier: 3,
	toughness: 2,
	type: "program",
	abilities: [{
		value: "2",
		name: "targetedDamage"
	}, {
		value: "self",
		name: "putIntoPlay"
	}]
}, {
	__v: 0,
	_id: "56ce8d94b460b8ee0983d1c1",
	cost: 7,
	img: "khan.png",
	name: "Genghis Khan",
	power: 6,
	subtype: "ai",
	text: "Install: Your programs gain +3/+0",
	tier: 4,
	toughness: 8,
	type: "program",
	abilities: [{
		name: "globalPowerEnhance",
		value: "3"
	}, {
		name: "putIntoPlay",
		value: "self"
	}]
}, {
	__v: 0,
	_id: "56ceba08c97363f4195e02ac",
	cost: 8,
	img: "vlad.png",
	name: "Vlad the Impaler",
	power: 5,
	subtype: "ai",
	text: "Install: Deal 2 damage to ALL other programs.",
	tier: 4,
	toughness: 8,
	type: "program",
	abilities: [{
		name: "globalDamage",
		value: "2"
	}, {
		name: "putIntoPlay",
		value: "self"
	}]
}, {
	__v: 2,
	_id: "56ce8ce3d96d3d700760e4ac",
	cost: 4,
	img: "einstein.png",
	name: "Albert Einstein",
	power: 2,
	subtype: "ai",
	text: "Install: Draw 3 cards.",
	tier: 4,
	toughness: 4,
	type: "program",
	abilities: [{
		name: "putIntoPlay",
		value: "self"
	}, {
		name: "activeDraw",
		value: ""
	}, {
		name: "activeDraw",
		value: ""
	}, {
		value: "",
		name: "activeDraw"
	}]
}, {
	_id: "56cec8b0bc9a7a6f0d6e67b1",
	name: "minidefender",
	power: 1,
	subtype: "bot",
	tier: 0,
	toughness: 2,
	type: "program",
	abilities: []
}, {
	__v: 1,
	_id: "56cec8b0bc9a7a6f0d6e67b4",
	name: "attackbot",
	power: 3,
	subtype: "bot",
	tier: 0,
	toughness: 1,
	type: "program",
	abilities: []
}, {
	__v: 1,
	_id: "56cec8b0bc9a7a6f0d6e67ba",
	name: "boom",
	power: 4,
	subtype: "bot",
	tier: 0,
	toughness: 4,
	type: "program",
	abilities: []
}, {
	_id: "56cec8b0bc9a7a6f0d6e67b2",
	name: "butbot",
	power: 1,
	subtype: "bot",
	tier: 0,
	toughness: 3,
	type: "program",
	abilities: []
}, {
	_id: "56cec8b0bc9a7a6f0d6e67b5",
	name: "bot41",
	power: 4,
	subtype: "bot",
	tier: 0,
	toughness: 1,
	type: "program",
	abilities: []
}, {
	_id: "56cec8b0bc9a7a6f0d6e67b6",
	name: "bot32",
	power: 3,
	subtype: "bot",
	tier: 0,
	toughness: 2,
	type: "program",
	abilities: []
}, {
	_id: "56cec8b0bc9a7a6f0d6e67b8",
	name: "bot14",
	power: 1,
	subtype: "bot",
	tier: 0,
	toughness: 4,
	type: "program",
	abilities: []
}, {
	_id: "56cec8b0bc9a7a6f0d6e67bb",
	name: "fiver",
	power: 5,
	subtype: "bot",
	tier: 0,
	toughness: 5,
	type: "program",
	abilities: []
}, {
	__v: 0,
	_id: "56cecb8afb6c33b51de6111c",
	name: "micro",
	power: 1,
	subtype: "bot",
	tier: 0,
	toughness: 1,
	type: "program",
	abilities: []
}, {
	__v: 0,
	_id: "56cecf00fb6c33b51de6111d",
	name: "microdefender",
	power: 0,
	subtype: "bot",
	tier: 0,
	toughness: 2,
	type: "program",
	abilities: []
}];