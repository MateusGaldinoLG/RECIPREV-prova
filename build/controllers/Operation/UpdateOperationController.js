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
exports.UpdateOperationController = void 0;
const UpdateOperationService_1 = require("../../services/Operation/UpdateOperationService");
class UpdateOperationController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateOperationService = new UpdateOperationService_1.UpdateOperationService();
            const { cnpj, date, num_cotas, valor_unitario, novo_num_cotas } = req.body;
            const result = updateOperationService.execute({
                cnpj, date: new Date(date), num_cotas, valor_unitario, numCotasNovo: parseFloat(novo_num_cotas)
            });
            return res.status(201).json(result);
        });
    }
}
exports.UpdateOperationController = UpdateOperationController;
