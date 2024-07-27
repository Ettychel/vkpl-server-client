"use strict";

const { Base } = require("./Base");

class Category extends Base {
  constructor(category) {
    super(category);
    this.id = category.id;
    this.type = category.type;
    this.title = category.title;
  }
  /** @type {String} */
  id;
  /** @type {String} */
  type;
  /** @type {String} */
  title;
}

exports.Category = Category;
