'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/bills', controller.bills.index)
  router.post('/bills/synchronization', controller.bills.synchronize)
};
