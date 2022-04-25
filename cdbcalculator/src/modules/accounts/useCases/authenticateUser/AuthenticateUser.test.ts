import request from 'supertest';

import { app } from '../../../../app';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/authenticate')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/authenticate')
    .send({
      email: 'testing@test.com',
      password: 'aslkdfjalskdfj',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/authenticate')
    .send({
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(200);
});
