const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  authorId: mongoose.Types.ObjectId,
  name: String,
  patronym: String,
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
  publicationDate: { type: Date, required: true },

  authors: {
    type: [authorSchema],
    required: true
  },
  pages: {
    type: Number,
    required: true
  }
});
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
