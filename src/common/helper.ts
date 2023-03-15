import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class Helper {
  static generateHashedPassword = (password: string) => {
    return bcrypt.hashSync(password, 10);
  };

  static compareHashedPassword = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
  };

  static createAccessToken = (object: any) => {
    return jwt.sign(object, process.env.USER_LOGIN_ACCESS_SECRET, {
      expiresIn: "1d",
    });
  };
}
