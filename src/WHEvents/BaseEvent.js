"use strict";

const { Channel } = require("../classes/Channel");
const { BaseUser } = require("../classes/BaseUser");

class BaseEvent {
  constructor(event) {
    this.channel = new Channel(event.channel);
    this.owner = new BaseUser(event.owner);
  }
  /** @type {Channel} */
  channel;
  /** @type {BaseUser} */
  owner;
}

exports.BaseEvent = BaseEvent;
