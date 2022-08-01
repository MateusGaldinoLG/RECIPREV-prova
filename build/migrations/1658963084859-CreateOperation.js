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
exports.CreateOperation1658963084859 = void 0;
const typeorm_1 = require("typeorm");
class CreateOperation1658963084859 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'operations',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                    },
                    {
                        name: 'CNPJ',
                        type: 'text'
                    },
                    {
                        name: 'razao_social',
                        type: 'text'
                    },
                    {
                        name: 'tipo',
                        type: 'text'
                    },
                    {
                        name: 'date',
                        type: 'text',
                        default: `DATE('now')`
                    },
                    {
                        name: 'num_cotas',
                        type: 'integer',
                    },
                    {
                        name: 'valor_unitario',
                        type: 'real'
                    }
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateOperation1658963084859 = CreateOperation1658963084859;
