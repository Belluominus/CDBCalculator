import 'reflect-metadata';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';

import './shared/container';

import { NotFoundError } from './shared/errors/NotFoundError';
import { errorHandler } from './shared/middlewares/errorHandler';
import { routes } from './shared/routes';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);

app.use(routes);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
