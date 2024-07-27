"use strict";

const { Base } = require("./Base");

class BaseUser extends Base {
  constructor(user) {
    super(user);
    this.id = user.id;
  }

  /** @type {Number} */
  id;
}

exports.BaseUser = BaseUser;
