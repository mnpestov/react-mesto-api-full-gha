// const httpConstants = require('http2').constants;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { routes } = require('./routes');
const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(requestLogger);
app.post('/signin', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), createUser);
app.use(auth);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function connect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb ', {
    useNewUrlParser: true,
  });
  await app.listen(PORT);
}

connect();
