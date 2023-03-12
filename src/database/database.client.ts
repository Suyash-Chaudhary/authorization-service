import { Logger } from "../common/logger";
import { PostgresClient } from "./postgres.client";
import { execSync } from "child_process";

export class DBClient {
  private _client = this.getClient();

  public executeQuery = async (query) => {
    try {
      await this._client.executeQuery(query);
      return true;
    } catch (error) {
      Logger.error("Unable to execute query: ", error);
      return false;
    }
  };

  public createDb = async () => {
    try {
      await this._client.createDb();
      return true;
    } catch (error) {
      Logger.error("Unable to create database: ", error);
      return false;
    }
  };

  public dropDb = async () => {
    try {
      await this._client.dropDb();
      return true;
    } catch (error) {
      Logger.error("Unable to drop database: ", error);
      return false;
    }
  };

  public migrate = async () => {
    try {
      const output = execSync("npx sequelize-cli db:migrate");
      const str = output.toString();
      Logger.info("Database migrated successfully!");
      Logger.info(str);

      return true;
    } catch (error) {
      Logger.error("Unable to migrate database: ", error.message);
    }
    return false;
  };

  private getClient() {
    if (process.env.DB_DIALECT == "postgres") {
      return PostgresClient;
    } else {
      return PostgresClient;
    }
  }
}
