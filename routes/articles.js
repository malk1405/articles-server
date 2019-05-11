const router = require("express").Router();
const articlesController = require("../controllers/articlesController");

router
  .route("/")
  .get(articlesController.findAll)
  .delete(articlesController.remove)
  .post(articlesController.create);

router
  .route("/:id")
  .get(articlesController.findById)
  .put(articlesController.update);

module.exports = router;
