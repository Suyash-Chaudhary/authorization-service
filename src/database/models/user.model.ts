import * as db from "../database.connector";
import DataTypes from "sequelize";
const sequelize = db.default.sequelize;

export class UserModel {
  static ModelName = "User";
  static TableName = "users";
  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    CountryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "+91",
    },
    CreatedAt: DataTypes.DATE,
    UpdatedAt: DataTypes.DATE,
  };
  static Model = sequelize.define(UserModel.ModelName, UserModel.Schema, {
    timestamps: true,
    freezeTableName: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    tableName: UserModel.TableName,
    indexes: [{ unique: true, fields: ["Email", "CountryCode"] }],
  });
  static associate = (models) => {};
}
