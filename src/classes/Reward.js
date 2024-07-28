"use strict";

const { Base } = require("./Base");

class Reward extends Base {
  constructor(reward) {
    super(reward);
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

exports.Reward = Reward;
