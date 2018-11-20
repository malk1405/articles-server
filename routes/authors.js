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

// router.route("/").get((req, res) => {
//   res.send({ name: "Oleg1", b: 1235 });
// });

module.exports = router;
