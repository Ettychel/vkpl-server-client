"use strict";

const { User } = require("./User");

class Follow {
  constructor(follow) {
    this.follower = new User(follow.follower);
    this.started_at = follow.started_at;
    this.ended_at = follow?.ended_at;
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

exports.Follow = Follow