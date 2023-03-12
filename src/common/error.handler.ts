import { APIError } from "./api.error";
import { Logger } from "./logger";

////////////////////////////////////////////////////////////////////////

export class ErrorHandler {
  static throwInputValidationError = (errorMessages) => {
    var message = "Validation error has occurred!\n";
    if (errorMessages) {
      message =
        message +
        " " +
        (Array.isArray(errorMessages)
          ? errorMessages.join(" ")
          : errorMessages.toString());
      message = message.split('"').join("");
    }
    throw new APIError(message, 422);
  };

  static throwDuplicateUserError = (message) => {
    throw new APIError(message, 422);
  };

  static throwNotFoundError = (message) => {
    throw new APIError(message, 404);
  };

  static throwUnauthorizedUserError = (message) => {
    throw new APIError(message, 401);
  };

  static throwForebiddenAccessError = (message) => {
    throw new APIError(message, 403);
  };

  static throwDbAccessError = (message, error) => {
    throw new APIError(message, 503, error);
  };

  static throwConflictError = (message) => {
    throw new APIError(message, 409);
  };

  static throwFailedPreconditionError = (message) => {
    throw new APIError(message, 412);
  };

  static throwInternalServerError = (message, error = null) => {
    throw new APIError(message, 500, error);
  };

  static handleValidationError = (error) => {
    if (error.details !== undefined) {
      const errorMessages = error.details.map((x) => x.message);
      ErrorHandler.throwInputValidationError(errorMessages);
    } else {
      ErrorHandler.throwInputValidationError(error.message);
    }
  };
}
