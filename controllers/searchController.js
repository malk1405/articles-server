const Article = require("../models/articles");
const { Author } = require("../models/authors");
const { catchErr } = require("../utils/error");

module.exports = {
  search: async function({ query: { value } }, res, next) {
    try {
      const articlesNumber = await Article.find({
        $or: [
          { title: new RegExp(value, "i") },
          { "authors.name": new RegExp(value, "i") },
          { "authors.lastname": new RegExp(value, "i") }
        ]
      });
      const authorsNumber = await Author.find({
        $or: [
          { lastname: new RegExp(value, "i") },
          { name: new RegExp(value, "i") }
        ]
      }).countDocuments();

      res.json({ articlesNumber, authorsNumber });
    } catch (error) {
      catchErr(error, next);
    }
  }
};
