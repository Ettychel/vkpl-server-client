"use strict";

const { SubscriptionBase } = require("./SubscriptionBase");

class SubscriptionRenew extends SubscriptionBase {
  constructor(subscription) {
    super(subscription);
    this.amount = subscription.amount;
    this.days_duration = subscription.days_duration;
    this.renewed_at = subscription.renewed_at;
  }

  /** @type {Number} */
  amount;
  /** @type {Number} */
  days_duration;
  /** @type {Number} unixtimestamp */
  renewed_at;

  /** @type {Number} */
  get daysDuration() {
    return this.days_duration;
  }

  /** @type {Date} */
  get renewedAt() {
    return new Date(this.renewed_at);
  }
}

exports.SubscriptionRenew = SubscriptionRenew;
