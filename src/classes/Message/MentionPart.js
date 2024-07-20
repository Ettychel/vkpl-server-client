const { BasePart } = require("./BasePart");

class MentionPart extends BasePart {
  constructor({ mention }) {
		super()
    this.id = mention.id;
    this.nick = mention.nick;
  }

  _type = "mention";
  id;
  nick;

  static create(mention) {
    if (typeof mention === "object") return new this(mention);
    else return new this({ mention: { id: mention } });
  }

  toString() {
    return "@" + this.nick + " ";
  }
}

exports.MentionPart = MentionPart;
