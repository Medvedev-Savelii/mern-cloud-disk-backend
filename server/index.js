const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const app = express();
const PORT = config.get("serverPort");

app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await mongoose
      .connect(config.get("dbUrl"))
      .then((res) => console.log("connect db"))
      .catch((error) => console.log(error));

    app.listen(PORT, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("Starting Server on port", PORT);
    });
  } catch (error) {}
};

start();
