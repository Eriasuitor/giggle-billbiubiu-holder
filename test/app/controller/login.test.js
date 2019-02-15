'use strict';

const { app, assert, mock } = require('egg-mock/bootstrap');
let token;

describe('/login', () => {
  before(async () => {
    await app.factory.create('account');
  });
  after(() => {

  })
  it('get jwt', () => {
    return app.httpRequest()
      .post('/login')
      .send({
        username: '123',
        password: '123asdaxasdasdas'
      })
      .expect(resp => {
        console.log(resp.body);
        token = resp.body.token;
      })
      .expect(200)
  });
  it('get info', () => {
    return app.httpRequest()
      .get('/me')
      .set('authorization', `Bearer ${token}`)
      .send({
        username: '123',
        password: '123asdaxasdasdas'
      })
      .expect(resp => {
        console.log(resp.body)
      })
      .expect(200)
  });
  // it('should login', () => {
  //   return app.httpRequest()
  //     .post('/login')
  //     .send({
  //       username: '123',
  //       password: '123'
  //     })
  //     .expect(resp => {
  //       // console.log(resp.body)
  //     })
  //     .expect(302)
  // });
  // it('should success /callback', () => {
  //   return app.httpRequest()
  //     .get('/authCallback')
  //     .send({
  //       username: '123',
  //       password: '123'
  //     })
  //     .expect(resp => {
  //       // console.log(resp)
  //     })
  // });
  // // it('should POST again /bills', () => {
  //   return app.httpRequest()
  //     .post('/bills/synchronization')
  //     .send({
  //       clientId: 'xxObs',
  //       bills,
  //       deposits
  //     })
  //     .expect(200)
  //     .expect(resp => assert(resp.body.bills.length >= bills.length))
  //     .expect(resp => assert(resp.body.deposits.length >= deposits.length))
  //     .expect(resp => resp.body.bills.reduce((a, b) => assert(a.date >= b.date)))
  //     .expect(resp => resp.body.deposits.reduce((a, b) => assert(a.date >= b.date)));
  // });
});
