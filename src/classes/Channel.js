"use strict";

class Channel {
  constructor(channel) {
    this.url = channel.url;
  }

  /** @type {String} */
  url;

  /** @returns {String} */
  get href() {
    return "https://live.vkplay.ru/" + this.url;
  }
}

exports.Channel = Channel