# VKPL Клиент для DevApi (Сервер)

Эта библиотека в данный момент предоставляет методы для упрощения авторизации в DevApi VKPL

Также реализован набор классов событий WebHook

## О классах

### Класс авторизации (VkplAuth)

Класс имеет два статических метода
 
- redirectToAuthCode - для генерации ссылки перенаправления на окно авторизации
- codeFlowAuth - обмен `code` полученного после перенаправления из окна авторизации или обмен `refresh_token` на новые токены авторизации

#### redirectToAuthCode(scope = [], state = "")

Принимает на вход: 
- `scope` - массив строк scope, которые есть в [документации](https://vkpl-docs.yetidev.ru/metody-i-scope#CbXiy) 
- `state` - произвольная строка, которая будет возвращена вместе с `code` после авторизации

Возвращает URL строку со всеми необходимыми параметрами `https://....`

#### async codeFlowAuth(type, codeOrToken)

Принимает на вход:
- `type` - может быть `"auth"` или `"refresh"`
  - `"auth"` - для первичной авторизации используя `code`
  - `"refresh"` - для обновления токенов используя `refresh_token`
- `codeOrToken` - передайте сюда либо `code`, либо `refresh_token`

Возвращает объект в соответствии с [документацией](https://vkpl-docs.yetidev.ru/codeflow-avtorizaciya#4Aa5F)

### Класс WebHook (VkplWH)

- Автоматически анализирует сигнатуру (`signature`)
- Предоставляет стандартную структуру для ответов на хук
- Выбрасывает исключение при:
  - отсутствии ключевых свойств
  - ошибке парсинга
  - недействительной подписи запроса
- При исключении в `error` есть свойство `answer`, которое следует отправить в ответ на хук (`'invalid_signature'` | `'unprocessable'`)

При успешном анализе хука класс имеет структуру:

| Свойство | Тип | Описание |
|---|---|---|
| id | String | Getter Идентификатор события |
| time | Date | Getter Время события |
| userId | Number | Getter Идентификатор пользователя VK Play Live |
| type | ENUM(<br>'channel_stream_start',<br>'channel_stream_pause',<br>'channel_stream_resume',<br>'channel_stream_stop',<br>'channel_stream_settings_change',<br>'channel_stream_record_new',<br>'channel_points_reward_demand_create',<br>'raid_start',<br>'channel_subscription_create',<br>'channel_subscription_renew',<br>'channel_subscription_change',<br>'channel_subscription_delete',<br>'channel_follow_create',<br>'channel_follow_delete',<br>'channel_subscription_gift_buy',<br>'channel_subscription_gift_give'<br>) | Getter Тип события |
| hook | ENUM(<br>ChannelStreamStart,<br>ChannelStreamPause,<br>ChannelStreamResume,<br>ChannelStreamStop,<br>ChannelStreamSettingsChange,<br>ChannelStreamRecordNew,<br>ChannelPointsRewardDemandCreate,<br>RaidStart,<br>ChannelSubscriptionCreate,<br>ChannelSubscriptionRenew,<br>ChannelSubscriptionChange,<br>ChannelSubscriptionDelete,<br>ChannelFollowCreate,<br>ChannelFollowDelete,<br>ChannelSubscriptionGiftBuy,<br>ChannelSubscriptionGiftGive<br>) | Один из классов события основанный на полезной нагрузке |
| data | Object | Getter Полезная нагрузка события |
| ok | Object | Getter Структура для ответа на хук |
| alreadyProcessed | Object | Getter Структура для ответа на хук |
| notLinked | Object | Getter Структура для ответа на хук |
| invalidSignature | Object | Getter Структура для ответа на хук |
| unprocessable | Object | Getter Структура для ответа на хук |
| body | Object | Исходные данные |

## Необходимые переменные окружения (env)

Переменные можно добавить как через пакет dotenv, так и указанием при запуске сервера, главное их наличие в process.env

| Имя | Описание |
|---|---|
| APP_HOST | Ссылка на корень сайта<br>Пример `https://domain.com` |
| VKPL_AUTH_REDIRECT_PATH | Путь от адреса для редиректа авторизации, который указывался при регистрации приложения<br>Пример `/auth/vkpl` |
| VKPL_ID | client_id |
| VKPL_SECRET | client_secret |
| VKPL_SIGNATURE_KEY | signature_key |

## Пример использования на основе expressjs

```JavaScript
require("dotenv").config();
const { VkplAuth } = require("../app/vkpl/VkplAuth");
const { VkplWH } = require("../app/vkpl/VkplWH");

const express = require("express");
const app = express();
const urlencoded = express.urlencoded({ extended: true });
const port = 3000;

app.use(urlencoded);

app.get("/vkpl", (req, res) => {
  res.redirect(
    VkplAuth.redirectToAuthCode([
      "chat:message:send",
      "chat:settings",
      "channel:points:rewards",
      "channel:points"
    ])
  );
});

app.get("/auth/vkpl", async (req, res) => {
  try {
    const tokens = await VkplAuth.codeFlowAuth("auth", req.query.code);
		console.log(tokens)
    res.status(200).send('ok');
  } catch (error) {
    res.status(500).send(error);
  }
});

.post("/webhook", (req, res) => {
  try {
    const webhook = new VkplWH(req.body);
    console.log('Id      --> ' + webhook.id);
    console.log('Time    --> ' + webhook.time);
    console.log('User Id --> ' + webhook.userId);
    console.log('Type    --> ' + webhook.type);
    console.log('')
    console.log('Data    --> ', webhook.data);
    console.log('')
    console.log('All     --> ', webhook.event);
		console.log('');
		console.log('Hook		 --> ', webhook.hook);
    res.json(webhook.ok);
  } catch (error) {
    console.error(error);
    res.json(error.answer);
  }
});

app.listen(port, () => {
	console.log("App listen " + process.env.APP_HOST);
});
```
