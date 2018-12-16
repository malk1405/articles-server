const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  authorId: mongoose.Types.ObjectId,
  name: String,
  lastname: {
    type: String,
    required: true
  }
});

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  publicationDate: Date,
  authors: {
    type: [authorSchema]
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
