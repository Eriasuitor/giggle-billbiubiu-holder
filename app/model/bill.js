'use strict';

module.exports = app => {
  const Bill = app.model.define('bill', {
    id: { type: app.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    bookId: { type: app.Sequelize.STRING, allowNull: false, isUUID: 4 },
    doc: { type: app.Sequelize.JSON, allowNull: false },
    createdAt: { type: app.Sequelize.DATE, allowNull: false },
    updatedAt: { type: app.Sequelize.DATE, allowNull: false },
    createdBy: { type: app.Sequelize.DATE, allowNull: false, type: app.Sequelize.STRING(32) },
    updatedBy: { type: app.Sequelize.DATE, allowNull: false, type: app.Sequelize.STRING(32) }
  }, { timestamps: false, freezeTableName: true });

  return Bill;
};