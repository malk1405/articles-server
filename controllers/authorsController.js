const Author = require("../models/authors");
const myObjectId = require("mongoose").Types.ObjectId;

const { catchErr } = require("../utils/error");
const { checkDate } = require("../utils/date");

module.exports = {
  findAll: function(req, res) {
    Author.find(req.query)
      .then(authors => res.json(authors))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Author.findById(myObjectId(req.params.id))
      .then(author => res.json(author))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res, next) {
    const { name, lastname, birthDate, email } = req.body;
    const newBirthDate = checkDate(birthDate);

    Author.create({ name, lastname, birthDate: newBirthDate, email })
      .then(newAuthor => res.json(newAuthor))
      .catch(err => catchErr(err, next));
  },
  update: function(req, res) {
    const { name, lastname, birthDate, email } = req.body;
    const newBirthDate = checkDate(birthDate);
    const newAuthor = {};
    if (name) newAuthor.name = name;
    if (lastname) newAuthor.lastname = lastname;
    if (newBirthDate) newAuthor.birthDate = newBirthDate;
    if (email) newAuthor.email = email;
    Author.findOneAndUpdate({ _id: myObjectId(req.params.id) }, newAuthor)
      .then(author => res.json(author))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Author.findById({ _id: myObjectId(req.params.id) })
      .then(author => author.remove())
      .then(allauthors => res.json(allauthors))
      .catch(err => res.status(422).json(err));
  }
};
