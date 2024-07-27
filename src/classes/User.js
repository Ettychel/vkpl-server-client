"use strict";

const colors = require("../json/colors.json");
const { BaseUser } = require("./BaseUser");

class User extends BaseUser {
  constructor(user) {
    super(user);
    this.nick = user.nick;
    this.nickColor = user.nick_color;
  }

  /** @type {String} */
  nick;

  /** @type {Number} */
  nickColor;

  /** @type {String} - HEX */
  get color() {
    return colors[this.nickColor];
  }

  /** @type {URL} */
  get avatarUrl() {
    return new URL(this.raw.avatar_url);
  }
}

exports.User = User;
