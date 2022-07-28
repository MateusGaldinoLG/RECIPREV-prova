import { Router } from "express";
import { AuthenticateUserController } from "../controllers/User/AuthenticateUserController";
import { CreateUserController } from "../controllers/User/CreateUserController";

const userRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

// user create
userRouter.post('/user', createUserController.handle);

// user login (get ?)
// user login admin
userRouter.post('/user/login', authenticateUserController.handle);

export {userRouter};