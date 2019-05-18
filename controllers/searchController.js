const Article = require("../models/articles");
const { Author } = require("../models/authors");
const { catchErr } = require("../utils/error");

module.exports = {
  search: async function({ query: { value, page } }, res, next) {
    try {
      const articles = await Article.find({
        $or: [
          { title: new RegExp(value, "i") },
          { "authors.name": new RegExp(value, "i") },
          { "authors.lastname": new RegExp(value, "i") }
        ]
      });
      const articlesNumber = articles.length;

      const authors = await Author.find({
        $or: [
          { lastname: new RegExp(value, "i") },
          { name: new RegExp(value, "i") }
        ]
      });

      const authorsNumber = authors.length;
      if (page === "authors") {
        return res.json({ articlesNumber, authorsNumber, authors });
      }
      res.json({ articlesNumber, authorsNumber, articles });
    } catch (error) {
      catchErr(error, next);
    }
  }
};
