const { Author, fields } = require("../models/authors");
const myObjectId = require("mongoose").Types.ObjectId;

const { catchErr } = require("../utils/error");
const { checkDate } = require("../utils/date");

module.exports = {
  findAll: function({ query }, res) {
    let regex = new RegExp("", "i");
    const { search } = query;
    if (search) regex = new RegExp(search, "i");
    Author.find({ $or: [{ lastname: regex }, { name: regex }] })
      .then(authors => {
        authors.forEach(author => {
          author.password = "";
        });
        res.json(authors);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: async function({ params: { id } }, res, next) {
    try {
      const author = await Author.findById(myObjectId(id));
      res.json(
        fields
          .filter(({ name }) => name !== "password")
          .map(e => {
            const { unique, ...newEl } = { ...e };
            newEl.value = author[e.name] || "";
            return newEl;
          })
      );
    } catch (err) {
      catchErr(err, next);
    }
  },
  create: async function(req, res, next) {
    const author = new Author(req.body);
    try {
      req.user = await author.save();
      return next();
    } catch (error) {
      catchErr(error, next);
    }
  },
  update: async function(req, res, next) {
    const newBirthDate = checkDate(req.body.birthDate);
    const newAuthor = { ...req.body, birthDate: newBirthDate };
    try {
      const author = await Author.findOneAndUpdate(
        { _id: myObjectId(req.params.id) },
        newAuthor,
        {
          new: true
        }
      );
      res.json(author);
    } catch (err) {
      catchErr(err, next);
    }
  },
  remove: function(req, res) {
    Author.findById({ _id: myObjectId(req.params.id) })
      .then(author => author.remove())
      .then(allauthors => res.json(allauthors))
      .catch(err => res.status(422).json(err));
  }
};
