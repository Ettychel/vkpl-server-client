"use strict";

const { Level } = require("../Level");
const { SubscriptionBase } = require("./SubscriptionBase");

class SubscriptionChange extends SubscriptionBase {
  constructor(subscription) {
    super(subscription);
    this.previous_level = new Level(subscription.previous_level);
    this.amount = subscription.amount;
    this.days_duration = subscription.days_duration;
  }

  /** @type {Number} */
  amount;
  /** @type {Number} */
  days_duration;
  /** @type {Number} */
  changed_at;
  /** @type {Level} */
  previous_level;

  /** @type {Date} */
  get changedAt() {
    return new Date(this.changed_at);
  }

  /** @type {Number} */
  get daysDuration() {
    return this.days_duration;
  }

  /** @type {Level} */
  get previousLevel() {
    return this.previous_level;
  }
}

exports.SubscriptionChange = SubscriptionChange;
