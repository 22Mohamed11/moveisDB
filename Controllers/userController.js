const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const userModel = require("../Models/userSchema");
const APIerrors = require("../Utils/errors");
const { createToken} = require("../Utils/createToken");

exports.signUp = expressAsyncHandler(async (req, res) => {
  const message = 'success';
  const user = await userModel.create(req.body);
  const token = createToken(user._id);
  res.status(201).json({ message , user, token });
});

// Login By Email and Password
exports.login = expressAsyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new APIerrors("Invalid email or password", 401));
  }
  const message ='success';
  const token = createToken(user._id);
  res.status(200).json({message, user, token });
});