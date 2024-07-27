"use strict";

const { hydrate } = require("../Util");
const { Base } = require("./Base");

class Reaction extends Base {
  constructor(reaction) {
    super(reaction);
    this.count = this.raw.count;
    this.type = this.raw.type;
  }

  /** @type {Number} */
  count;
  /** @type {Number} */
  type;

  /**
   *
   * @param {Reaction[]} reactions
   * @returns {Reaction[]}
   */
  static hydrate(reactions) {
    return hydrate(this, reactions);
  }
}

exports.Reaction = Reaction;
