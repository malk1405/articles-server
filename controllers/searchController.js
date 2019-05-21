const Article = require("../models/articles");
const { Author } = require("../models/authors");
const { catchErr } = require("../utils/error");

const buttons = [
  { name: "articles", title: "Статьи" },
  { name: "authors", title: "Авторы" }
];
module.exports = {
  search: async function(
    { query: { value, page, min, max, authorId } },
    res,
    next
  ) {
    try {
      const startDate = min ? new Date(min) : new Date("100");
      const endDate = max ? new Date(max) : new Date("3000");
      const articles = await Article.find({
        $and: [
          {
            $or: [
              { title: new RegExp(value, "i") },
              { "authors.name": new RegExp(value, "i") },
              { "authors.lastname": new RegExp(value, "i") }
            ]
          },
          { publicationDate: { $gte: startDate, $lte: endDate } },
          authorId ? { "authors.authorId": authorId } : {}
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
      else {
        responce.fields = [
          { name: "min", type: "number", title: "От" },
          { name: "max", type: "number", title: "До" }
        ];
        responce.articles = articles;
      }
      res.json(responce);
    } catch (error) {
      catchErr(error, next);
    }
  }
};
