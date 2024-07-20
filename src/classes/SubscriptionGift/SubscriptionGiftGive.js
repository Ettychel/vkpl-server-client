"use strict";

const { SubscriptionGiftBase } = require("./SubscriptionGiftBase");
const { User } = require("../User");

class SubscriptionGiftGive extends SubscriptionGiftBase {
  constructor(subscription) {
    super(subscription);
    this.subscriber = new User(subscription.subscriber);
    this.bought_at = subscription.bought_at;
    this.given_at = subscription.given_at;
    this.started_at = subscription.started_at;
    this.ended_at = subscription.ended_at;
  }

  /** @type {Number} unixtimestamp */
  bought_at;
  /** @type {Number} unixtimestamp */
  given_at;
  /** @type {Number} unixtimestamp */
  started_at;
  /** @type {Number} unixtimestamp */
  ended_at;

  /** @type {Date} */
  get boughtAt() {
    return new Date(this.bought_at);
  }

  /** @type {Date} */
  get givenAt() {
    return new Date(this.given_at);
  }

  /** @type {Date} */
  get startedAt() {
    return new Date(this.started_at);
  }

  /** @type {Date} */
  get endedAt() {
    if (this.ended_at) return new Date(this.ended_at);
    return this.ended_at;
  }
}

exports.SubscriptionGiftGive = SubscriptionGiftGive;
