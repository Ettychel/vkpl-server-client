"use strict";

const { Base } = require("./Base");
const { Category } = require("./Category");
const { SourceUrl } = require("./SourceUrl");

class StreamRecord extends Base {
  constructor(streamRecord) {
    super(streamRecord);
    this.id = this.raw.id;
    this.title = this.raw.title;
    this.duration = this.raw.duration;
    this.category = new Category(this.raw.category);
    this.sourceUrls = SourceUrl.hydrate(this.raw.SourceUrl);
    this.videoId = this.raw.video_id;
    this.stream_started_at = this.raw.stream_started_at;
    this.created_at = this.raw.created_at;
    this.preview_url = this.raw.preview_url;
    this.processState = this.raw.process_state;
  }

  /** @type {String} */
  id;
  /** @type {String} */
  title;
  /** @type {Number} */
  duration;
  /** @type {Category} */
  category;
  /** @type {SourceUrl[]} */
  sourceUrls;
  /** @type {Number} */
  videoId;
  /** @type {Number} */
  stream_started_at;
  /** @type {Number} */
  created_at;
  /** @type {String} */
  preview_url;
  /** @type {('wait'|'original_quality_only'|'done')} */
  processState;

  /** @returns {Date} */
  get streamStartedAt() {
    return new Date(this.stream_started_at);
  }

  /** @returns {Date} */
  get createdAt() {
    return new Date(this.created_at);
  }

  /** @returns {URL} */
  get previewUrl() {
    return new URL(this.previewUrl);
  }
}

exports.StreamRecord = StreamRecord;
