"use strict";

const { SubscriptionBase } = require("./SubscriptionBase");

class SubscriptionCreate extends SubscriptionBase {
  constructor(subscription) {
    super(subscription);
    this.amount = subscription.amount;
    this.days_duration = subscription.days_duration;
    this.kind = subscription.kind;
  }

  /** @type {Number} */
  amount;
  /** @type {Number} */
  days_duration;
  /**
   * @type {('first_subscription'|'upgrade_from_follow'|'subscription_recovery')} \
   * first_subscription - первая платная подписка \
   * upgrade_from_follow - переход с отслевижания на платную подписку \
   * subscription_recovery - подписка после перерыва
   */
  kind;
  /** @type {Number} unixtimestamp */

  /** @type {Number} */
  get daysDuration() {
    return this.days_duration;
  }
}

exports.SubscriptionCreate = SubscriptionCreate;
