"use strict";

const { BasePart } = require("./BasePart");
const { LinkPart } = require("./LinkPart");
const { MentionPart } = require("./MentionPart");
const { SmilePart } = require("./SmilePart");
const { TextPart } = require("./TextPart");

class MessageParts extends Array {
  constructor(...parts) {
    this.raw = parts;
    parts = parts.flat(Infinity);
    super(...parts);
    this.#hydrate();
  }

  /** Исходные данные переданные в конструктор */
  raw;

  /**
   * Преобразует объекты part в классы XPart
   */
  #hydrate() {
    this.forEach((part, i, arr) => {
      if ("text" in part) arr[i] = new TextPart(part);
      if ("smile" in part) arr[i] = new SmilePart(part);
      if ("mention" in part) arr[i] = new MentionPart(part);
      if ("link" in part) arr[i] = new LinkPart(part);
      if (arr[i] instanceof BasePart) return;
      throw new Error("Тип не определен");
    });
  }

  // static createFromString() {}

  /** @returns {string} Возвращает строку JSON */
  toJSON() {
    return JSON.stringify([...this].map((part) => part.toJSON()));
  }

  /** @returns {string} Возвращает как строку с условными префиксами */
  toString() {
    return [...this]
      .map((part) => {
        return part.toString();
      })
      .join("");
  }
}

exports.MessageParts = MessageParts;
