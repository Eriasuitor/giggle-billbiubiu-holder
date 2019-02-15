'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
    app.factory = factory;

    factory.define('account', app.model.Account, {
        username: '123',
        password: '123asdaxasdasdas',
        createdBy: 'GOOOOD',
        createdAt: new Date(),
        lastEditedBy: 'GOD',
        lastEditedAt: new Date()
    });
};