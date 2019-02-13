'use strict';

const Service = require('egg').Service;
const lodash = require('lodash');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();
const Common = {
    recordStatus: {
        synchronized: 'synchronized',
        modified: 'modified',
        deleted: 'deleted',
        new: 'new'
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
    income: (dbRecord = {}, reqRecord = {}, wallets, walletIdFieldName = 'walletId') => {
        let [dbWallets, reqWallet]
            = findMultiple(wallets, [dbRecord[walletIdFieldName], reqRecord[walletIdFieldName]]);
        dbWallets && (dbWallets.balance -= dbRecord.amount);
        reqWallet && (reqWallet.balance += reqRecord.amount);
    },
    transfer: (dbRecord = {}, reqRecord = {}, wallets) => {
        recordsUpdate.bill(dbRecord, reqRecord, wallets, 'fromWalletId')
        recordsUpdate.income(dbRecord, reqRecord, wallets, 'toWalletId');
    }
}
const recordStatusOperator = {
    [Common.recordStatus.synchronized]: () => { },
    [Common.recordStatus.modified]: (dbField, reqRecord, wallets, fieldName, idMax) => {
        let dbRecordIndex = dbField.findIndex(_dbRecord => _dbRecord.id === reqRecord.id);
        recordsUpdate[fieldName](dbField.splice(dbRecordIndex, 1, reqRecord), reqRecord, wallets);
    },
    [Common.recordStatus.deleted]: (dbField, reqRecord, wallets, fieldName, idMax) => {
        let dbRecordIndex = dbField.findIndex(_dbRecord => _dbRecord.id === reqRecord.id);
        recordsUpdate[fieldName](dbField.splice(dbRecordIndex, 1), undefined, wallets);
    },
    [Common.recordStatus.new]: (dbField, reqRecord, wallets, fieldName, idMax) => {
        recordsUpdate[fieldName](undefined, reqRecord, wallets);
        reqRecord.createdBy = 'GOD';
        reqRecord.id = ++idMax;
        dbField.push(reqRecord);
        return idMax
    }
}

const walletRecordStatusOperation = {
    [Common.recordStatus.synchronized]: () => { },
    [Common.recordStatus.modified]: (reqFields, dbWallets, wallet, walletIdMax) => {
        wallet.lastEditedBy = 'CODE#TP';
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
        wallet.lastEditedBy = 'CODE#TP';
        wallet.createdBy = 'GOD'
        dbWallets.push(wallet);
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

const bookStatusOperation = {
    [Common.recordStatus.synchronized]: async function (bookId, dbBook, reqBook) {
        return this.ctx.model.Book.update(dbBook, { where: { id: { [this.app.Sequelize.Op.eq]: bookId } } });
    },
    [Common.recordStatus.modified]: function (bookId, dbBook, reqBook) {
        dbBook.lastEditedBy = 'CODE#TP';
        ['remark', 'name'].forEach(_p => dbBook[_p] = reqBook[_p]);
        return bookStatusOperation[Common.recordStatus.synchronized](bookId, dbBook, reqBook);
    },
    [Common.recordStatus.new]: async function (bookId, dbBook, reqBook) {
        dbBook.createdBy = 'GOD';
        dbBook.lastEditedBy = 'CODE#TP';
        ['remark', 'name', 'createdAt', 'lastEditedAt'].forEach(_p => dbBook[_p] = reqBook[_p]);
        dbBook.id = (await this.ctx.model.Book.create(dbBook)).id;
    }
}

class BookService extends Service {
    async synchronize() {
        let { bookId } = this.ctx.params,
            reqBook = this.ctx.request.body,
            { status: bookStatus, wallets, bills, transfers, incomes } = reqBook;

        wallets.forEach(_w => _w.balance = 0);

        return await lock.acquire(`synchronize ${bookId}`, async () => {
            let dbBook;
            switch (bookStatus) {
                case Common.recordStatus.deleted:
                    await this.ctx.model.Book.destroy({ where: { id: bookId } })
                    return;
                case Common.recordStatus.new:
                    dbBook = { wallets: [], bills: [], transfers: [], incomes: [] }
                    break;
                default:
                    dbBook = await this.ctx.model.Book.findOne({ where: { id: bookId }, raw: true })
                    break;
            }

            let { wallets: dbWallets, bills: dbBills, transfers: dbTransfers, incomes: dbIncomes } = dbBook,
                fieldNames = ['bill', 'transfer', 'income'],
                reqFields = [bills, transfers, incomes],
                dbFields = [dbBills, dbTransfers, dbIncomes],
                walletMax = lodash.maxBy(dbWallets, 'id'),
                walletIdMax = walletMax && walletMax.id || 0;

            wallets.forEach(wallet => {
                let reqStatus = wallet.status;
                wallet.status = Common.recordStatus.synchronized;
                walletIdMax = walletRecordStatusOperation[reqStatus](reqFields, dbWallets, wallet, walletIdMax) || walletIdMax;
            })

            lodash.zip(dbFields, reqFields, fieldNames).forEach(([dbField, reqField, fieldName]) => {
                let max = lodash.maxBy(dbField, 'id')
                let idMax = max && max.id || 0;
                reqField.forEach(reqRecord => {
                    let reqStatus = reqRecord.status;
                    reqRecord.status = Common.recordStatus.synchronized;
                    idMax = recordStatusOperator[reqStatus](dbField, reqRecord, wallets, fieldName, idMax) || idMax
                })
            })

            dbBook.status = Common.recordStatus.synchronized;

            await bookStatusOperation[bookStatus].call(this, bookId, dbBook, reqBook);

            return dbBook;
        })
    }

    findAll() {
        return this.ctx.model.Book.findAll();
    }
}

module.exports = BookService;
