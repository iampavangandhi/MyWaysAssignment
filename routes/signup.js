const express = require("express");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const randomstring = require("randomstring");
const { isEmail, isAlpha } = require("validator");

const router = express.Router();

// Import schema
const User = require("../models/User");

/**
 * Route for user signup
 *
 * @name Route - signup route
 * @path {POST} /signup
 */
router.post("/", (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;

  if (!firstName || !lastName || !email || !password || !userType) {
    res.json({ code: 400, message: "Missing Inputs" });
  } else if (
    isAlpha(firstName) &&
    isAlpha(lastName) &&
    isEmail(email) &&
    password.length >= 6 &&
    (userType.toUpperCase() === "STUDENT" ||
      userType.toUpperCase() === "EMPLOYER")
  ) {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          res.json({ code: 403, message: "Email Already Registered" });
        } else {
          const newUser = new User(req.body);
          // Encrypt password using bcrypt
          bcrypt.genSalt(10, (err, salt) => {
            if (err) res.json({ code: 500, message: "Internal Server Error" });
            bcrypt.hash(password, salt, (err, hash) => {
              if (err)
                res.json({ code: 500, message: "Internal Server Error" });
              newUser.password = hash;

              const OTP = randomstring.generate({
                length: 6,
                charset: "numeric",
              });

              global.userObject = newUser;
              global.OTP = OTP;

              sgMail.setApiKey(process.env.SENDGRID_API_KEY);
              const msg = {
                to: email, // Change to your recipient
                from: "pavangandhi100@gmail.com", // Change to your verified sender
                subject: "MyWays OTP Verification Mail",
                text: `${firstName}, Your OTP for MyWays is ${OTP}`,
                html: `<h2>${firstName}, Your OTP for MyWays is ${OTP}</h2>`,
              };
              sgMail
                .send(msg)
                .then(() => {
                  console.log("Email sent");
                })
                .catch((error) => {
                  console.error(error.response.body);
                });

              //   newUser.save();

              res.status(200).json({ code: 200, message: "OTP sent" });
            });
          });
        }
      })
      .catch((err) => {
        if (err) {
          res.json({ code: 500, message: "Internal Server Error" });
        }
      });
  } else {
    res.json({ code: 400, message: "Required Inputs are wrong" });
  }
});

module.exports = router;
