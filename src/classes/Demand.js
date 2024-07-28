"use strict";

const { MessageParts } = require("./Message/MessageParts");
const { Reward } = require("./Reward");
const { User } = require("./User");

class Demand extends Base {
  constructor(demand) {
    super(demand);
    this.id = this.raw.id;
    this.created_at = this.raw.created_at;
    this.message_parts = this.raw.message_parts;
    this.messageParts = new MessageParts(this.raw.message_parts);
    this.reward = new Reward(this.raw.reward);
    this.user = new User(this.raw.user);
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

exports.Demand = Demand;
