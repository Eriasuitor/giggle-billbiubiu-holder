'use strict';

const Controller = require('egg').Controller;

class BillController extends Controller {
  async synchronize() {
    this.ctx.validate(synchronizeRule)
    this.ctx.body = await this.ctx.service.books.synchronize();
  }

  async index() {
    this.ctx.body = await this.ctx.service.books.findAll();
  }
}

const synchronizeRule = generalRule({
  id: { type: 'int', min: 0 },
  name: { type: 'string', max: '64' },
  wallets: listRule(walletRule),
  bills: listRule(billRule),
  transfers: listRule(transferRule),
  incomes: listRule(incomeRule),
})

const generalRule = rule => Object.assign(rule, {
  createdAt: { type: 'int', min: 0 },
  lastEditedAt: { type: 'int', min: 0 },
  status: { type: 'enum', values: [0, 1, 2] },
  remark: { type: 'string', max: 255 },
})

const listRule = rule => ({ type: 'array', itemType: 'object', rule });

const walletRule = generalRule({
  id: { type: 'int', min: 0 },
  name: { type: 'string', max: 16 },
  balance: 'int',
  color: { type: 'string', max: 16 },
  date: { type: 'int', min: 0 }
})

const billRule = generalRule({
  id: { type: 'int', required: false, min: 0 },
  walletId: { type: 'int', min: 0 },
  date: { type: 'int', min: 0 },
  amount: { type: 'int', min: 0 },
})

const transferRule = generalRule({
  id: { type: 'int', required: false, min: 0 },
  fromWalletId: { type: 'int', min: 0 },
  toWalletId: { type: 'int', min: 0 },
  date: { type: 'int', min: 0 },
  amount: { type: 'int', min: 0 },
})

const incomeRule = generalRule({
  id: { type: 'int', required: false, min: 0 },
  walletId: { type: 'int', min: 0 },
  date: { type: 'int', min: 0 },
  amount: { type: 'int', min: 0 },
})

module.exports = BillController;
