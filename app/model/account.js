'use strict';

module.exports = app => {
  const Book = app.model.define('account', {
    id: { type: app.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: app.Sequelize.STRING(64), allowNull: false },
    password: { type: app.Sequelize.STRING(64), allowNull: false, options: { charset: 'latin1', collate: 'latin1_swedish_ci' }, charset: 'latin1', collate: 'latin1_swedish_ci' },
    createdAt: { type: app.Sequelize.DATE, allowNull: false },
    createdBy: { type: app.Sequelize.STRING(64), allowNull: false },
    lastEditedAt: { type: app.Sequelize.DATE, allowNull: false },
    lastEditedBy: { type: app.Sequelize.STRING(64), allowNull: false }
  }, { timestamps: false, freezeTableName: true });

  return Book;
};