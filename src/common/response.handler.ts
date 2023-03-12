import express from "express";
import { APIError } from "./api.error";
import { Logger } from "./logger";

export class ResponseHandler {
  public static failure(
    req: express.Request,
    res: express.Response,
    message: string,
    code: number,
    error: Error
  ) {
    const ips = [req.header["x-forwarded-for"] || req.socket.remoteAddress];
    const msg = `${message}, ${error.message}`;
    const errorStack = error ? error.stack : "";
    const tmp = errorStack?.split("\n");
    const trace_path = tmp?.map((x) => x.trim());

    const responseObject = {
      Status: "failure",
      Message: msg,
      HttpCode: code ? code : 500,
      Trace: trace_path,
      Request: {
        Method: req ? req.method : null,
        Host: req ? req.hostname : null,
        Body: req ? req.body : null,
        Headers: req ? req.headers : null,
        Url: req ? req.originalUrl : null,
        Params: req ? req.params : null,
      },
      ClientIps: req && req.ips.length > 0 ? req.ips : ips,
      APIVersion: process.env.API_VERSION,
      ServiceVersion: process.env.SERVICE_VERSION,
    };

    if (process.env.NODE_ENV !== "test") {
      Logger.info(JSON.stringify(responseObject, null, 2));
    }

    delete responseObject.Request;
    delete responseObject.Trace;
    return res.status(code).send(responseObject);
  }

  public static success(
    req: express.Request,
    res: express.Response,
    message: string,
    code: number,
    data: any,
    logData = true
  ) {
    const ips = [req.header["x-forwarded-for"] || req.socket.remoteAddress];
    const responseObject = {
      Status: "success",
      Message: message,
      HttpCode: code ?? 200,
      Data: data ?? null,
      Trace: null,
      Request: {
        Method: req ? req.method : null,
        Host: req ? req.hostname : null,
        Body: req ? req.body : null,
        Headers: req ? req.headers : null,
        Url: req ? req.originalUrl : null,
        Params: req ? req.params : null,
      },
      ClientIps: req && req.ips.length > 0 ? req.ips : ips,
      APIVersion: process.env.API_VERSION,
      ServiceVersion: process.env.SERVICE_VERSION,
    };

    if (process.env.NODE_ENV !== "test") {
      if (!logData) {
        responseObject.Data = null;
      }
      Logger.info(JSON.stringify(responseObject, null, 2));
    }

    delete responseObject.Request;
    delete responseObject.Trace;
    return res.status(code).send(responseObject);
  }

  public static handleError(
    req: express.Request,
    res: express.Response,
    error: Error
  ) {
    if (error instanceof APIError)
      ResponseHandler.failure(req, res, error.message, error.Code, error);
    else {
      ResponseHandler.failure(req, res, error.message, 400, error);
    }
  }
}
