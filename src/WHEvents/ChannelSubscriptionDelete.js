"use strict";

const { BaseEvent } = require("./BaseEvent");
const { SubscriptionDelete } = require("../classes/Subscription/SubscriptionDelete");

class ChannelSubscriptionDelete extends BaseEvent {
  constructor(event) {
    super(event);
    this.subscription = new SubscriptionDelete(event.subscription);
  }

  /** @type {SubscriptionDelete} */
  subscription;
}

exports.ChannelSubscriptionDelete = ChannelSubscriptionDelete;
