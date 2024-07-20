import vkColors from '../../json/vkColors.json'
import Vkpl from '.'

export class VkplMessage {
  constructor(data) {
    this.client = Vkpl
    this.raw = data
    this.id = data.id
    this.created_at = data.created_at
    this.is_private = data.is_private
    this.author = new Author(data.author)
    this.parts = new Parts(data.parts)
    this.is_bot = this.author.nick === 'ChatBot'
    if (this.is_bot) {
      const author = this.parts.parts.find(
        (part) => part instanceof MentionPart
      )
      if (author) this.author = new Author(author)
    }
  }

  client
  raw
  id
  created_at
  is_private
  author
  parts
  is_bot

  reply(text) {
    this.client.say(' ' + text, this.author)
  }
}

export class Author {
  constructor(author) {
    this.id = author?.id
    this.nick = author.nick
    this.nick_color = author?.nick_color
    this.is_owner = author?.is_owner
    this.is_moderator = author?.is_moderator
  }

  id
  nick
  nick_color
  is_owner
  is_moderator

  get color() {
    return vkColors[this.nick_color]
  }
}

export class Parts {
  constructor(parts) {
    this.parts = this.parseParts(parts)
  }

  parseParts(parts) {
    return parts.map((part) => {
      if ('text' in part) part = new TextPart(part)
      if ('smile' in part) part = new SmilePart(part)
      if ('mention' in part) part = new MentionPart(part)
      if ('link' in part) part = new LinkPart(part)
      return part
    })
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    const a = this.parts.map((part) => {
      return part.toString()
    })
    return a.join('')
  }
}

export class TextPart {
  constructor({ text }) {
    this.content = text.content
  }

  type = 'text'
  content

  toString() {
    return this.content
  }
}

export class SmilePart {
  constructor({ smile }) {
    this.id = smile.id
    this.animated = smile.animated
    this.name = smile.name
    this.sizes = {
      small: smile.small_url,
      medium: smile.medium_url,
      large: smile.large_url,
    }
  }

  type = 'smile'
  id
  animated
  name
  sizes = {
    small: undefined,
    medium: undefined,
    large: undefined,
  }

  toString() {
    return ':' + this.name
  }

  #tagTemplate(src) {
    const tag = document.createElement('img')
    tag.setAttribute('src', src)
    tag.setAttribute('alt', this.name)
    return tag
  }

  getLargeTag() {
    return this.#tagTemplate(this.sizes.large)
  }

  getMediumTag() {
    return this.#tagTemplate(this.sizes.medium)
  }

  getSmallTag() {
    return this.#tagTemplate(this.sizes.small)
  }
}

export class MentionPart {
  constructor({ mention }) {
    this.id = mention.id
    this.nick = mention.nick
  }

  type = 'mention'
  id
  nick

  toString() {
    return '@' + this.nick + ' '
  }
}

export class LinkPart {
  constructor({ link }) {
    this.url = link.url
    this.content = link.content
  }

  url
  content

  toString() {
    return this.content
  }

  getTag() {
    const tag = document.createElement('a')
    tag.setAttribute('href', this.url)
    tag.innerText = this.content
  }
}
