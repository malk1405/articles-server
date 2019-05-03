const express = require("express");
const app = express();

const routes = require("./routes");

const PORT = 5000;

require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("*", (req, res, next) => {
//   console.log(req.body);
//   next();
// });

app.use(routes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const { message } = err;

  res.status(statusCode).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
