const mongoose = require("mongoose");
require("mongoose-type-email");
const bcrypt = require("bcryptjs");
const { catchErr } = require("../utils/error");

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

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
