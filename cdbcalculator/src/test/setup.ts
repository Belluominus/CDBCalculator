/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

export interface global {}
declare global {
  var signin: () => Promise<void>;
}

jest.useFakeTimers('legacy');

let mongo: any;
beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = new MongoMemoryServer();
  await mongo.start();

  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const name = 'tests CDBCalculator';
  const email = 'test@test.com';
  const password = 'password';

  await request(app)
    .post('/api/users/create')
    .send({
      name,
      email,
      password,
    })
    .expect(201);
};
