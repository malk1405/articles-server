const router = require("express").Router();
const jwt = require("../middleware/jwt");
const authorsController = require("../controllers/authorsController");

router
  .route("/")
  .get(authorsController.findAll)
  .post(authorsController.create, jwt.addToken);

router
  .route("/:id")
  .get(authorsController.findById)
  .put(authorsController.update)
  .delete(authorsController.remove);

module.exports = router;
