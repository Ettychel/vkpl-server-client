"use strict";

const { hydrate } = require("../Util");
const { Base } = require("./Base");

class SourceUrl extends Base {
  constructor(sourceUrl) {
    super(sourceUrl);
    this.type = this.raw.type;
    this.url = this.raw.url;
  }
  /** @type {String} */
  type;
  /** @type {String} */
  url;

  /**
   * Метод заполнения массива инстансами текущего класса
   * @param {{type: String, url: String}[]} collection
   * @returns
   */
  static hydrate(collection) {
    return hydrate(this, collection);
  }
}

exports.SourceUrl = SourceUrl;
