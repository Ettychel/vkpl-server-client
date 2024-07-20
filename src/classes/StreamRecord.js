"use strict";

const { Category } = require("./Category");
const { SourceUrl } = require("./SourceUrl");

class StreamRecord {
  constructor(streamRecord) {
    this.id = streamRecord.id;
    this.title = streamRecord.title;
    this.duration = streamRecord.duration;
    this.category = new Category(streamRecord.category);
    this.sourceUrls = SourceUrl.hydrate(streamRecord.SourceUrl);
    this.videoId = streamRecord.video_id;
    this.stream_started_at = streamRecord.stream_started_at;
    this.created_at = streamRecord.created_at;
    this.preview_url = streamRecord.preview_url;
    this.processState = streamRecord.process_state;
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
