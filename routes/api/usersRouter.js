const express = require("express");

const usersRouter = express.Router();

const {
  registerUser,
  loginUser,
  getCurrent,
  getLogout,
} = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../schemas/auth");

usersRouter.post("/register", validateBody(registerSchema), registerUser);
usersRouter.post("/login", validateBody(loginSchema), loginUser);
usersRouter.get("/current", authenticate, getCurrent);
usersRouter.post("/logout", authenticate, getLogout);

module.exports = usersRouter;
