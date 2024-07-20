class Level {
	constructor(level) {
		this.id = level.id
		this.name = level.name
		this.price = level.price
	}

	/** @type {String} */
	id
	/** @type {String} */
	name
	/** @type {Number} */
	price
}

exports.Level = Level