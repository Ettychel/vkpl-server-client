"use strict";

const { BaseEvent } = require("./BaseEvent");
const { Follow } = require("../classes/Follow");

class ChannelFollowDelete extends BaseEvent {
  constructor(event) {
    super(event);
    this.follow = new Follow(event.follow);
  }

  /** @type {Follow} */
  follow;
}

exports.ChannelFollowDelete = ChannelFollowDelete;
