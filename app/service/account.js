'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class AccountService extends Service {
    async login() {
        let { username, password } = this.ctx.request.body;
        let accountDb = await this.ctx.model.Account.findOne({ where: { username }, raw: true });

        if (!accountDb || accountDb.password != password) {
            this.logger.info('user login failed', { username, password })
            return { errMsg: '账户不存在或密码输入有误。' };
        }

        let token = jwt.sign({ username }, this.config.jwt.key, { expiresIn: this.config.jwt.expiresIn });
        this.logger.info('user login success', { username, password, token })

        return { token }
    }
}

module.exports = AccountService;
