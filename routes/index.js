const router = require("express").Router();
const authorRoutes = require("./authors");
const authRoutes = require("./auth");
const articleRoutes = require("./articles");
const searchRoutes = require("./search");

router.use("/api/auth", authRoutes);
router.use("/api/authors", authorRoutes);
router.use("/api/articles", articleRoutes);
router.use("/api/search", searchRoutes);

module.exports = router;
