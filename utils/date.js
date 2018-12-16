module.exports.checkDate = value => {
  if (!Date.parse(value)) return undefined;

  return new Date(value);
};
