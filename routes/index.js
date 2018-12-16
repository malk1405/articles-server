const router = require("express").Router();
const authorRoutes = require("./authors");
const articleRoutes = require("./articles");

router.use("/api/authors", authorRoutes);
router.use("/api/articles", articleRoutes);

module.exports = router;
