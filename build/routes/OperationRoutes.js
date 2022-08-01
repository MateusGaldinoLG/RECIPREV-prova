"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationRouter = void 0;
const express_1 = require("express");
const CreateOperationController_1 = require("../controllers/Operation/CreateOperationController");
const DeleteOperationController_1 = require("../controllers/Operation/DeleteOperationController");
const GetAllOperationsController_1 = require("../controllers/Operation/GetAllOperationsController");
const GetOperationByDateController_1 = require("../controllers/Operation/GetOperationByDateController");
const UpdateOperationController_1 = require("../controllers/Operation/UpdateOperationController");
const ensureAuthentications_1 = require("../middlewares/ensureAuthentications");
const operationRouter = (0, express_1.Router)();
exports.operationRouter = operationRouter;
const createOperationController = new CreateOperationController_1.CreateOperationController();
const getOperationByDateController = new GetOperationByDateController_1.GetOperationByDateController();
const updateOperationController = new UpdateOperationController_1.UpdateOperationController();
const deleteOperationController = new DeleteOperationController_1.DeleteOperationController();
const getAllOperationsController = new GetAllOperationsController_1.GetAllOperationsController();
// normal user create operation
// operationRouter.post('/operation', ensureUser, createOperationController.handle);
operationRouter.post('/operation', ensureAuthentications_1.ensureUser, createOperationController.handle);
// normal user can see all their operations
// admin can see details of operations in a date range from a given cpnj
operationRouter.post('/operations/:cnpj', ensureAuthentications_1.ensureAdmin, getOperationByDateController.handle);
// admin can see all operations 
operationRouter.get('/operations', ensureAuthentications_1.ensureAdmin, getAllOperationsController.handle);
// admin can edit an operation
operationRouter.put('/operation', ensureAuthentications_1.ensureAdmin, updateOperationController.handle);
// admin can delete an operation
operationRouter.delete('/operation/:id', ensureAuthentications_1.ensureAdmin, deleteOperationController.handle);
