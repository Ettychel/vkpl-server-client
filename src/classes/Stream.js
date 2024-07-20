"use strict";

const { Category } = require("./Category");

class Stream {
  constructor(stream) {
    this.id = stream.id;
    this.title = stream.title;
    this.category = new Category(stream.category);
    this.videoId = stream.video_id;
    this.started_at = stream.started_at;
    this.ended_at = stream.ended_at;
    this.preview_url = stream.preview_url;
  }

  /** @type {String} */
  id;
  /** @type {String} */
  title;
  /** @type {Category} */
  category;
  /** @type {Number} */
  videoId;
  /** @type {Number} */
  started_at;
  /** @type {Number} */
  ended_at;
  /** @type {String} */
  preview_url;

  /** @returns {Date} */
  get startedAt() {
    return new Date(this.started_at);
  }

  /** @returns {Date} */
  get endedAt() {
    return new Date(this.ended_at);
  }

  /** @returns {URL} */
  get previewUrl() {
    return new URL(this.preview_url);
  }
}

exports.Stream = Stream;
