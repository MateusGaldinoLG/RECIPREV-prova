import { Router } from "express";
import { CreateOperationController } from "../controllers/Operation/CreateOperationController";
import { DeleteOperationController } from "../controllers/Operation/DeleteOperationController";
import { GetAllOperationsController } from "../controllers/Operation/GetAllOperationsController";
import { GetOperationByDateController } from "../controllers/Operation/GetOperationByDateController";
import { UpdateOperationController } from "../controllers/Operation/UpdateOperationController";
import { ensureAdmin, ensureUser } from "../middlewares/ensureAuthentications";


const operationRouter = Router();

const createOperationController = new CreateOperationController();
const getOperationByDateController = new GetOperationByDateController();
const updateOperationController = new UpdateOperationController();
const deleteOperationController = new DeleteOperationController();
const getAllOperationsController = new GetAllOperationsController();

// normal user create operation
// operationRouter.post('/operation', ensureUser, createOperationController.handle);
operationRouter.post('/operation', ensureUser, createOperationController.handle);

// normal user can see all their operations

// admin can see details of operations in a date range from a given cpnj
operationRouter.post('/operations/:cnpj', ensureAdmin, getOperationByDateController.handle);

// admin can see all operations 
operationRouter.get('/operations', ensureAdmin, getAllOperationsController.handle);

// admin can edit an operation

operationRouter.put('/operation', ensureAdmin, updateOperationController.handle);

// admin can delete an operation

operationRouter.delete('/operation', ensureAdmin, deleteOperationController.handle);

export {operationRouter};