"use strict";

const { Channel } = require("../classes/Channel");
const { Owner } = require("../classes/Owner");

class BaseEvent {
  constructor(event) {
    this.channel = new Channel(event.channel);
    this.owner = new Owner(event.owner);
  }
  /** @type {Channel} */
  channel;
  /** @type {Owner} */
  owner;
}

exports.BaseEvent = BaseEvent;
