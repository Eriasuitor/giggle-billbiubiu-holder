'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1547726507983_5877';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: 'mysql',
    port: 3306,
    database: 'giggle-billbiubiu'
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  return config;
};
