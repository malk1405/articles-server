const Article = require("../models/articles");
const myObjectId = require("mongoose").Types.ObjectId;

const { checkDate } = require("../utils/date");

module.exports = {
  findAll: function(req, res) {
    let authorId = req.query.author;
    const queryParams = authorId
      ? { "authors.authorId": myObjectId(authorId) }
      : {};
    Article.find(queryParams)
      .then(articles => res.json(articles))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Article.findById(myObjectId(req.params.id))
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const { title, publicationDate, authors } = req.body;
    const newPublicationDate = checkDate(publicationDate);
    Article.create({ title, publicationDate: newPublicationDate, authors })
      .then(newArticle => res.json(newArticle))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    const { name, lastname, birthDate, email } = req.body;
    const newBirthDate = checkDate(birthDate);
    const newArticle = {};
    if (name) newArticle.name = name;
    if (lastname) newArticle.lastname = lastname;
    if (newBirthDate) newArticle.birthDate = newBirthDate;
    if (email) newArticle.email = email;
    Article.findOneAndUpdate({ _id: myObjectId(req.params.id) }, newArticle)
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Article.findById(myObjectId(req.body.id))
      .then(article => article.remove())
      .then(allarticles => res.json(allarticles))
      .catch(err => res.status(422).json(err));
  }
};
