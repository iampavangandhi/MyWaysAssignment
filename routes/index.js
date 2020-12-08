const express = require("express");

const router = express.Router();

/**
 * Route for Login Landing Page
 *
 * @name Route - index route
 * @path {GET} /
 */
router.get("/", (req, res) => {
  res.status(200).json({ code: 200, Content: "Index Route" });
});

module.exports = router;
