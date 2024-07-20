"use strict";

const { Demand } = require("../classes/Demand");
const { BaseEvent } = require("./BaseEvent");

class ChannelPointsRewardDemandCreate extends BaseEvent {
  constructor(event) {
    super(event);
    this.demand = new Demand(event.demand);
  }

  demand
}

exports.ChannelPointsRewardDemandCreate = ChannelPointsRewardDemandCreate;
