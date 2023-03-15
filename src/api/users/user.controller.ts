import express from "express";
import { ResponseHandler } from "../../common/response.handler";
import { UserControllerDelegate } from "./user.controller.delegate";

export class UserController {
  _delegate = new UserControllerDelegate();

  registerViaEmail = async (req: express.Request, res: express.Response) => {
    try {
      const record = await this._delegate.registerViaEmail(req);
      const message = "Successfully registered user";
      ResponseHandler.success(req, res, message, 201, record);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  loginViaEmail = async (req: express.Request, res: express.Response) => {
    try {
      const result = await this._delegate.loginViaEmail(req);
      const message = "Login was Successful";
      ResponseHandler.success(req, res, message, 200, result);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  //   create = async (req: express.Request, res: express.Response) => {
  //     try {
  //       const record = await this._delegate.create(req);
  //       const message = "Successfully created User";
  //       ResponseHandler.success(req, res, message, 200, record);
  //     } catch (error) {
  //       ResponseHandler.handleError(req, res, error);
  //     }
  //   };

  update = async (req: express.Request, res: express.Response) => {
    try {
      const record = await this._delegate.update(req);
      const message = "Successfully updated User";
      ResponseHandler.success(req, res, message, 200, record);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  search = async (req: express.Request, res: express.Response) => {
    try {
      const records = await this._delegate.search(req);
      const message = "Successfully found Users";
      ResponseHandler.success(req, res, message, 200, records);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  destroy = async (req: express.Request, res: express.Response) => {
    try {
      const record = await this._delegate.destroy(req);
      const message = "Successfully destroyed User";
      ResponseHandler.success(req, res, message, 200, record);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };

  getById = async (req: express.Request, res: express.Response) => {
    try {
      const record = await this._delegate.getById(req);
      const message = "Successfully found User";
      ResponseHandler.success(req, res, message, 200, record);
    } catch (error) {
      ResponseHandler.handleError(req, res, error);
    }
  };
}
