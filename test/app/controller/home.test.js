'use strict';

const { app, assert, mock } = require('egg-mock/bootstrap');
const uuid = require('uuid')

const wallets = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 'new',
  id: 2,
  name: '个人生存',
  balance: 999,
  color: 'pink',
  date: new Date().getTime()
}, {
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 'new',
  id: 1,
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
  walletId: 2,
  date: new Date().getTime(),
  amount: 13
}]


const transfers = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 'new',
  id: 1,
  fromWalletId: 1,
  toWalletId: 2,
  date: new Date().getTime(),
  amount: 50
}]


const incomes = [{
  createdAt: new Date().getTime(),
  lastEditedAt: new Date().getTime(),
  status: 'new',
  id: 1,
  walletId: 1,
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

describe('whole test', () => {
  it('should success', () => {
    return app.httpRequest()
      .post('/books/' + bookId + '/synchronization')
      .send(book)
      .expect(200)
      .expect(resp => {
        bookId = resp.body.id;
        book.status = 'synchronized';
        console.log(JSON.stringify(resp.body))
      })
  });
  it('should success again', () => {
    return app.httpRequest()
      .post('/books/' + bookId + '/synchronization')
      .send(book)
      .expect(200)
      .expect(resp => console.log(JSON.stringify(resp.body)))
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
