"use strict";

const { BaseEvent } = require("./BaseEvent");
const { StreamRecord } = require("../classes/StreamRecord");

class ChannelStreamRecordNew extends BaseEvent {
  constructor(event) {
    super(event);
    this.streamRecord = new StreamRecord(event.stream_record);
  }

  /** @type {StreamRecord} */
  streamRecord;
}

exports.ChannelStreamRecordNew = ChannelStreamRecordNew;
