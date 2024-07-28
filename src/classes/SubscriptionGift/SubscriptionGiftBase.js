"use strict";

const { Base } = require("../Base");
const { Level } = require("../Level");
const { User } = require("../User");

class SubscriptionGiftBase extends Base {
  constructor(subscription) {
    super(subscription);
    this.is_anonymous = subscription.is_anonymous;
    this.donator = this.#setDonator(subscription?.donator);
    this.level = new Level(subscription.level);
  }

  /** @type {Boolean} */
  is_anonymous;
  /** @type {Level} */
  level;

  /** @type {Boolean} */
  get isAnonymous() {
    return this.is_anonymous;
  }

  /** @returns {User | undefined} */
  #setDonator(donator) {
    if (donator) return new User(subscription.donator);
    return donator;
  }
}

exports.SubscriptionGiftBase = SubscriptionGiftBase;
