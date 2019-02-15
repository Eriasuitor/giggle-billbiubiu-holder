'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1547726507983_5877';

  config.jwt = {
    key: 'a53615b4115a48d6822a9d1b5edfaca1',
    expiresIn: '29d'
  }

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

  // config.passportGithub = {
  //   key: '6dbd179e42cd786ea5d7',
  //   secret: 'da84f7c66d852cf793b76a4a579837950f093a1e'
  // }

  return config;
};
