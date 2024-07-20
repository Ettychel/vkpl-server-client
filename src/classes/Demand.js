"use strict";

const { MessageParts } = require("./Message/MessageParts");
const { Reward } = require("./Reward");
const { User } = require("./User");

class Demand {
  constructor(demand) {
    this.id = demand.id;
    this.created_at = demand.created_at;
    this.message_parts = demand.message_parts;
    this.messageParts = new MessageParts(demand.message_parts);
    this.reward = new Reward(demand.reward);
    this.user = new User(demand.user);
  }
  /** @type {Number} */
  id;
  /** @type {Number} */
  created_at;
  /** @type {MessageParts} */
  messageParts;
  /** @type {Reward} */
  reward;
  /** @type {User} */
  user;

  /** @type {Date} */
  get createdAt() {
    return new Date(this.created_at);
  }
}

exports.Demand = Demand