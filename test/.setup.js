const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');

before(() => factories(app));

after(async () => {
    // await app.model.Account.destroy({ truncate: true, force: true });
});