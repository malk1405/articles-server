const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { createSchema } = require("../utils/model");

const author_fields = [
  { name: "name", required: true, title: "Имя" },
  { name: "lastname", required: true, title: "Фамилия" },
  { name: "authorId", type: "id" }
];

const fields = [
  { name: "title", title: "Название", required: true },
  {
    name: "publicationDate",
    type: "number",
    title: "Дата публикации",
    required: true
  },
  {
    name: "pages",
    type: "number",
    title: "Количество страниц",
    required: true
  },
  {
    name: "authors",
    required: true,
    type: "array",
    of: author_fields,
    title: "Автор"
  }
];

const articleSchema = new Schema(createSchema(fields));
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
