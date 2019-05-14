const mongoose = require("mongoose");
require("mongoose-type-email");
const bcrypt = require("bcryptjs");
const { catchErr } = require("../utils/error");
const { createSchema } = require("../utils/model");
const Schema = mongoose.Schema;

const fields = [
  { name: "name", type: "string", required: true },
  { name: "patronym", type: "string" },
  { name: "lastname", type: "string", required: true },
  { name: "birthDate", type: "date" },
  { name: "tel", type: "number", required: true },
  { name: "post", type: "string" },
  { name: "academic_degree", type: "string" },
  { name: "salary", type: "number" },
  { name: "email", type: "email", required: true, unique: true },
  { name: "password", type: "password", required: true }
];

const authorSchema = new Schema(createSchema(fields));

authorSchema.pre("save", async function(next) {
  let { password } = this;

  try {
    const hashedPassword = await hashPassword(password);
    password = hashedPassword;
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

module.exports = Author;
