import express from "express";
import { UserController } from "./user.controller";

export const register = (app: express.Application) => {
  const router = express.Router();
  const controller = new UserController();
  router.get("/search", controller.search);
  router.post("/register_via_email", controller.registerViaEmail);
  router.post("/login_via_email", controller.loginViaEmail);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.destroy);
  router.get("/:id", controller.getById);
  app.use("/api/v1/users", router);
};
