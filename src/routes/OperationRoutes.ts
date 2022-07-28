import { Router } from "express";
import { CreateOperationController } from "../controllers/Operation/CreateOperationController";
import { ensureUser } from "../middlewares/ensureAuthentications";


const operationRouter = Router();

const createOperationController = new CreateOperationController();

// normal user create operation
operationRouter.post('/operation', ensureUser, createOperationController.handle);

// admin can see all operations from a given period

export {operationRouter};