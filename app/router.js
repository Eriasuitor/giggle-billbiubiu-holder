'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/books/:bookId', controller.bills.index);
  router.post('/books/synchronization', controller.bills.synchronize);
};
