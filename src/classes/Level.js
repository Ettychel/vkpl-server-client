"use strict";

const { Base } = require("./Base");

class Level extends Base {
  constructor(level) {
    super(level);
    this.id = this.raw.id;
    this.name = this.raw.name;
    this.price = this.raw.price;
  }

  /** @type {String} */
  id;
  /** @type {String} */
  name;
  /** @type {Number} */
  price;
}

exports.Level = Level;
