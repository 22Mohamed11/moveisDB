const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema for user model
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: [true, "First Name is Required"],
      minlength: [3, "min length must be 3 char"],
      maxlength: [10, "max length must be 10 char"],
    },
    last_name: {
      type: String,
      trim: true,
      required: [true, "Last Name is Required"],
      minlength: [3, "min length must be 3 char"],
      maxlength: [10, "max length must be 10 char"],
    },
    age:{
      type: Number,
      required: [true, "age is Required"],
      min: [16, "age must be 18 or above"],
      max: [80, "age must be 100 or below"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is Required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is Required"],
      minlength: [6, "Password should be between 6 and 14"],
      maxlength: [20, "Password should be between 6 and 14"],
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const userModel = mongoose.model("Signup", userSchema);
module.exports = userModel;