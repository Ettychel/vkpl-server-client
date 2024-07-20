const { LinkPart } = require("./LinkPart");
const { MentionPart } = require("./MentionPart");
const { SmilePart } = require("./SmilePart");
const { TextPart } = require("./TextPart");

class MessageParts extends Array {
  constructor(...parts) {
    super(...parts);
    this.#hydrate();
  }

  #hydrate() {
    return this.map((part) => {
      if ("text" in part) return new TextPart(part);
      if ("smile" in part) return new SmilePart(part);
      if ("mention" in part) return new MentionPart(part);
      if ("link" in part) return new LinkPart(part);
      throw new Error("Тип не определен");
    });
  }

  static createFromString() {}

  /** @returns {string} Возвращает строку JSON */
  toJSON() {
    return JSON.stringify(this.map((part) => part.toJSON()));
  }

  /** @returns {string} Возвращает как строку с условными префиксами */
  toString() {
    const a = this.map((part) => {
      return part.toString();
    });
    return a.join("");
  }
}

exports.MessageParts = MessageParts;
