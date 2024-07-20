"use strict";

class SourceUrl {
  constructor(sourceUrl) {
    this.type = sourceUrl.type;
    this.url = sourceUrl.url;
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
    return collection.map((item) => {
      return new this(item);
    });
  }
}

exports.SourceUrl = SourceUrl