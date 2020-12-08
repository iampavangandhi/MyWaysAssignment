const express = require("express");

const router = express.Router();

/**
 * Route for email OTP verification
 *
 * @name Route - verify route
 * @path {POST} /verify
 */
router.post("/", (req, res) => {
  const { enteredOTP } = req.body;

  const { OTP, userObject } = global;

  if (enteredOTP === OTP) {
    userObject
      .save()
      .then(() => {
        res.status(200).json({ code: 200, message: "Signup Successful" });
      })
      .catch((err) => {
        res.json({ code: 500, message: "Internal Server Error" });
      });
  } else {
    res.json({ code: 400, message: "OTP is wrong" });
  }
});

module.exports = router;
