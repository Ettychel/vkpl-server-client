"use strict";

const { Base } = require("../Base");
const { Level } = require("../Level");
const { User } = require("../User");

class SubscriptionBase extends Base {
  constructor(subscription) {
    super(subscription);
    this.subscriber = new User(subscription.subscriber);
    this.level = new Level(subscription.level);
    this.started_at = subscription.started_at;
    this.ended_at = subscription?.ended_at;
  }

  /** @type {User} */
  subscriber;
  /** @type {Level} */
  level;
  /** @type {Number} unixtimestamp */
  started_at;
  /** @type {Number} unixtimestamp */
  ended_at;

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

exports.SubscriptionBase = SubscriptionBase;
