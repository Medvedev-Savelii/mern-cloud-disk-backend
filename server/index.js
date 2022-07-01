const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const app = express();
const PORT = config.get("serverPort");
const corsMiddleware = require("./middleware/cors.middleware");

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

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
