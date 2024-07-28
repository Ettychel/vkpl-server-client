"use strict";

const { Base } = require("./Base");
const { Channel } = require("./Channel");
const { User } = require("./User");

class Raid extends Base {
  constructor(raid) {
    super(raid);
    this.channel = new Channel(this.raw.source.channel);
    this.owner = new User(this.raw.source.owner);
    this.raiders_count = this.raw.raiders_count;
    this.started_at = this.raw.started_at;
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
