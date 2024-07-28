"use strict";

/**
 * @typedef WebSocketChannels
 * @property {String} chat
 * @property {String} private_chat
 * @property {String} info
 * @property {String} private_info
 * @property {String} channel_points
 * @property {String} private_channel_points
 * @property {String} limited_chat
 * @property {String} limited_private_chat
 */

const { Channel } = require("../Channel");

class ChannelAdvanced extends Channel {
  constructor(channel) {
    super(channel);
    this.status = this.raw.status;
    this.webSocketChannels = this.raw.web_socket_channels;
  }

  /** @type {String} */
  status;
  /** @type {WebSocketChannels} */
  webSocketChannels;

  get coverUrl() {
    return new URL(this.raw.cover_url);
  }
}

exports.ChannelAdvanced = ChannelAdvanced;
