const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");

const router = express.Router();

// Import schema
const User = require("../models/User");

/**
 * Route for user signin
 *
 * @name Route - signin route
 * @path {POST} /signin
 */
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ code: 400, message: "Missing Inputs" });
  } else if (isEmail(email) && password.length >= 6) {
    await User.findOne({ email })
      .then((user) => {
        // Compare passwords using bcrypt
        bcrypt
          .compare(password, user.password)
          .then((isSame) => {
            if (isSame) {
              // Use payload and create token for user
              const payload = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              };

              jwt.sign(
                payload,
                process.env.SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) {
                    res.json({ code: 500, message: "Internal Server Error" });
                  }

                  res.status(200).json({
                    code: 200,
                    token: `Bearer ${token}`,
                    message: "SignIn Successful",
                  });
                }
              );
            } else {
              res.json({ code: 400, message: "Wrong Password" });
            }
          })
          .catch((err) => {
            if (err) res.json({ code: 500, message: "Internal Server Error" });
          });
      })
      .catch((err) => {
        if (err) res.json({ code: 403, message: "User Not Found" });
      });
  } else {
    res.json({ code: 400, message: "Required Inputs are wrong" });
  }
});

module.exports = router;
