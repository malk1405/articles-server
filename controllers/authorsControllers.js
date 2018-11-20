// authorsControllers.js
const Author = require("../models/Authors");

// Defining all methods and business logic for routes

module.exports = {
  findAll: function(req, res) {
    Author.find(req.query)
      .then(authors => res.json(authors))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Author.findById(req.params.id)
      .then(author => res.json(author))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    Author.create(req.body)
      .then(newAuthor => res.json(newAuthor))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    Author.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(author => res.json(author))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Author.findById({ _id: req.params.id })
      .then(author => author.remove())
      .then(allauthors => res.json(allauthors))
      .catch(err => res.status(422).json(err));
  }
};
