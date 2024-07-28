"use strict";

const { Base } = require("../Base");

class BasePart extends Base {
  /** @type {String} */
  #type;

  /** @type {String} */
  get type() {
    return this.#type;
  }

  /** @type {String} */
  toJSON() {
    const res = {};
    Object.keys(this)
      .filter((e) => !e.startsWith("_") && !e.startsWith("raw"))
      .forEach((i) => (res[i] = this[i]));
    return { [this.type]: res };
  }
}

exports.BasePart = BasePart;
