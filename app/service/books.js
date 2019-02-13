'use strict';

const Service = require('egg').Service;
const lodash = require('lodash');
const Common = {
    recordStatus: {
        synchronized: 0,
        modified: 1,
        deleted: 2,
        new: 3
    }
}
const findMultiple = (target, values, fieldName = 'id') => values.map(value => target.find(_t => _t[fieldName] === value));
const recordsUpdate = {
    bill: (dbRecord = {}, reqRecord = {}, wallets, walletIdFieldName = 'walletId') => {
        let [dbWallets, reqWallet]
            = findMultiple(wallets, [dbRecord[walletIdFieldName], reqRecord[walletIdFieldName]]);
        dbWallets && (dbWallets.balance += dbRecord.amount);
        reqWallet && (reqWallet.balance -= reqRecord.amount);
    },
    transfer: (dbRecord = {}, reqRecord = {}, wallets) => {
        recordsUpdate.bill(dbRecord, reqRecord, wallets, 'fromWalletId')
        recordsUpdate.income(dbRecord, reqRecord, wallets, 'toWalletId');
    },
    incomes: (dbRecord = {}, reqRecord = {}, wallets, walletIdFieldName = 'walletId') => {
        let [dbWallets, reqWallet]
            = findMultiple(wallets, [dbRecord[walletIdFieldName], reqRecord[walletIdFieldName]]);
        dbWallets && (dbWallets.balance -= dbRecord.amount);
        reqWallet && (reqWallet.balance += reqRecord.amount);
    }
}
const recordStatusOperator = {
    [Common.recordStatus.synchronized]: () => { },
    [Common.recordStatus.modified]: (dbField, reqRecord, wallets, fieldName) => {
        let dbRecordIndex = dbField.findIndex(_dbRecord => _dbRecord.id === reqRecord.id);
        recordsUpdate[fieldName](dbField.splice(dbRecordIndex, 1, reqRecord), reqRecord, wallets);
    },
    [Common.recordStatus.deleted]: (dbField, reqRecord, wallets, fieldName) => {
        let dbRecordIndex = dbField.findIndex(_dbRecord => _dbRecord.id === reqRecord.id);
        recordsUpdate[fieldName](dbField.splice(dbRecordIndex, 1), undefined, wallets);
    },
    [Common.recordStatus.new]: (dbField, reqRecord, wallets, fieldName) => {
        recordsUpdate[fieldName](undefined, reqRecord, wallets);
        reqRecord.createdBy = 'GOD';
        dbField.push(reqRecord);
    }
}

const walletRecordStatusOperation = {
    [Common.recordStatus.synchronized]: () => { },
    [Common.recordStatus.modified]: (reqFields, dbWallets, wallet, walletIdMax) => {
        let dbWallet = lodash.find(dbWallets, { id: wallet.id }), balance = dbWallet.balance;
        Object.assign(dbWallet, wallet);
        dbWallet.balance = balance;
    },
    [Common.recordStatus.deleted]: (reqFields, dbWallets, wallet, walletIdMax) => {
        let walletIndex = dbWallets.find(_dw => _dw.id === wallet.id);
        dbWallets.splice(walletIndex, 1);
        reqFields.forEach((reqField, index) => reqField.forEach(reqRecord => {
            reqRecord.walletId && reqRecord.walletId === wallet.id && reqField.splice(index, 1);
        }))
    },
    [Common.recordStatus.new]: (reqFields, dbWallets, wallet, walletIdMax) => {
        let dbWallet = lodash.find(dbWallets, { id: wallet.id });
        wallet.createdBy = 'GOD'
        dbWallets.push(wallet);
        if (dbWallet) {
            let walletId = ++walletIdMax;
            reqFields.forEach(reqField => reqField.forEach(reqRecord => {
                reqRecord.walletId && reqRecord.walletId === wallet.id && (reqRecord.walletId = walletId);
                reqRecord.fromWalletId && reqRecord.fromWalletId === wallet.id && (reqRecord.fromWalletId = walletId);
                reqRecord.toWalletId && reqRecord.toWalletId === wallet.id && (reqRecord.toWalletId = walletId);
            }))
            wallet.id = walletId;
            return walletIdMax;
        }
    }
}

const bookStatusOperation = {
    [Common.recordStatus.synchronized]: (bookId, dbBook, reqBook) => {
        return this.ctx.model.Book.update(dbBook, { where: { id: bookId } });
    },
    [Common.recordStatus.modified]: async (bookId, dbBook, reqBook) => {
        ['remark', 'name'].forEach(_p => dbBook[_p] = reqBook[_p]);
        return this.ctx.model.Book.update(dbBook, { where: { id: bookId } });
    },
    [Common.recordStatus.new]: async (bookId, dbBook, reqBook) => {
        dbBook.createdBy = 'GOD';
        book.id = await this.ctx.model.Book.create(dbBook)
    }
}

class BookService extends Service {
    async synchronize() {
        let { bookId } = this.ctx.params,
            { name, remark, status: bookStatus, wallets, bills, transfers, incomes } = this.ctx.request.body;
        if (status === Common.recordStatus.deleted) {
            await this.ctx.model.Book.destroy({ where: { id: bookId } })
            return;
        }
        let dbBook = await this.ctx.model.Book.findById(bookId),
            dbWallets = dbBook && dbBook.wallets || [],
            dbBills = dbBook && dbBook.bills || [],
            dbTransfers = dbBook && dbBook.transfers || [],
            dbIncomes = dbBook && dbBook.incomes || [],
            fieldNames = ['bills', 'transfers', 'incomes'],
            reqFields = [bills, transfers, incomes],
            dbFields = [dbBills, dbTransfers, dbIncomes],
            walletIdMax = lodash.maxBy(dbWallets, 'id');

        wallets.forEach(wallet => {
            let reqStatus = wallet.status;
            wallet.status = Common.recordStatus.synchronized;
            wallet.lastEditedBy = 'CODE#TP';
            walletIdMax = walletRecordStatusOperation[reqStatus](reqFields, dbWallets, wallet, walletIdMax) || walletIdMax;
        })

        lodash.zip(dbFields, reqFields, fieldNames).forEach(([dbField, reqField, fieldName]) => {
            let idMax = lodash.maxBy(dbField, 'id');
            reqField.forEach(reqRecord => {
                let reqStatus = reqRecord.status;
                reqRecord.status = Common.recordStatus.synchronized;
                reqRecord.lastEditedBy = 'CODE#TP';
                !reqRecord.id && (reqRecord.id = ++idMax);
                recordStatusOperator[reqStatus](dbField, reqRecord, wallets, fieldName)
            })
        })

        dbBook.lastEditedBy = 'CODE#TP';
        await bookStatusOperation[bookStatus](bookId, dbBook, reqBook);
        return dbBook;
    }

    findAll() {
        return this.ctx.model.Book.findAll();
    }
}

module.exports = BookService;
