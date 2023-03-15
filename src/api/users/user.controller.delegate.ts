import express from "express";
import {
  UserSearchModel,
  UserUpdateModel,
  RegisterViaEmailModel,
  LoginViaEmail,
} from "../../domain.types/user.domain.types";
import { UserRepository } from "../../database/repository/user.repository";
import { UserValidator } from "./user.validator";
import { Helper } from "../../common/helper";
import { ErrorHandler } from "../../common/error.handler";

export class UserControllerDelegate {
  _service = new UserRepository();

  registerViaEmail = async (req: express.Request) => {
    await UserValidator.validateRegisterViaEmailRequest(req.body);
    const registerViaEmailModel = this.getRegisterViaEmailModel(req.body);

    // Hash the password.
    registerViaEmailModel.Password = Helper.generateHashedPassword(
      registerViaEmailModel.Password
    );

    // Create the user.
    const record = await this._service.create(registerViaEmailModel);
    return record;
  };

  loginViaEmail = async (req: express.Request) => {
    await UserValidator.validateLoginViaEmailModel(req.body);
    const loginModel = await this.getLoginViaEmailModel(req.body);

    // Get the user.
    const records = await this._service.search({ Email: loginModel.Email });
    if (records.count == 0)
      ErrorHandler.throwNotFoundError("User with the given Email not found");
    const user = records.rows[0];

    // Match the password.
    const hashedPassword = user["Password"];
    const password = loginModel.Password;
    const result = Helper.compareHashedPassword(password, hashedPassword);
    if (!result)
      ErrorHandler.throwUnauthorizedUserError("Incorrect Email or Password");

    // Generate Access token,
    const accessToken = Helper.createAccessToken({ id: user["id"] });
    const userData = {
      accessToken: accessToken,
      user: { id: user["id"], Email: user["Email"] },
    };

    return userData;
  };

  // create = async (req: express.Request) => {
  //   // Validate request.
  //   await UserValidator.validateCreateRequest(req.body);
  //   const createModel = this.getCreateModel(req.body);
  //   const record = await this._service.create(createModel);
  //   return record;
  // };

  update = async (req: express.Request) => {
    await UserValidator.validateUpdateRequest(req.body);
    const updateModel = this.getUpdateModel(req.body);
    const record = await this._service.update(req.params["id"], updateModel);
    return record;
  };

  destroy = async (req: express.Request) => {
    const record = await this._service.destroy(req.params["id"]);
    return record;
  };

  getById = async (req: express.Request) => {
    const record = await this._service.getById(req.params["id"]);
    return record;
  };

  search = async (req: express.Request) => {
    await UserValidator.validateSearchRequest(req.body);
    const searchModel = this.getSearchModel(req.body);
    const records = await this._service.search(searchModel);
    return records;
  };

  private getSearchModel = (body: any): UserSearchModel => {
    const searchModel: UserSearchModel = {};
    if (body["Email"] !== null) searchModel.Email = body["Email"];
    if (body["Phone"] !== null) searchModel.Phone = body["Phone"];
    if (body["id"] !== null) searchModel.id = body["id"];
    return searchModel;
  };

  private getUpdateModel = (body: any): UserUpdateModel => {
    const searchModel: UserUpdateModel = {};
    if (body["Email"] !== null) searchModel.Email = body["Email"];
    if (body["Phone"] !== null) searchModel.Phone = body["Phone"];
    if (body["CountryCode"] !== null)
      searchModel.CountryCode = body["CountryCode"];
    return searchModel;
  };

  private getRegisterViaEmailModel = (body: any): RegisterViaEmailModel => {
    const registerModel: RegisterViaEmailModel = {
      Email: body["Email"],
      Password: body["Password"],
    };
    return registerModel;
  };

  private getLoginViaEmailModel = (body: any): LoginViaEmail => {
    const loginModel: LoginViaEmail = {
      Email: body["Email"],
      Password: body["Password"],
    };
    return loginModel;
  };
}
