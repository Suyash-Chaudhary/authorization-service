import express from "express";
import { Logger } from "../common/logger";
import { register as registerUserRoutes } from "../api/users/user.routes";

export class Router {
  private _app: express.Application = null;

  constructor(app: express.Application) {
    this._app = app;
  }

  public async init() {
    try {
      this._app.get("/api/v1", (req, res) => {
        res.send({
          message: `Authorization Service API [Version ${process.env.API_VERSION}]`,
        });
      });
      registerUserRoutes(this._app);
    } catch (error) {
      Logger.error("Unable to register routes.", error);
    }
  }
}
