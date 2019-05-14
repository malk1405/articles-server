const router = require("express").Router();
const authController = require("../controllers/authController");
const jwt = require("../middleware/jwt");

router.route("/").post(authController.login, jwt.addToken);

module.exports = router;
