const router = require("express").Router();
const authorRoutes = require("./authors");

router.use("/api/authors", authorRoutes);

module.exports = router;
