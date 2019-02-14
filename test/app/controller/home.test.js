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

describe('whole test', () => {
  it('should success', () => {
    return app.httpRequest()
      .post('/books/' + bookId + '/synchronization')
      .send(book)
      .expect(200)
      .expect(resp => {
        bookId = resp.body.id;
        book.status = 'synchronized';
      })
  });
  it('should success again', () => {
    let a = {
      createdAt: new Date().getTime(),
      lastEditedAt: new Date().getTime(),
      name: 'E.J的美好生活',
      status: 'synchronized',
      wallets: [{
        createdAt: new Date().getTime(),
        lastEditedAt: new Date().getTime(),
        status: 'new',
        id: 1002,
        name: '个人生存',
        balance: 999,
        color: 'pink',
        date: new Date().getTime()
      }],
      bills: bills.map(_ => { _.walletId = 1; return _; }).concat([{
        createdAt: new Date().getTime(),
        lastEditedAt: new Date().getTime(),
        status: 'new',
        id: 1002,
        walletId: 1002,
        date: new Date().getTime(),
        amount: 49
      }]),
      transfers: transfers.map(_ => { _.fromWalletId = 1; _.toWalletId = 1002; return _; }),
      incomes: incomes.map(_ => { _.walletId = 1; return _; })
    };
    return app.httpRequest()
      .post('/books/' + bookId + '/synchronization')
      .send(a)
      .expect(200)
      .expect(resp => {
        assert(resp.body.wallets.length === 3);
        assert(resp.body.wallets[0].balance === 74);
        assert(resp.body.wallets[1].balance === 50);
        assert(resp.body.wallets[2].balance === 1);
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
