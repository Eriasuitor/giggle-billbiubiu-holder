'use strict';

const { app, assert, mock } = require('egg-mock/bootstrap');
const uuid = require('uuid')

const bills = [{
  walletName: '个人生存',
  date: new Date().getTime(),
  amount: 998,
  remark: '必要消费'
}];
const deposits = bills;

describe('test/app/controller/home.test.js', () => {
  it('should POST /bills', () => {
    return app.httpRequest()
      .post('/bills/synchronization')
      .send({
        bookId: uuid(),
        clientId: 'xxObs',
        bills,
        deposits
      })
      .expect(200)
      .expect(resp => assert(resp.body.bills.length >= bills.length))
      .expect(resp => assert(resp.body.deposits.length >= deposits.length))
      .expect(resp => resp.body.bills.reduce((a, b) => assert(a.date >= b.date)))
      .expect(resp => resp.body.deposits.reduce((a, b) => assert(a.date >= b.date)));
  });
  it('should POST again /bills', () => {
    return app.httpRequest()
      .post('/bills/synchronization')
      .send({
        clientId: 'xxObs',
        bills,
        deposits
      })
      .expect(200)
      .expect(resp => assert(resp.body.bills.length >= bills.length))
      .expect(resp => assert(resp.body.deposits.length >= deposits.length))
      .expect(resp => resp.body.bills.reduce((a, b) => assert(a.date >= b.date)))
      .expect(resp => resp.body.deposits.reduce((a, b) => assert(a.date >= b.date)));
  });
});
