import { DBConfig } from "./database.config";
import { Client } from "pg";
import { Logger } from "../common/logger";

export class PostgresClient {
  public static createDb = async () => {
    try {
      const config = DBConfig.config;
      const query = `CREATE DATABASE "${config.NAME}"`;
      await PostgresClient.executeQuery(query);
    } catch (error) {
      Logger.error("Unable to create database: ", error.message);
    }
  };

  public static dropDb = async () => {
    try {
      const config = DBConfig.config;
      const query = `DROP DATABASE IF EXISTS "${config.NAME}"`;
      await PostgresClient.executeQuery(query);
    } catch (error) {
      Logger.error("Unable to drop database: ", error.message);
    }
  };

  static async executeQuery(query) {
    try {
      const config = DBConfig.config;
      const client = new Client({
        host: config.HOST,
        user: config.USER,
        password: config.PASS,
        port: parseInt(config.PORT, 0),
      });
      await client.connect();
      await client.query(query);
      await client.end();
    } catch (error) {
      Logger.error("Unable to execute database query: ", error);
    }
  }
}
