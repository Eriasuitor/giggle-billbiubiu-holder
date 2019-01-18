'use strict';

const Controller = require('egg').Controller;

const billRule = {
  bills: {
    type: 'array',
    itemType: 'object',
    rule: {
      uid: 'string?',
      walletName: 'string',
      date: {
        type: 'int',
        max: Math.pow(10, 13),
        min: Math.pow(10, 12)
      },
      amount: 'int',
      remark: {
        type: 'string',
        max: 150
      }
    }
  }
}

class BillController extends Controller {
  async synchronize() {
    this.ctx.validate(billRule)
    this.ctx.body = await this.ctx.model.Records.create({
      doc: this.ctx.request.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: ' Sequelize.STRING(32)',
      lastEditBy: 'Sequelize.STRING(32)'
    })
  }

  async index() {
    this.ctx.body = await this.ctx.model.Records.findAll()
  }
}

module.exports = BillController;
