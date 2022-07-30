import { Request, Response } from "express";
import { OperationDTO } from "../../DTO/OperationDTO";
import { Operation } from "../../entities/Operation";
import { GetOperationByDateService } from "../../services/Operation/GetOperationByDateService";

function returnAvaragePrice(operations: Operation[]){
    let numberOperations = operations.length;
    let sum = 0;
    for(let i = 0; i < numberOperations; i++){
        sum += operations[i].valor_unitario*operations[i].num_cotas;
    }

    return sum / numberOperations;
}

function darRetorno(avaragePrice: number, todaysPrice: number){
    let retorno = todaysPrice/avaragePrice - 1;

    return retorno;
}

class GetOperationByDateController{
    async handle(req: Request, res: Response){
        const {begin_date, end_date, valor_cotas} = req.body;

        const getOperationByDateService = new GetOperationByDateService();

        if(begin_date > new Date() || end_date > new Date()){
            return res.status(401).send('Invalid Date');
        }

        const operations = await getOperationByDateService.execute({begin_date, end_date});
        const preco_medio = returnAvaragePrice(operations);
        const retorno = darRetorno(preco_medio, valor_cotas);

        const operationDetails: OperationDTO[] = [];
        
        operations.forEach((operation) => {
            let saldo = operation.valor_unitario*operation.num_cotas;
            let operationDTO: OperationDTO = {...operation, preco_medio, retorno, saldo};

            operationDetails.push(operationDTO);
        })

        return res.status(201).json(operationDetails);
    }
}

export {GetOperationByDateController}