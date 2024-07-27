"use strict";

const { Stream } = require("../Stream");
const { Counters } = require("../Counters");
const { Reaction } = require("../Reaction");

class StreamAdvanced extends Stream {
  constructor(stream) {
    super(stream);
    this.counters = new Counters(this.raw.counters);
    this.reactions = Reaction.hydrate(this.raw.reactions);
  }

  /** @type {Counters} */
  counters;
  /** @type */
  reactions;
}

exports.StreamAdvanced = StreamAdvanced;
