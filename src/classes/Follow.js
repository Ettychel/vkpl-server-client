"use strict";

const { Base } = require("./Base");
const { User } = require("./User");

class Follow extends Base {
  constructor(follow) {
    super(follow);
    this.follower = new User(this.raw.follower);
    this.started_at = this.raw.started_at;
    this.ended_at = this.raw?.ended_at;
  }

  /** @type {User} */
  follower;
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

exports.Follow = Follow;
