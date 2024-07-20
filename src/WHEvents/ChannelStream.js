"use strict";

const { BaseEvent } = require("./BaseEvent");
const { Stream } = require("../classes/Stream");

class ChannelStream extends BaseEvent {
  constructor(event) {
    super(event)
    this.stream = new Stream(event.stream);
  }
	/** @type {Stream} */
  stream;
}

class ChannelStreamStart extends ChannelStream {}

exports.ChannelStreamStart = ChannelStreamStart

class ChannelStreamPause extends ChannelStream {}

exports.ChannelStreamPause = ChannelStreamPause

class ChannelStreamResume extends ChannelStream {}

exports.ChannelStreamResume = ChannelStreamResume

class ChannelStreamStop extends ChannelStream {}

exports.ChannelStreamStop = ChannelStreamStop

class ChannelStreamSettingsChange extends ChannelStream {}

exports.ChannelStreamSettingsChange = ChannelStreamSettingsChange
