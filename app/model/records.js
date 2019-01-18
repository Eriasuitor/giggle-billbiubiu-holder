'use strict';

module.exports = app => {
  console.log(app.model)
  const User = app.model.define('records', {
    id: { type: app.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    doc: { type: app.Sequelize.JSON, allowNull: false },
    createdAt: { type: app.Sequelize.DATE, allowNull: false },
    updatedAt: { type: app.Sequelize.DATE, allowNull: false },
    createdBy: { type: app.Sequelize.DATE, allowNull: false, type: app.Sequelize.STRING(32) },
    lastEditBy: { type: app.Sequelize.DATE, allowNull: false, type: app.Sequelize.STRING(32) }
  }, { timestamps: false });

  return User;
};