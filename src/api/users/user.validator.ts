import * as joi from "joi";
import { ErrorHandler } from "../../common/error.handler";
import {
  RegisterViaEmailModel,
  UserCreateModel,
  UserSearchModel,
  UserUpdateModel,
} from "../../domain.types/user.domain.types";

export class UserValidator {
  static validateCreateRequest = async (body: any) => {
    try {
      const schema = joi.object<UserCreateModel>({
        Phone: joi.string().optional(),
        Email: joi.string().email().optional(),
        CountryCode: joi.string().optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateRegisterViaEmailRequest = async (body: any) => {
    try {
      const schema = joi.object<RegisterViaEmailModel>({
        Email: joi.string().email().required(),
        Password: joi.string().min(8).required(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateLoginViaEmailModel = async (body: any) => {
    try {
      const schema = joi.object<RegisterViaEmailModel>({
        Email: joi.string().email().required(),
        Password: joi.string().required(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateSearchRequest = async (body: any) => {
    try {
      const schema = joi.object<UserSearchModel>({
        id: joi
          .string()
          .guid({ version: ["uuidv4"] })
          .optional(),
        Phone: joi.string().optional(),
        Email: joi.string().email().optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };

  static validateUpdateRequest = async (body: any) => {
    try {
      const schema = joi.object<UserUpdateModel>({
        Phone: joi.string().optional(),
        Email: joi.string().email().optional(),
        CountryCode: joi.string().optional(),
      });
      return await schema.validateAsync(body);
    } catch (error) {
      ErrorHandler.handleValidationError(error);
    }
  };
}
