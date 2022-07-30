import { Operation } from "../entities/Operation";

export class OperationDTO extends Operation{
    preco_medio: number;
    retorno: number;
    saldo: number;
}