const { Author, fields } = require("../models/authors");
const myObjectId = require("mongoose").Types.ObjectId;

const { catchErr } = require("../utils/error");
const { checkDate } = require("../utils/date");

module.exports = {
  findAll: async function({ query }, res) {
    const { search, name, lastname } = query;
    let dbQuery =
      name || lastname
        ? Author.find({
            $and: [
              { lastname: new RegExp(lastname, "i") },
              { name: new RegExp(name, "i") }
            ]
          })
        : Author.find({
            $or: [
              { lastname: new RegExp(search, "i") },
              { name: new RegExp(search, "i") }
            ]
          });
    try {
      const authors = await dbQuery.exec();
      authors.forEach(author => {
        author.password = "";
      });
      res.json(authors);
    } catch (err) {
      catchErr(err, next);
    }
  },
  findById: async function({ params: { id } }, res, next) {
    try {
      const author = await Author.findById(myObjectId(id));
      if (!author) throw new Error("Автор не найден");
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
    try {
      if (req.body.birthDate)
        req.body.birthDate = checkDate(req.body.birthDate);

      res.json(
        await Author.findOneAndUpdate(
          { _id: myObjectId(req.params.id) },
          req.body,
          { new: true, runValidators: true }
        )
      );
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
