'use strict';

const Service = require('egg').Service;

class BookService extends Service {
    async synchronize() {
        let { bills, deposits, clientId, bookId } = this.ctx.request.body;
        let { doc: { bills: billsRecord, deposits: depositsRecord } } = this.findLastOne();
    }

    async findAll() {
        this.ctx.body = await this.ctx.model.Book.findAll();
    }

    // findLastOne(bookId) {
    //     return this.ctx.model.Bill.findOne({
    //         where: { bookId },
    //         order: [
    //             ['id']
    //         ]
    //     });
    // }
}

module.exports = BookService;
