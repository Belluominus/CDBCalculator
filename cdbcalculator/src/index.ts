import 'reflect-metadata';
import 'express-async-errors';
import { json } from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import './shared/container';

import { NotFoundError } from './shared/errors/NotFoundError';
import { errorHandler } from './shared/middlewares/errorHandler';
import { routes } from './shared/routes';

const app = express();
app.use(json());

app.use(routes);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const startUp = async () => {
  try {
    await mongoose.connect('mongodb://cdbcalculator-mongo-srv:27017/cdbcalculator');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

startUp();
