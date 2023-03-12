import dotenv from "dotenv";
if (typeof process.env.NODE_ENV === "undefined") {
  dotenv.config();
}

export class DBConfig {
  public static config = {
    NAME: process.env.DB_NAME,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    DIALECT: process.env.DB_DIALECT as "postgres" | "mysql",
    POOL: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
}
