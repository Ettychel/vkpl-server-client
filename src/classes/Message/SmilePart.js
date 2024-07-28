"use strict";

/**
 * @typedef ISizes
 * @property {(String | undefined)} small
 * @property {(String | undefined)} medium
 * @property {(String | undefined)} large
 */

/**
 * @typedef ISmilePart
 * @property {ISmilePartContent} smile
 */

/**
 * @typedef ISmilePartContent
 * @property {String} id
 * @property {Boolean} animated
 * @property {String} name
 * @property {ISizes} sizes
 */

const { BasePart } = require("./BasePart");

class SmilePart extends BasePart {
  constructor({ smile }) {
    super({ smile });
    this.id = smile.id;
    this.animated = smile?.animated;
    this.name = smile?.name;
    this.sizes = {
      small: smile?.small_url,
      medium: smile?.medium_url,
      large: smile?.large_url,
    };
  }

  /** @type {String} */
  #type = "smile";
  /** @type {String} */
  id;
  /** @type {Boolean} */
  animated;
  /** @type {String} */
  name;
  /** @type {ISizes} */
  sizes = {
    small: undefined,
    medium: undefined,
    large: undefined,
  };

  /** @type {String} */
  get type() {
    return this.#type;
  }

  /**
   * Создание объекта из строки или объекта
   * @param {(ISmilePart|String)} link
   * @returns {ISmilePart}
   */
  static create(smile) {
    if (typeof smile === "object") return new this(smile);
    else {
      const newSmile = new this({ smile: { id: smile } });
      Object.keys(newSmile.sizes).forEach((size) => {
        newSmile.sizes[size] = this.#getLinkOfSize(newSmile.id, size);
      });
      return newSmile;
    }
  }

  /**
   * Генератор ссылки на смайл определенного размера
   * @param {String} id
   * @param {String} size
   * @returns {String}
   */
  static #getLinkOfSize(id, size) {
    return "https://images.live.vkplay.ru/smile/" + id + "/icon/size/" + size;
  }

  /**
   * Генерирует строку с HTML тегом
   * @param {String} src
   * @returns {String}
   */
  #tagTemplate(src) {
    return '<img src="' + src + '" alt="' + this.name + '"></img>';
  }

  /**
   * Преобразует в строку типа: :this.name
   * @returns {String}
   */
  toString() {
    return ":" + this.name;
  }

  /**
   * Возвращает HTML тег смайла большого размера
   * @returns {String}
   */
  getLargeTag() {
    return this.#tagTemplate(this.sizes.large);
  }

  /**
   * Возвращает HTML тег смайла среднего размера
   * @returns {String}
   */
  getMediumTag() {
    return this.#tagTemplate(this.sizes.medium);
  }

  /**
   * Возвращает HTML тег смайла маленького размера
   * @returns {String}
   */
  getSmallTag() {
    return this.#tagTemplate(this.sizes.small);
  }
}

exports.SmilePart = SmilePart;
