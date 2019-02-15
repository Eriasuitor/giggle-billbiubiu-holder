'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.jwt = {
    key: '60dae7a1df654964bdae767c27b59244',
  }

  config.sequelize = {
    dialect: 'mysql',
    host: 'mysql',
    port: 3306,
    database: 'giggle-billbiubiu-test'
  }

  return config;
};
