"use strict";

const { BaseEvent } = require("./BaseEvent");
const { Follow } = require("../classes/Follow");

class ChannelFollowCreate extends BaseEvent {
  constructor(event) {
    super(event);
    this.follow = new Follow(event.follow);
  }

  /** @type {Follow} */
  follow;
}

exports.ChannelFollowCreate = ChannelFollowCreate;
