'use strict';

const Service = require('egg').Service;

class BillService extends Service {
    async synchronize() {
        let { bills, deposits, clientId, bookId } = this.ctx.request.body;
        let { doc: { bills: billsRecord, deposits: depositsRecord } } = this.findLastOne();
    }

    async findAll() {
        this.ctx.body = await this.ctx.model.Bill.findAll();
    }

    findLastOne(bookId) {
        return this.ctx.model.Bill.findOne({
            where: { bookId },
            order: [
                ['id']
            ]
        });
    }
}

module.exports = BillService;
