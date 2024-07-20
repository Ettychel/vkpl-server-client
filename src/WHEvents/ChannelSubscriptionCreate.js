"use strict";

const { BaseEvent } = require("./BaseEvent");
const { SubscriptionCreate } = require("../classes/Subscription/SubscriptionCreate");

class ChannelSubscriptionCreate extends BaseEvent {
  constructor(event) {
    super(event);
    this.subscription = new SubscriptionCreate(event.subscription);
  }

  /** @type {Subscription} */
  subscription;
}

exports.ChannelSubscriptionCreate = ChannelSubscriptionCreate;
