module.exports = {
  addToken: function({ user: { _id, name, lastname } }, res) {
    res.json({ user: { _id, name, lastname } });
  }
};
