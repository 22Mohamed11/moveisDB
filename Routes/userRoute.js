//const userModel = require("../Models/userSchema.js");
const router = require("express").Router();
const {signUp,login} = require("../Controllers/userController.js");
const {signUpValidator,loginValidator} = require("../Utils/Validators/userValidator.js");

router.post("/signup", signUpValidator, signUp);
router.post("/signin", loginValidator, login);

module.exports = router;
function requireAuth(req, res, next) {
  if (!req.tokenData)
    return res.status(401).json({ message: "You are not logged in!" });
  else next();
}

module.exports = router;