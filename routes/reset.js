const express = require("express");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const randomstring = require("randomstring");
const { isEmail } = require("validator");

const router = express.Router();

// Import schema
const User = require("../models/User");

/**
 * Route for password reset
 *
 * @name Route - reset route
 * @path {POST} /reset
 */
router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.json({ code: 400, message: "Missing Inputs" });
  } else if (isEmail(email)) {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          const OTP = randomstring.generate({
            length: 6,
            charset: "numeric",
          });

          global.OTP = OTP;
          global.userEmail = email;

          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: email, // Change to your recipient
            from: "pavangandhi100@gmail.com", // Change to your verified sender
            subject: "MyWays OTP Verification Mail",
            text: `${user.firstName}, Your OTP for MyWays is ${OTP}`,
            html: `<h2>${user.firstName}, Your OTP for MyWays is ${OTP}</h2>`,
          };
          sgMail
            .send(msg)
            .then(() => {
              console.log("Email sent");
            })
            .catch((error) => {
              console.error(error.response.body);
            });

          res.status(200).json({ code: 200, message: "OTP sent" });
        } else {
          res.json({
            code: 404,
            message: "Email not registered please signup",
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

/**
 * Route for reset password OTP verification
 *
 * @name Route - reset password verify route
 * @path {POST} /reset/verify
 */
router.post("/verify", async (req, res) => {
  const { enteredOTP, newPassword } = req.body;

  const { OTP, userEmail } = global;

  console.log(enteredOTP, OTP);

  if (enteredOTP === OTP) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) res.json({ code: 500, message: "Internal Server Error" });
      bcrypt.hash(newPassword, salt, async (err, hash) => {
        if (err) res.json({ code: 500, message: "Internal Server Error" });

        await User.findOneAndUpdate(
          { email: userEmail },
          {
            password: hash,
          }
        )
          .then((user) => {
            res.status(200).json({ code: 200, message: "Password Changed" });
          })
          .catch((err) => {
            res.json({ code: 500, message: "Internal Server Error" });
          });
      });
    });
  } else {
    res.json({ code: 400, message: "OTP is wrong" });
  }
});

module.exports = router;
