class Client {
  constructor(token) {
    if (token.startsWith("Bearer ")) this.#token = token;
    else this.#token = "Bearer " + token;
  }

  #token;

  baseURL = "https://apidev.live.vkplay.ru/v1";

  /**
   *
   * @param {String} path
   * @param {Object} query
   */
  #getUrl(path, queries) {
    if (!path.startsWith("/")) path = "/" + path;
    const url = new URL(this.baseURL + path);
    if (queries)
      Object.keys(queries).forEach((key) => {
        url.searchParams.set(key, queries[key]);
      });
    return url.href;
  }

  #getDefaultHeaders() {
    return {
      Authorization: this.#token,
      "Content-Type": "application/json",
    };
  }

  async get(path, queries) {
    return fetch(this.#getUrl(path, queries), {
      headers: this.#getDefaultHeaders(),
    });
  }

  /**
   *
   * @param {String} path
   * @param {Object} queries
   * @param {Object} body
   */
  async post(path, queries, body) {
    return fetch(this.#getUrl(path, queries), {
      headers: this.#getDefaultHeaders(),
      body,
    });
  }

  async getOnlineChannels(options) {
    const response = await this.get("/catalog/online_channels", options);
    return this.#getJsonOrFail(response);
  }

  async #getJsonOrFail(response) {
    const status = response.status;
    const body = await response.json();
    if (!response.ok) throw new ExceptionApi(status, body);
    return body;
  }
}

class ExceptionApi extends Error {
  constructor(status, body) {
    super();
    this.#body = body;
    this.#status = status;
    this.message = this.toString();
  }

  #body;
  #status;

  get body() {
    return this.#body;
  }

  get status() {
    return this.#status;
  }

  get error() {
    return this.#body?.error;
  }

  get errorDescription() {
    return this.#body?.error_description;
  }

  toString() {
    return "status: " + this.status + "\n" + JSON.stringify(this.body);
  }
}

exports.Client = Client;
