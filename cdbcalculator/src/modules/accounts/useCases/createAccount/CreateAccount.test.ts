import request from 'supertest';

import { app } from '../../../../app';

it('returns a 201 on successful user create', async () => {
  await request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(201);
});
it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      email: 'alskdflaskjfd',
      password: 'password',
    })
    .expect(400);
});
it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      email: 'testing@test.com',
      password: 'p',
    })
    .expect(400);
});
it('returns a 400 with an invalid name', async () => {
  return request(app)
    .post('/api/users/create')
    .send({
      name: 'test',
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(400);
});
it('returns a 400 with missing email and password and name', async () => {
  await request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      email: 'testing@test.com',
    })
    .expect(400);

  await request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      password: 'alskjdf',
    })
    .expect(400);
  await request(app)
    .post('/api/users/create')
    .send({
      email: 'testing@test.com',
      password: 'alskjdf',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(400);
});
