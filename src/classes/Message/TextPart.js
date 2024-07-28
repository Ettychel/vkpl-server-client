"use strict";

/**
 * @typedef ITextPart
 * @property {ITextPartContent} text
 */

/**
 * @typedef ITextPartContent
 * @property {String} content
 */

const { BasePart } = require("./BasePart");

class TextPart extends BasePart {
  constructor({ text }) {
    super({ text });
    this.content = text.content;
  }

  /** @type {String} */
  #type = "text";
  /** @type {String} */
  content;

  /** @type {String} */
  get type() {
    return this.#type;
  }

  /**
   * Создание объекта из строки или объекта
   * @param {(ITextPart|String)} link
   * @returns {ITextPart}
   */
  static create(text) {
    if (typeof text === "object") return new this(text);
    else return new this({ text: { content: text } });
  }

  /** @type {String} */
  toString() {
    return this.content;
  }
}

exports.TextPart = TextPart;
