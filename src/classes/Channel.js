"use strict";

const { Base } = require("./Base");

class Channel extends Base {
  constructor(channel) {
    super(channel);
    this.url = this.raw.url;
  }

  /** @type {String} */
  url;

  /** @returns {String} */
  get href() {
    return "https://live.vkplay.ru/" + this.url;
  }
}

exports.Channel = Channel;
