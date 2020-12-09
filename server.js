// Config
require("dotenv").config({ path: "./config/.env" });

// Includes
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

let databaseUri = process.env.DATABASE_URI;

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS Middleware
app.use(cors());

// DB Connection
mongoose
  .connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.info("Database Connected Successfully");
  });

// Routes
app.use("/reset", require("./routes/reset"));
app.use("/signin", require("./routes/signin"));
app.use("/signup", require("./routes/signup"));
app.use("/verify", require("./routes/verify"));

// Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

// PORT
const port = process.env.PORT || 4000;

// Starting a server
module.exports = app.listen(port, () => {
  console.info(`Server is running at ${port}`);
});
