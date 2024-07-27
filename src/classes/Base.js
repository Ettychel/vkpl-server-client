"use strict";

class Base {
  constructor(object) {
    this.raw = object;
  }

  /** @type {Object} Исходный объект при создании */
  raw;
}

exports.Base = Base;
