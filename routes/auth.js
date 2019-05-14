const router = require("express").Router();
const authController = require("../controllers/authController");
const jwt = require("../middleware/jwt");

router.route("/").post(authController.login, jwt.addToken);

router.route("/signin").get(authController.signin);
router.route("/signup").get(authController.signup);

module.exports = router;
