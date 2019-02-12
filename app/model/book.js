'use strict';

module.exports = app => {
  const Book = app.model.define('book', {
    id: { type: app.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: app.Sequelize.STRING(64), allowNull: false },
    wallets: { type: app.Sequelize.JSON, allowNull: false },
    bills: { type: app.Sequelize.JSON, allowNull: false },
    transfers: { type: app.Sequelize.JSON, allowNull: false },
    incomes: { type: app.Sequelize.JSON, allowNull: false },
    createdAt: { type: app.Sequelize.DATE, allowNull: false },
    createdBy: { type: app.Sequelize.STRING(64), allowNull: false },
    lastEditedAt: { type: app.Sequelize.DATE, allowNull: false },
    lastEditedBy: { type: app.Sequelize.STRING(64), allowNull: false }
  }, { timestamps: false, freezeTableName: true });

  return Book;
};