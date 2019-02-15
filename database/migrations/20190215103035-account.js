'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('account', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING(64), allowNull: false },
      password: { type: Sequelize.STRING(64), allowNull: false, options: {charset: 'latin1', collate: 'latin1_swedish_ci' } ,charset: 'latin1', collate: 'latin1_swedish_ci' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      createdBy: { type: Sequelize.STRING(64), allowNull: false },
      lastEditedAt: { type: Sequelize.DATE, allowNull: false },
      lastEditedBy: { type: Sequelize.STRING(64), allowNull: false }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('account');
  }
};
