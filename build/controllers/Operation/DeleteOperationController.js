"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOperationController = void 0;
const DeleteOperationService_1 = require("../../services/Operation/DeleteOperationService");
class DeleteOperationController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteOperationService = new DeleteOperationService_1.DeleteOperationService();
            const { id } = req.params;
            console.log(id);
            if (isNaN(parseInt(id))) {
                return res.status(401).json('Not a Number');
            }
            const result = yield deleteOperationService.execute(parseInt(id));
            if (result.affected == 0) {
                return res.status(404).json('Operation not found');
            }
            return res.status(201).json(`Operation with id ${id} deleted`);
        });
    }
}
exports.DeleteOperationController = DeleteOperationController;
