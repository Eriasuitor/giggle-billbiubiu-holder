'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('book', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(16), allowNull: false },
      wallets: { type: Sequelize.JSON, allowNull: false },
      bills: { type: Sequelize.JSON, allowNull: false },
      transfers: { type: Sequelize.JSON, allowNull: false },
      incomes: { type: Sequelize.JSON, allowNull: false },
      remark: { type: Sequelize.STRING(255), allowNull: true },
      status: { type: Sequelize.ENUM('synchronized', 'modified', 'deleted', 'new'), allowNull: false },
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
    return queryInterface.dropTable('book');
  }
};
