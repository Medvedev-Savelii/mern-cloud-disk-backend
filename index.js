const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const app = express();
const PORT = config.get('serverPort');
const corsMiddleware = require('./middleware/cors.middleware');

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static('static'));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

const start = async () => {
  try {
    await mongoose
      .set('strictQuery', true)
      .connect(config.get('dbUrl'), { useNewUrlParser: true, useUnifiedTopology: true })
      .then((res) => console.log('connect db'))
      .catch((error) => console.log(error));

    app.listen(PORT, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('Starting Server on port', PORT);
    });
  } catch (error) {}
};

start();
