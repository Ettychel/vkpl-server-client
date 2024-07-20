"use strict";
const { Channel } = require("./Channel");
const { User } = require("./User");

class Raid {
  constructor(raid) {
    this.channel = new Channel(raid.source.channel);
    this.owner = new User(raid.source.owner);
    this.raiders_count = raid.raiders_count;
    this.started_at = raid.started_at;
  }

  /** @type {Channel} */
  channel;
  /** @type {User} */
  owner;
  /** @type {Number} */
  raiders_count;
  /** @type {Number} */
  started_at;

  /** @type {Number} */
  get raidersCount() {
    return this.raidersCount;
  }

  /** @type {Date} */
  get startedAt() {
    return new Date(this.started_at);
  }
}

exports.Raid = Raid;
