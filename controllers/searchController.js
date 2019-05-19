const Article = require("../models/articles");
const { Author } = require("../models/authors");
const { catchErr } = require("../utils/error");

const buttons = [
  { name: "articles", title: "Статьи" },
  { name: "authors", title: "Авторы" }
];
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

      const authors = await Author.find({
        $or: [
          { lastname: new RegExp(value, "i") },
          { name: new RegExp(value, "i") }
        ]
      });

      const responce = {
        buttons,
        authorsNumber: authors.length,
        articlesNumber: articles.length
      };
      if (page === "authors") responce.authors = authors;
      else responce.articles = articles;
      res.json(responce);
    } catch (error) {
      catchErr(error, next);
    }
  }
};
