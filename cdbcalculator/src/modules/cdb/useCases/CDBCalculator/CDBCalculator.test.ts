import request from 'supertest';

import { app } from '../../../../app';

it('Expect 200 calculate a CDB', async () => {
  await request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(201);

  const responseToken = await request(app)
    .post('/api/users/authenticate')
    .send({
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(200);

  const { token } = responseToken.body;

  await request(app)
    .post('/api/cdi/create')
    .send({ sSecurityName: 'CDI', dtDate: '2019-12-13', dLastTradePrice: '4.9' })
    .set({ Authorization: `Beare ${token}` })
    .expect(201);

  await request(app)
    .post('/api/cdi/create')
    .send({ sSecurityName: 'CDI', dtDate: '2019-12-14', dLastTradePrice: '4.9' })
    .set({ Authorization: `Beare ${token}` })
    .expect(201);

  await request(app)
    .post('/api/cdi/create')
    .send({ sSecurityName: 'CDI', dtDate: '2019-12-15', dLastTradePrice: '4.9' })
    .set({ Authorization: `Beare ${token}` })
    .expect(201);

  await request(app)
    .post('/api/cdi/calculatecdb')
    .send({ investmentDate: '2019-12-13', cdbRate: 103.5, currentDate: '2019-12-15' })
    .expect(200);
});

it('Expect 400 when investmentDate, cdbRate, currentDate is invalid', async () => {
  await request(app)
    .post('/api/users/create')
    .send({
      name: 'testCDBCalculator',
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(201);

  const responseToken = await request(app)
    .post('/api/users/authenticate')
    .send({
      email: 'testing@test.com',
      password: 'password',
    })
    .expect(200);

  const { token } = responseToken.body;

  await request(app)
    .post('/api/cdi/create')
    .send({ sSecurityName: 'CDI', dtDate: '2019-12-13', dLastTradePrice: '4.9' })
    .set({ Authorization: `Beare ${token}` })
    .expect(201);

  await request(app)
    .post('/api/cdi/create')
    .send({ sSecurityName: 'CDI', dtDate: '2019-12-14', dLastTradePrice: '4.9' })
    .set({ Authorization: `Beare ${token}` })
    .expect(201);

  await request(app)
    .post('/api/cdi/create')
    .send({ sSecurityName: 'CDI', dtDate: '2019-12-15', dLastTradePrice: '4.9' })
    .set({ Authorization: `Beare ${token}` })
    .expect(201);

  await request(app)
    .post('/api/cdi/calculatecdb')
    .send({ investmentDate: 'a', cdbRate: 103.5, currentDate: '2019-12-15' })
    .expect(400);
  await request(app)
    .post('/api/cdi/calculatecdb')
    .send({ investmentDate: '2019-12-13', cdbRate: 'a', currentDate: '2019-12-15' })
    .expect(400);
  await request(app)
    .post('/api/cdi/calculatecdb')
    .send({ investmentDate: '2019-12-13', cdbRate: 103.5, currentDate: 'a' })
    .expect(400);
});
