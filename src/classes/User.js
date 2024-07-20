const colors = require('../json/colors.json')

class User {
  constructor(user) {
    this.id = user.id
    this.nick = user.nick
    this.nick_color = user.nick_color
		this.avatar_url = user.avatar_url
  }

  id
  nick
  nick_color
	avatar_url

  get color() {
    return colors[this.nick_color]
  }
}

exports.User = User