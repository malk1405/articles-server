const router = require("express").Router();
const authorRoutes = require("./authors");
const authRoutes = require("./auth");
const articleRoutes = require("./articles");

router.use("/api/auth", authRoutes);
router.use("/api/authors", authorRoutes);
router.use("/api/articles", articleRoutes);

module.exports = router;
