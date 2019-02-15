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
  router.get('/me', app.passport.authenticate('jwt', { session: false, successRedirect: false }));
  router.get('/me', controller.books.index);
  router.post('/login', 'account.login');
  router.post('/books/:bookId/synchronization', controller.books.synchronize);
};
