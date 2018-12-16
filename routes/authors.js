const router = require("express").Router();
const authorsController = require("../controllers/authorsController");

router
  .route("/")
  .get(authorsController.findAll)
  .post(authorsController.create);

router
  .route("/:id")
  .get(authorsController.findById)
  .put(authorsController.update)
  .delete(authorsController.remove);

module.exports = router;
