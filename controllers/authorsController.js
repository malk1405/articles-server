const Author = require("../models/authors");
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
  findById: function(req, res) {
    Author.findById(myObjectId(req.params.id))
      .then(author => res.json(author))
      .catch(err => res.status(422).json(err));
  },
  create: async function(req, res, next) {
    const { name, lastname, birthDate, email, password } = req.body;
    const newBirthDate = checkDate(birthDate);

    const author = new Author({
      name,
      lastname,
      patronym,
      tel,
      acDeg,
      post,
      salary,
      birthDate: newBirthDate,
      email,
      password
    });

    try {
      req.user = await author.save();
      return next();
    } catch (error) {
      catchErr(error, next);
    }
  },
  update: function(req, res) {
    console.log(req.body);
    const {
      name,
      patronym,
      tel,
      acDeg,
      post,
      salary,
      lastname,
      birthDate,
      email
    } = req.body;
    const newBirthDate = checkDate(birthDate);
    const newAuthor = {};
    if (name) newAuthor.name = name;
    if (lastname) newAuthor.lastname = lastname;
    if (newBirthDate) newAuthor.birthDate = newBirthDate;
    if (email) newAuthor.email = email;
    if (patronym) newAuthor.patronym = patronym;
    if (tel) newAuthor.tel = tel;
    if (acDeg) newAuthor.acDeg = acDeg;
    if (post) newAuthor.post = post;
    if (salary) newAuthor.salary = salary;
    Author.findOneAndUpdate({ _id: myObjectId(req.params.id) }, newAuthor, {
      new: true
    })
      .then(author => {
        res.json(author);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Author.findById({ _id: myObjectId(req.params.id) })
      .then(author => author.remove())
      .then(allauthors => res.json(allauthors))
      .catch(err => res.status(422).json(err));
  }
};
