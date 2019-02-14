'use strict';

const { app, assert, mock } = require('egg-mock/bootstrap');
const uuid = require('uuid')

const wallets = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 'new',
  id: 1002,
  name: '个人生存',
  balance: 999,
  color: 'pink',
  date: new Date().getTime()
}, {
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 'new',
  id: 1001,
  name: '双人生存',
  balance: 999,
  color: 'pink',
  date: new Date().getTime()
}]

const bills = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 'new',
  id: 2,
  walletId: 1002,
  date: new Date().getTime(),
  amount: 13
}]


const transfers = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 'new',
  id: 1,
  fromWalletId: 1001,
  toWalletId: 1002,
  date: new Date().getTime(),
  amount: 50
}]


const incomes = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 'new',
  id: 1,
  walletId: 1001,
  date: new Date().getTime(),
  amount: 100
}]

let book = {
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  name: 'E.J的美好生活',
  status: 'new',
  wallets,
  bills,
  transfers,
  incomes
}
let bookId = 100;

describe('/login', () => {
  it('should login', () => {
    return app.httpRequest()
      .post('/login')
      .send({
        username: '123',
        password: '123'
      })
      .expect(resp => {
        // console.log(resp.body)
      })
      .expect(302)
  });
  it('should success /callback', () => {
    return app.httpRequest()
      .get('/authCallback')
      .send({
        username: '123',
        password: '123'
      })
      .expect(resp => {
        // console.log(resp)
      })
  });
  // it('should POST again /bills', () => {
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
