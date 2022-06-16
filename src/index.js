const express = require("express");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const AppError = require("./utils/AppError");
const { errorHandler, errorConverter } = require("./utils/error");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port:", process.env.PORT);
    });
  }
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/v1", routes);

app.get("/", (req, res, next) => {
  res.send("Welcome to Agency management");
});

app.use((req, res, next) => {
  next(new AppError(httpStatus.NOT_FOUND, "API endpoint not found"));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
