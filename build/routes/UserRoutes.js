"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const AuthenticateUserController_1 = require("../controllers/User/AuthenticateUserController");
const CreateUserController_1 = require("../controllers/User/CreateUserController");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const createUserController = new CreateUserController_1.CreateUserController();
const authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController();
// user create
userRouter.post('/user', createUserController.handle);
// user login (get ?)
// user login admin
userRouter.post('/user/login', authenticateUserController.handle);
