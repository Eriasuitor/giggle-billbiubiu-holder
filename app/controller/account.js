'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class AccountController extends Controller {
  async login() {
    this.ctx.validate({
      username: { type: 'string', max: 64, min: 1 },
      password: { type: 'string', max: 64, min: 6 }
    });

    this.ctx.body = await this.service.account.login();
  }
}

module.exports = AccountController;