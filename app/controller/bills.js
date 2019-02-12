'use strict';

const Controller = require('egg').Controller;

const billRule = {
  bookId: {
    type: 'string',
    min: 36,
    max: 36
  },
  clientId: 'string',
  deposits: {
    type: 'array',
    itemType: 'object',
    rule: {
      uid: {
        type: 'string',
        required: false,
        min: 36,
        max: 36
      },
      walletName: {
        type: 'string',
        min: 1,
        max: 36
      },
      date: {
        type: 'int',
        max: Math.pow(10, 13),
        min: Math.pow(10, 12)
      },
      amount: { type: 'int', min: 0 },
      remark: {
        type: 'string',
        max: 150
      },
      clientId: 'string?'
    }
  },
  bills: {
    type: 'array',
    itemType: 'object',
    rule: {
      uid: {
        type: 'string',
        required: false,
        min: 36,
        max: 36
      },
      walletName: {
        type: 'string',
        min: 1,
        max: 36
      },
      date: {
        type: 'int',
        max: Math.pow(10, 13),
        min: Math.pow(10, 12)
      },
      amount: { type: 'int', min: 0 },
      remark: {
        type: 'string',
        max: 150
      },
      clientId: 'string?'
    }
  }
}

class BillController extends Controller {
  async synchronize() {
    this.ctx.validate(billRule)
    this.ctx.body = await this.ctx.service.bills.synchronize();
  }

  async index() {
    this.ctx.body = await this.ctx.service.bills.findAll();
  }

  async last() {
    this.ctx.body = await this.ctx.service.bills.findLastOne(this.ctx.request.);
  }
}

module.exports = BillController;
