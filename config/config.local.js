'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.sequelize = {
    dialect: 'mysql',
    host: 'mysql',
    port: 3306,
    database: 'giggle-billbiubiu-test'
  }

  return config;
};
