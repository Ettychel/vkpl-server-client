const { Raid } = require("../classes/Raid");
const { BaseEvent } = require("./BaseEvent");

class RaidStart extends BaseEvent {
	constructor(event) {
		super(event)
		this.raid = new Raid(event.raid)
	}


	raid
}

exports.RaidStart = RaidStart