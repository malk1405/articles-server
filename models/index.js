const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config/index");

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("Established Mongoose Default Connection");
});

// When connection throws an error
mongoose.connection.on("error", err => {
  console.log("Mongoose Default Connection Error : " + err);
});
