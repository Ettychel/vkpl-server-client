"use strict";

const { SubscriptionGiftBase } = require("./SubscriptionGiftBase");

class SubscriptionGiftBuy extends SubscriptionGiftBase {
  constructor(subscription) {
    super(subscription);
    this.count = subscription.count;
    this.amount = subscription.amount;
    this.bought_at = subscription.bought_at;
  }

  /** @type {Number} */
  count;
  /** @type {Number} */
  amount;
  /** @type {Number} unixtimestamp */
  bought_at;

  /** @type {Date} */
  get boughtAt() {
    return new Date(this.bought_at);
  }
}

exports.SubscriptionGiftBuy = SubscriptionGiftBuy;
