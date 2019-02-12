'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bill', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      bookId: { type: Sequelize.UUID, allowNull: false },
      doc: { type: Sequelize.JSON, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      createdBy: { type: Sequelize.STRING, allowNull: false },
      updatedAt: { type: Sequelize.STRING, allowNull: false }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bill');
  }
};
