const mongoose = require("mongoose");
require("mongoose-type-email");
const bcrypt = require("bcryptjs");
const { catchErr } = require("../utils/error");
const { createSchema } = require("../utils/model");
const Schema = mongoose.Schema;

const fields = [
  { name: "name", required: true, title: "Имя" },
  { name: "patronym", title: "Отчество" },
  { name: "lastname", required: true, title: "Фамилия" },
  {
    name: "email",
    type: "email",
    required: true,
    unique: true,
    title: "E-mail"
  },
  { name: "birthDate", type: "date", title: "Дата рождения" },
  { name: "tel", type: "number", title: "Телефон" },
  { name: "post", title: "Должность" },
  { name: "academic_degree", title: "Академическая степень" },
  { name: "salary", type: "number", title: "Доля ставки" },
  { name: "password", type: "password", required: true, title: "Пароль" }
];

const authorSchema = new Schema(createSchema(fields));

authorSchema.pre("save", async function(next) {
  try {
    this.password = await hashPassword(this.password);
  } catch (error) {
    catchErr(error, next);
  }

  next();
});

async function hashPassword(password) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) reject(err);
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });

  return hashedPassword;
}

const Author = mongoose.model("Author", authorSchema);

module.exports = { Author, fields };
