const { BasePart } = require("./BasePart");

class TextPart extends BasePart {
  constructor({ text }) {
    super()
    this.content = text.content;
  }

  _type = "text";
  content;

  static create(text) {
    if (typeof text === "object") return new this(text);
    else return new this({ text: { content: text } });
  }

  toString() {
    return this.content;
  }
}

exports.TextPart = TextPart;
