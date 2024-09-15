const { check } = require("express-validator");
const { validatorMiddleware } = require("../../Middlewares/validator");
const userModel = require("../../Models/userSchema");

exports.signUpValidator = [
  //checking if the Full Name exists in database or not
  check("first_name")
    .notEmpty()
    .withMessage("first name is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("name length must be between 2 and 50"),
  check("last_name")
    .notEmpty()
    .withMessage("user name is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("name length must be between 2 and 50"),
  
  //checking if the Email exists in database or not
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email address")
    .custom((val) =>
      userModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("This Email already exists"));
        }
      })
    ),
  //checking if the Password exists in database or not
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password should be between 6 and 20"),
  validatorMiddleware,
];
// Login by Email and Password
exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password should be between 6 and 20"),
  validatorMiddleware,
];