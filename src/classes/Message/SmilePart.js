const { BasePart } = require("./BasePart");

class SmilePart extends BasePart {
  constructor({ smile }) {
    super()
    this.id = smile.id;
    this.animated = smile?.animated;
    this.name = smile?.name;
    this.sizes = {
      small: smile?.small_url,
      medium: smile?.medium_url,
      large: smile?.large_url,
    };
  }

  _type = "smile";
  id;
  animated;
  name;
  sizes = {
    small: undefined,
    medium: undefined,
    large: undefined,
  };

  static create(smile) {
    if (typeof smile === "object") return new this(smile);
    else return new this({ smile: { id: smile } });
  }

  toString() {
    return ":" + this.name;
  }

  #tagTemplate(src) {
    const tag = document.createElement("img");
    tag.setAttribute("src", src);
    tag.setAttribute("alt", this.name);
    return tag;
  }

  getLargeTag() {
    return this.#tagTemplate(this.sizes.large);
  }

  getMediumTag() {
    return this.#tagTemplate(this.sizes.medium);
  }

  getSmallTag() {
    return this.#tagTemplate(this.sizes.small);
  }
}

exports.SmilePart = SmilePart