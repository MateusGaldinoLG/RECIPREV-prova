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
exports.GetOperationByDateController = void 0;
const GetOperationByDateService_1 = require("../../services/Operation/GetOperationByDateService");
function returnAvaragePrice(operations) {
    let numberQuotas = 0;
    let sum = 0;
    for (let i = 0; i < operations.length; i++) {
        if (operations[i].tipo === 'COMPRA') {
            sum += operations[i].valor_unitario * operations[i].num_cotas;
            numberQuotas += operations[i].num_cotas;
        }
        else {
            sum -= operations[i].valor_unitario * operations[i].num_cotas;
            numberQuotas -= operations[i].num_cotas;
        }
    }
    let total = Number((sum / numberQuotas).toFixed(6));
    return total;
}
function darRetorno(avaragePrice, todaysPrice) {
    let retorno = (todaysPrice / avaragePrice) - 1;
    return Number((retorno * 100).toFixed(4));
}
function darSaldo(operations, valor_unitario) {
    let saldo = 0;
    for (let i = 0; i < operations.length; i++) {
        if (operations[i].tipo === 'COMPRA') {
            saldo += valor_unitario * operations[i].num_cotas;
        }
        else {
            saldo -= valor_unitario * operations[i].num_cotas;
        }
    }
    return saldo;
}
function numQuotas(operations) {
    let num_cotas = 0;
    for (let i = 0; i < operations.length; i++) {
        num_cotas = (operations[i].tipo === 'COMPRA') ? num_cotas + operations[i].num_cotas : num_cotas - operations[i].num_cotas;
    }
    return num_cotas;
}
function formatAsCPNJ(cnpj) {
    let temp = cnpj;
    return temp.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}
class GetOperationByDateController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cnpj = req.params.cnpj;
            const { begin_date, end_date, valor_cotas } = req.body;
            if (cnpj.length === 0) {
                return res.status(401).json('No CPNJ informed');
            }
            let newCnpj = formatAsCPNJ(cnpj);
            const getOperationByDateService = new GetOperationByDateService_1.GetOperationByDateService();
            if (begin_date > new Date() || end_date > new Date()) {
                return res.status(401).json('Invalid Date');
            }
            if (!valor_cotas) {
                return res.status(401).json('No quota value');
            }
            const operations = yield getOperationByDateService.execute({ cnpj: newCnpj, begin_date, end_date });
            const num_cotas = numQuotas(operations);
            const preco_medio = returnAvaragePrice(operations);
            const retorno = darRetorno(preco_medio, valor_cotas);
            const saldo = darSaldo(operations, valor_cotas);
            console.log(newCnpj);
            const operationDetails = {
                cnpj: newCnpj,
                razao_social: operations[0].razao_social,
                date: end_date,
                valor_unitario: valor_cotas,
                num_cotas,
                preco_medio,
                retorno,
                saldo
            };
            return res.status(201).json(operationDetails);
        });
    }
}
exports.GetOperationByDateController = GetOperationByDateController;
