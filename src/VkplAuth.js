"use strict";
/**
 * @typedef   {Object} Tokens
 * @property  {Number} expires_in     - Время протухания токена
 * @property  {String} access_token   - Токен доступа
 * @property  {String} refresh_token  - Токен обновления
 * @property  {String} token_type     - Тип токена доступа
 */

/**
 * @typedef   {'channel:credentials'|
 * 'chat:message:send'|
 * 'chat:settings'|
 * 'channel:roles'|
 * 'channel:points'|
 * 'channel:points:rewards:demands'|
 * 'channel:points:rewards'} Scope
 */

class VkplAuth {
  static get #getRedirectUri() {
    return new URL(process.env.VKPL_AUTH_REDIRECT_PATH, process.env.APP_HOST)
      .href;
  }

  static get #getBasicToken() {
    return Buffer.from(
      process.env.VKPL_ID + ":" + process.env.VKPL_SECRET
    ).toString("base64");
  }

  static get #getHeadersAuth() {
    return {
      Authorization: "Basic " + this.#getBasicToken,
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  /**
   * Метод генерации ссылки для перенаправление на окно авторизации VKPL
   *
   * @param   {Scope[]} [scope = []] Массив Scope
   * @param   {String}  [state = ""] Строка state
   * @return  {String}  Возвращает ссылку для перенаправления
   */
  static redirectToAuthCode(scope = [], state = "") {
    const url = new URL("https://auth.vkplay.live/app/oauth2/authorize");
    const redirect_uri = this.#getRedirectUri;
    url.searchParams.set("client_id", process.env.VKPL_ID);
    url.searchParams.set("redirect_uri", redirect_uri);
    url.searchParams.set("response_type", "code");
    if (scope.length) url.searchParams.set("scope", scope.join(","));
    if (state) url.searchParams.set("state", state);
    return url.href;
  }

  /**
   * Метод обмена кода или рефреш токена на новую пару токенов
   *
   * @param {('auth'|'refresh')} type
   *        auth - Аутентификация по code, refresh - Обновление по refresh_token
   * @param {string} codeOrToken
   *        code или refresh_token в зависимости от type
   * @return {Tokens}
   *        Возвращает объект с токенами
   */
  static async codeFlowAuth(type, codeOrToken) {
    if (!(type === "auth" || type === "refresh"))
      throw new Error("grant_type не верный, нужен либо auth, либо refresh");
    const grant_type = this.#getGrantType(type);

    const body = this.#getBody(grant_type, codeOrToken);
    const tokens = await this.#getTokens(body);

    return tokens;
  }

  static async #getTokens(body) {
    try {
      const result = await fetch(
        "https://api.live.vkplay.ru/oauth/server/token",
        {
          method: "POST",
          headers: this.#getHeadersAuth,
          body,
        }
      );
      return result.json();
    } catch (error) {
      throw error;
    }
  }

  static #getBody(grant_type, codeOrToken) {
    const body = { grant_type };
    if (grant_type !== "refresh_token") {
      body.code = codeOrToken;
      body.redirect_uri = this.#getRedirectUri;
    } else body.refresh_token = codeOrToken;

    return new URLSearchParams(body).toString();
  }

  static #getGrantType(type) {
    if (type === "auth") return "authorization_code";
    else if (type === "refresh") return "refresh_token";
    else return false;
  }
}

exports.VkplAuth = VkplAuth;
