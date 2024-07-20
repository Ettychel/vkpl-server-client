"use strict";

const { BaseEvent } = require("./BaseEvent");
const {
  SubscriptionGiftGive,
} = require("../classes/SubscriptionGift/SubscriptionGiftGive");

class ChannelSubscriptionGiftGive extends BaseEvent {
  constructor(event) {
    super(event);
    this.gift_subscription = new SubscriptionGiftGive(event.subscription);
  }

  /** @type {SubscriptionGiftGive} */
  gift_subscription;
}

exports.ChannelSubscriptionGiftGive = ChannelSubscriptionGiftGive;
