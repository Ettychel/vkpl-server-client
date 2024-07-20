"use strict";

const { BaseEvent } = require("./BaseEvent");
const { SubscriptionRenew } = require("../classes/Subscription/SubscriptionRenew");

class ChannelSubscriptionRenew extends BaseEvent {
  constructor(event) {
    super(event);
    this.subscription = new SubscriptionRenew(event.subscription);
  }

  /** @type {SubscriptionRenew} */
  subscription;
}

exports.ChannelSubscriptionRenew = ChannelSubscriptionRenew;
