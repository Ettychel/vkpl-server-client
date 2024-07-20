const { BasePart } = require("./BasePart");

class LinkPart extends BasePart {
  constructor({ link }) {
    super()
    this.url = link.url;
    this.content = link.content;
  }

  _type = "link";
  url;
  content;

  static create(link) {
    if (typeof link === "object") return new this(link);
    else return new this({ link: { url: link, content: link } });
  }

  toString() {
    return this.content;
  }

  getTag() {
    const tag = document.createElement("a");
    tag.setAttribute("href", this.url);
    tag.innerText = this.content;
  }
}

exports.LinkPart = LinkPart;
