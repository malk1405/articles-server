const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Vitalina");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
