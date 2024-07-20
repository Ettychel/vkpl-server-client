"use strict";

const { BaseEvent } = require("./BaseEvent");
const { SubscriptionChange } = require("../classes/Subscription/SubscriptionChange");

class ChannelSubscriptionChange extends BaseEvent {
  constructor(event) {
    super(event);
    this.subscription = new SubscriptionChange(event.subscription);
  }

  /** @type {SubscriptionChange} */
  subscription;
}

exports.ChannelSubscriptionChange = ChannelSubscriptionChange;
