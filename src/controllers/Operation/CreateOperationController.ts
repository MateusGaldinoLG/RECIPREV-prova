import { Request, Response } from "express";
import { CreateOperationService } from "../../services/Operation/CreateOperationService";

function formatAsCPNJ(cnpj: string){
    let temp = cnpj
    return temp.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}

class CreateOperationController{
    async handle(req: Request, res: Response){
        const createOperationService = new CreateOperationService();

        const {cnpj, razao_social, tipo, num_cotas, valor_unitario, date} = req.body;

        let newCnpj = formatAsCPNJ(cnpj);

        if(tipo !== "COMPRA" && tipo !== "VENDA"){
            throw new Error('Tipo invalido')
        }

        const operation = await createOperationService.execute({cnpj: newCnpj, razao_social, tipo, num_cotas, valor_unitario, date});

        return res.status(201).json(operation);
    }
}

export {CreateOperationController};