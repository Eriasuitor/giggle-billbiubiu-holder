'use strict';
const LocalStrategy = require('passport-local').Strategy;


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // app.passport.mount('github');

  router.get('/books', controller.books.index);
  router.get('/', controller.books.index);
  router.get('/authCallback', controller.books.index);
  router.post('/login', app.passport.authenticate('basic', { session: false }));
  // router.post('/login', app.passport.authenticate('local'), { session: false });

  router.post('/books/:bookId/synchronization', controller.books.synchronize);
};
