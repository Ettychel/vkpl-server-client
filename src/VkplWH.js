"use strict";

const { createHash } = require("crypto");
const {
  ChannelStreamStart,
  ChannelStreamPause,
  ChannelStreamResume,
  ChannelStreamStop,
  ChannelStreamSettingsChange,
  ChannelStreamRecordNew,
  ChannelPointsRewardDemandCreate,
  RaidStart,
  ChannelSubscriptionCreate,
  ChannelSubscriptionRenew,
  ChannelSubscriptionChange,
  ChannelSubscriptionDelete,
  ChannelFollowCreate,
  ChannelFollowDelete,
  ChannelSubscriptionGiftBuy,
  ChannelSubscriptionGiftGive,
} = require("./WHEvents");

class VkplWH {
  constructor(body) {
    this.#checkDefaultProperty(body);
    this.body = body;
    this.#checkSignature();
    this.hook = this.#setHook();
  }

  body;

  /**
   * @type {(
   * ChannelStreamStart |
   * ChannelStreamPause |
   * ChannelStreamResume |
   * ChannelStreamStop |
   * ChannelStreamSettingsChange |
   * ChannelStreamRecordNew |
   * ChannelPointsRewardDemandCreate |
   * RaidStart |
   * ChannelSubscriptionCreate |
   * ChannelSubscriptionRenew |
   * ChannelSubscriptionChange |
   * ChannelSubscriptionDelete |
   * ChannelFollowCreate |
   * ChannelFollowDelete |
   * ChannelSubscriptionGiftBuy |
   * ChannelSubscriptionGiftGive \
   * )}
   */
  hook;

  get event() {
    try {
      return JSON.parse(this.body.event);
    } catch (error) {
      throw new VkplWHError(error.message, 0, this.unprocessable);
    }
  }

  /** @type {String} */
  get id() {
    return this.event.id;
  }

  /** @type {Date} */
  get time() {
    return new Date(this.event.time);
  }

  /** @type {Number} */
  get userId() {
    return this.event.user_id;
  }

  /**
   * @type {(
   * 'channel_stream_start'|
   * 'channel_stream_pause'|
   * 'channel_stream_resume'|
   * 'channel_stream_stop'|
   * 'channel_stream_settings_change'|
   * 'channel_stream_record_new'|
   * 'channel_points_reward_demand_create'|
   * 'raid_start'|
   * 'channel_subscription_create'|
   * 'channel_subscription_renew'|
   * 'channel_subscription_change'|
   * 'channel_subscription_delete'|
   * 'channel_follow_create'|
   * 'channel_follow_delete'|
   * 'channel_subscription_gift_buy'|
   * 'channel_subscription_gift_give' \
   * )}
   */
  get type() {
    return this.event.type;
  }

  get data() {
    return this.event.data;
  }

  get ok() {
    return this.#getResponseBody("ok");
  }

  get alreadyProcessed() {
    return this.#getResponseBody("already_processed");
  }

  get notLinked() {
    return this.#getResponseBody("not_linked");
  }

  get invalidSignature() {
    return this.#getResponseBody("invalid_signature");
  }

  get unprocessable() {
    return {
      status: "unprocessable",
    };
  }

  #checkSignature() {
    if (this.#calculateHash(this.body.event) !== this.body.signature)
      throw new VkplWHError(
        "Недействительная подпись запроса",
        1,
        this.invalidSignature
      );
  }

  #calculateHash(event) {
    return createHash("sha256")
      .update(event + process.env.VKPL_SIGNATURE_KEY)
      .digest("hex");
  }

  #checkDefaultProperty(body) {
    if (!("event" in body))
      throw new VkplWHError(
        "Отсутствует свойство event",
        0,
        this.unprocessable
      );
    if (!("signature" in body))
      throw new VkplWHError(
        "Отсутствует свойство signature",
        0,
        this.unprocessable
      );
    if (!process.env.VKPL_SIGNATURE_KEY)
      throw new VkplWHError(
        "Отсутствует signature_key в env",
        0,
        this.unprocessable
      );
  }

  #getResponseBody(status) {
    return {
      id: this.id,
      status,
    };
  }

  #setHook() {
    const className = this.#getClassHook();
    return new className(this.data);
  }

  #getClassHook() {
    switch (this.type) {
      case "channel_stream_start":
        return ChannelStreamStart;
      case "channel_stream_pause":
        return ChannelStreamPause;
      case "channel_stream_resume":
        return ChannelStreamResume;
      case "channel_stream_stop":
        return ChannelStreamStop;
      case "channel_stream_settings_change":
        return ChannelStreamSettingsChange;
      case "channel_stream_record_new":
        return ChannelStreamRecordNew;
      case "channel_points_reward_demand_create":
        return ChannelPointsRewardDemandCreate;
      case "raid_start":
        return RaidStart;
      case "channel_subscription_create":
        return ChannelSubscriptionCreate;
      case "channel_subscription_renew":
        return ChannelSubscriptionRenew;
      case "channel_subscription_change":
        return ChannelSubscriptionChange;
      case "channel_subscription_delete":
        return ChannelSubscriptionDelete;
      case "channel_follow_create":
        return ChannelFollowCreate;
      case "channel_follow_delete":
        return ChannelFollowDelete;
      case "channel_subscription_gift_buy":
        return ChannelSubscriptionGiftBuy;
      case "channel_subscription_gift_give":
        return ChannelSubscriptionGiftGive;
    }
  }
}

class VkplWHError {
  constructor(message, type, answer) {
    this.message = message;
    this.type = type;
    this.answer = answer;
  }

  answer;
  message;
  type;

  toString() {
    return this.message;
  }
}

exports.VkplWH = VkplWH;
