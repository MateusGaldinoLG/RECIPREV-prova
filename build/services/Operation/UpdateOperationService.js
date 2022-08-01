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
exports.UpdateOperationService = void 0;
const data_source_1 = require("../../data-source");
const Operation_1 = require("../../entities/Operation");
class UpdateOperationService {
    execute({ cnpj, date, num_cotas, valor_unitario, numCotasNovo }) {
        return __awaiter(this, void 0, void 0, function* () {
            const operationRepository = data_source_1.AppDataSource.getRepository(Operation_1.Operation).extend(Operation_1.Operation);
            console.log({ cnpj, date, num_cotas, valor_unitario, numCotasNovo });
            const operation = yield operationRepository.findOne({
                where: {
                    cnpj,
                    // date,
                    num_cotas,
                    valor_unitario
                }
            });
            if (!operation) {
                throw new Error('No operation was found');
            }
            if (operation.date.toISOString().split('T')[0] != date.toISOString().split('T')[0]) {
                throw new Error('Wrong operation');
            }
            operation.num_cotas = numCotasNovo;
            const newOperation = yield operationRepository.save(operation);
            return newOperation;
        });
    }
}
exports.UpdateOperationService = UpdateOperationService;
