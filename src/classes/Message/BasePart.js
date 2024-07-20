class BasePart {
	_type

	toJSON() {
    const res = {};
    Object.keys(this)
      .filter((e) => !e.startsWith("_"))
      .forEach((i) => (res[i] = this[i]));
    return { [this._type]: res };
  }
}

exports.BasePart = BasePart