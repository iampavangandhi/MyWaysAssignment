// Config
require("dotenv").config({ path: "./config/.env" });

// Includes
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

let databaseUri = process.env.DATABASE_URI;

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
app.use("/", require("./routes/index"));
app.use("/reset", require("./routes/reset"));
app.use("/signin", require("./routes/signin"));
app.use("/signup", require("./routes/signup"));
app.use("/verify", require("./routes/verify"));

// PORT
const port = process.env.PORT || 4000;

// Starting a server
module.exports = app.listen(port, () => {
  console.info(`Server is running at ${port}`);
});
