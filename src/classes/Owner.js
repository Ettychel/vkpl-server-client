"use strict";

const { User } = require("./User");

class Owner extends User {
  constructor(owner) {
    super(owner);
    this.isVerifiedStreamer = owner.is_verified_streamer;
  }

  isVerifiedStreamer;
}

exports.Owner = Owner;
