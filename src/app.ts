import express from "express";
import helmet from "helmet";
import http from "http";
import cors from "cors";
import { Logger } from "./common/logger";
import { DBClient } from "./database/database.client";
import { Router } from "./startup/router";
import { DatabaseModelManager } from "./database/database.manager";
import * as db from "./database/database.connector";
import { Seeder } from "./startup/seeder";

// Application is a singleton class.
export class Application {
  private static _instance: Application = null;
  private _app: express.Application = null;
  private _router: Router = null;
  private _server: http.Server = null;

  constructor() {
    this._app = express();
    this._router = new Router(this._app);
  }

  public static instance() {
    return this._instance || (this._instance = new Application());
  }

  public async start() {
    try {
      await this.setupDatabase();
      const seeder = new Seeder();
      await seeder.seed();
      await this.setupMiddlewares();
      await this._router.init();
      await this.listen();
    } catch (error) {
      Logger.error("Error starting messaging service", error);
    }
  }

  private async setupMiddlewares() {
    this._app.use(express.json());
    this._app.use(helmet());
    this._app.use(cors());
  }

  private async setupDatabase() {
    // Create Database.
    const dbClient = new DBClient();
    await dbClient.createDb();

    // Setup Associations.
    const sequelize = db.default.sequelize;
    await DatabaseModelManager.setupAssociations();
    await sequelize.sync({ alter: { drop: false } });
  }

  private async listen() {
    const port = process.env.PORT;
    try {
      this._server = this._app.listen(port, () => {
        Logger.info(`Server is up and listening on port ${port}`);
      });
    } catch (error) {
      Logger.error(`Unable to listen on ${port}`, error);
    }
  }
}
