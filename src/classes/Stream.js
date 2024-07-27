"use strict";

const { Base } = require("./Base");
const { Category } = require("./Category");

class Stream extends Base {
  constructor(stream) {
    super(stream);
    this.id = this.raw.id;
    this.title = this.raw.title;
    this.category = this.raw.category
      ? new Category(this.raw.category)
      : undefined;
    this.videoId = this.raw.video_id;
  }

  /** @type {String} */
  id;
  /** @type {String} */
  title;
  /** @type {Category} */
  category;
  /** @type {Number} */
  videoId;

  /** @returns {Date} */
  get startedAt() {
    return new Date(this.raw.started_at);
  }

  /** @returns {Date} */
  get endedAt() {
    return new Date(this.raw.ended_at);
  }

  /** @returns {URL} */
  get previewUrl() {
    return new URL(this.raw.preview_url);
  }
}

exports.Stream = Stream;
