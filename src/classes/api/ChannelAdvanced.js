"use strict";

const { Base } = require("../Base");

class ChannelAdvanced extends Base {
  constructor(channel) {
    super(channel);
    this.url = this.raw.url;
    this.status = this.raw.status;
    this.webSocketChannels = this.raw.web_socket_channels;
  }

  url;
  status;
  webSocketChannels;

  get coverUrl() {
    return new URL(this.raw.cover_url);
  }
}

exports.ChannelAdvanced = ChannelAdvanced;
