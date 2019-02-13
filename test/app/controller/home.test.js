'use strict';

const { app, assert, mock } = require('egg-mock/bootstrap');
const uuid = require('uuid')

const wallets = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 3,
  id: 0,
  name: '个人生存',
  balance: 999,
  color: 'pink',
  date: new Date().getTime()
}, {
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 3,
  id: 1,
  name: '双人生存',
  balance: 999,
  color: 'pink',
  date: new Date().getTime()
}]

const bills = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 3,
  id: 0,
  walletId: 0,
  date: new Date().getTime(),
  amount: 13
}]


const transfers = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 3,
  id: 0,
  fromWalletId: 0,
  toWalletId: 1,
  date: new Date().getTime(),
  amount: 1
}]


const incomes = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 3,
  id: 0,
  walletId: 1,
  date: new Date().getTime(),
  amount: 10
}]

const book = {
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 3,
  wallets,
  bills,
  transfers,
  incomes
}

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
