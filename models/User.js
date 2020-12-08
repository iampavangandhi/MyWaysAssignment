const mongoose = require("mongoose");

/**
 * User model to store the data in the database
 *
 * @name Model - user schema
 * @type {object}
 */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 32,
      trim: true,
      required: [true, "Please enter firstName"],
    },
    lastName: {
      type: String,
      maxlength: 32,
      trim: true,
      required: [true, "Please enter lastName"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter an email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    userType: {
      type: String,
      trim: true,
      required: [true, "Please enter a userType"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
