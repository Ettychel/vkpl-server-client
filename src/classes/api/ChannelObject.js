"use strict";

const { hydrate } = require("../../Util");
const { Base } = require("../Base");
const { Owner } = require("../Owner");
const { ChannelAdvanced } = require("./ChannelAdvanced");
const { StreamAdvanced } = require("./StreamAdvanced");

class ChannelObject extends Base {
  constructor(channel) {
    super(channel);
    this.channel = new ChannelAdvanced(channel.channel);
    this.owner = new Owner(channel.owner);
    this.stream = new StreamAdvanced(channel.stream);
  }

  channel;
  owner;
  stream;

  /**
   *
   * @param {ChannelObject[]} channels
   * @returns {ChannelObject[]}
   */
  static hydrate(channels) {
    return hydrate(this, channels);
  }
}

exports.ChannelObject = ChannelObject;
