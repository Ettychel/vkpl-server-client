"use strict";

const { BaseEvent } = require("./BaseEvent");
const {
  SubscriptionGiftBuy,
} = require("../classes/SubscriptionGift/SubscriptionGiftBuy");

class ChannelSubscriptionGiftBuy extends BaseEvent {
  constructor(event) {
    super(event);
    this.gift_subscription = new SubscriptionGiftBuy(event.subscription);
  }

  /** @type {SubscriptionGiftBuy} */
  gift_subscription;
}

exports.ChannelSubscriptionGiftBuy = ChannelSubscriptionGiftBuy;
