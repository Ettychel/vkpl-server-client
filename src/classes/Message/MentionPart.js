const { BasePart } = require("./BasePart");

/**
 * @typedef IMentionPart
 * @property {IMentionPartContent} mention
 */

/**
 * @typedef IMentionPartContent
 * @property {String} id
 * @property {String} nick
 */

class MentionPart extends BasePart {
  constructor({ mention }) {
    super({ mention });
    this.id = mention.id;
    this.nick = mention.nick;
  }

  /** @type {String} */
  #type = "mention";
  /** @type {String} */
  id;
  /** @type {String} */
  nick;

  /** @type {String} */
  get type() {
    return this.#type;
  }

  /**
   * Создание объекта из строки или объекта
   * @param {(IMentionPart|String)} link
   * @returns {MentionPart}
   */
  static create(mention) {
    if (typeof mention === "object") return new this(mention);
    else return new this({ mention: { id: mention } });
  }

  /** @type {String} */
  toString() {
    return "@" + this.nick + " ";
  }
}

exports.MentionPart = MentionPart;
