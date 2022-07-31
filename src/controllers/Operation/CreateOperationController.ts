import { Request, Response } from "express";
import { CreateOperationService } from "../../services/Operation/CreateOperationService";


class CreateOperationController{
    async handle(req: Request, res: Response){
        const createOperationService = new CreateOperationService();

        const {cnpj, razao_social, tipo, num_cotas, valor_unitario, date} = req.body;

        if(tipo !== "COMPRA" && tipo !== "VENDA"){
            throw new Error('Tipo invalido')
        }

        const operation = await createOperationService.execute({cnpj, razao_social, tipo, num_cotas, valor_unitario, date});

        return res.status(201).json(operation);
    }
}

export {CreateOperationController};