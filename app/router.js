'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/books', controller.books.index);
  router.post('/books/:bookId/synchronization', controller.books.synchronize);
};
