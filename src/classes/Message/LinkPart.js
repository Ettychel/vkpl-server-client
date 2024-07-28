"use strict";

/**
 * @typedef ILinkPart
 * @property {ILinkPartContent} link
 */

/**
 * @typedef ILinkPartContent
 * @property {String} url
 * @property {String} content
 */

const { BasePart } = require("./BasePart");

class LinkPart extends BasePart {
  constructor({ link }) {
    super({ link });
    this.url = link.url;
    this.content = link.content;
  }

  /** @type {String} */
  #type = "link";
  /** @type {String} */
  url;
  /** @type {String} */
  content;

  /** @type {String} */
  get type() {
    return this.#type;
  }

  /**
   * Создание объекта из строки или объекта
   * @param {(ILinkPart|String)} link
   * @returns {LinkPart}
   */
  static create(link) {
    if (typeof link === "object") return new this(link);
    else return new this({ link: { url: link, content: link } });
  }

  /** @type {String} */
  toString() {
    return this.content;
  }

  /** @type {String} - HTML tag */
  getTag() {
    return '<a href="' + this.url + '">' + this.content + "</a>";
  }
}

exports.LinkPart = LinkPart;
