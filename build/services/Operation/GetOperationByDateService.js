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
exports.GetOperationByDateService = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../../data-source");
const Operation_1 = require("../../entities/Operation");
class GetOperationByDateService {
    execute({ cnpj, begin_date, end_date }) {
        return __awaiter(this, void 0, void 0, function* () {
            const operationRepository = data_source_1.AppDataSource.getRepository(Operation_1.Operation).extend(Operation_1.Operation);
            let operations;
            if (!begin_date) {
                operations = yield operationRepository.find({
                    where: {
                        cnpj: cnpj,
                        date: (0, typeorm_1.LessThanOrEqual)(end_date)
                    }
                });
                // console.log(operations);
            }
            else {
                operations = yield operationRepository.find({
                    where: [
                        {
                            cnpj: cnpj,
                            date: (0, typeorm_1.Between)(begin_date, end_date)
                        }
                    ]
                });
            }
            if (operations.length == 0) {
                throw new Error('No operation in date range');
            }
            return operations;
        });
    }
}
exports.GetOperationByDateService = GetOperationByDateService;
