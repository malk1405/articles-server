const mongoose = require("mongoose");
require("mongoose-type-email");

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

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
