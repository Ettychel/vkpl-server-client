exports.getNonEmptyProp = (object) => {
  Object.keys(object).forEach((key) => {
    if (!object[key]) delete object[key];
  });
  return object;
};

exports.hydrate = (model, array) => {
  return array.map((elem) => new model(elem));
};
