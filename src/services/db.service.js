const { Sequelize, DataTypes } = require("sequelize");
const logger = require("../config/logger.config").getLogger("db.service");

const sequelize = new Sequelize("sqlite::memory:", {
  logging: false,
  //   logging: (...msg) => logger.trace(msg),
});

// basic model with id and name
const Entity = sequelize.define("Entity", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
});

const syncModel = async function () {
  await Entity.sync({ force: true });
  logger.info("model synced");
};

module.exports = {
  syncModel,
  Entity,
};
