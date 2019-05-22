const Article = require("../models/articles");
const { Author } = require("../models/authors");
const { catchErr } = require("../utils/error");

const buttons = {
  articles: { title: "Статьи" },
  authors: { title: "Авторы" }
};
module.exports = {
  search: async function(
    { query: { value, page, min, max, authorId, pageNumber = 1, limit = 0 } },
    res,
    next
  ) {
    console.log(pageNumber, limit);
    try {
      const startDate = min ? new Date(min) : new Date("100");
      const endDate = max ? new Date(max) : new Date("3000");
      buttons.articles.number = await Article.find({
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
      }).countDocuments();

      buttons.authors.number = await Author.find({
        $or: [
          { lastname: new RegExp(value, "i") },
          { name: new RegExp(value, "i") }
        ]
      }).countDocuments();

      const responce = {
        buttons
      };

      if (page === "authors")
        responce.authors = await Author.find({
          $or: [
            { lastname: new RegExp(value, "i") },
            { name: new RegExp(value, "i") }
          ]
        });
      else {
        responce.fields = [
          { name: "min", type: "number", title: "От" },
          { name: "max", type: "number", title: "До" }
        ];
        responce.articles = await Article.find({
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
        })
          .skip((pageNumber - 1) * limit)
          .limit(+limit);
      }
      res.json(responce);
    } catch (error) {
      catchErr(error, next);
    }
  }
};
