const { ChannelObject } = require("./classes/api/ChannelObject");
const { Client } = require("./Client");
const { getNonEmptyProp } = require("./Util");

class Vkpl {
  constructor(token) {
    this.#token = token;
    this.client = new Client(this.#token);
  }

  #token;

  get token() {
    return this.#token;
  }

  set token(value) {
    this.#token = value;
    this.client = new Client(this.#token);
  }

  //#region Методы каталога

  /**
   * Метод получения каталога каналов в онлайне
   * @param {Number} limit
   * @param {String} categoryId
   * @param {String} categoryType
   * @returns {Promise<ChannelObject[]>}
   */
  async getOnlineChannels(limit = 200, categoryId, categoryType) {
    const options = getNonEmptyProp({ limit, categoryId, categoryType });
    try {
      const response = await this.client.getOnlineChannels(options);
      console.time("test");
      const a = ChannelObject.hydrate(response.data.channels);
      console.timeEnd("test");
      return a;
    } catch (error) {
      throw error;
    }
  }
}

exports.Vkpl = Vkpl;
