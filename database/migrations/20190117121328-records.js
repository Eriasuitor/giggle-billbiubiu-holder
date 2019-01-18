'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('records', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      doc: { type: Sequelize.JSON, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      createdBy: { type: Sequelize.STRING(32), allowNull: false },
      lastEditBy: { type: Sequelize.STRING(32), allowNull: false }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('records');
  }
};
