import { ErrorHandler } from "../../common/error.handler";
import { UserModel } from "../models/user.model";

export class UserRepository {
  private User = UserModel.Model;

  create = async (createModel) => {
    try {
      const record = await this.User.create(createModel);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to create User", error);
    }
  };
  search = async (searchModel) => {
    try {
      const records = await this.User.findAndCountAll({ where: searchModel });
      return records;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to search Users", error);
    }
  };
  update = async (id: string, updateModel) => {
    try {
      const record = await this.User.update(updateModel, { where: { id: id } });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to update User", error);
    }
  };
  destroy = async (id: string) => {
    try {
      const record = await this.User.destroy({ where: { id: id } });
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to destroy User", error);
    }
  };
  getById = async (id: string) => {
    try {
      const record = await this.User.findByPk(id);
      return record;
    } catch (error) {
      ErrorHandler.throwDbAccessError("Unable to find User", error);
    }
  };
}
