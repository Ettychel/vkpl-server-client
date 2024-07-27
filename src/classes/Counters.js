"use strict";

const { Base } = require("./Base");

class Counters extends Base {
  constructor(counters) {
    super(counters);
    this.viewers = this.raw.viewers;
    this.views = this.raw.views;
  }

  /** @type {Number | undefined} - Зрители */
  viewers;

  /** @type {Number | undefined} - Просмотры */
  views;
}

exports.Counters = Counters;
