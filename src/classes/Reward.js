"use strict";

class Reward {
  constructor(reward) {
    this.id = reward.id;
    this.name = reward.name;
    this.price = reward.price;
  }

  id;
  name;
  price;
}

exports.Reward = Reward