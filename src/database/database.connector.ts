import { Sequelize } from "sequelize";
import { DBConfig } from "./database.config";
import { Logger } from "../common/logger";
const config = DBConfig.config;

Logger.info("environment : " + process.env.NODE_ENV);
Logger.info("db name     : " + config.NAME);
Logger.info("db username : " + config.USER);
Logger.info("db host     : " + config.HOST);

const sequelize = new Sequelize(config.NAME, config.USER, config.PASS, {
  host: config.HOST,
  dialect: config.DIALECT,
  pool: {
    max: config.POOL.max,
    min: config.POOL.min,
    acquire: config.POOL.acquire,
    idle: config.POOL.idle,
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    Logger.info("Database connection has been established successfully.");
  })
  .catch((error) => {
    Logger.error("Unable to connect to the database:", error);
  });

export default {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
