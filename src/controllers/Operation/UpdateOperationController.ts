import { Request, Response } from "express";
import { UpdateOperationService } from "../../services/Operation/UpdateOperationService";


class UpdateOperationController{
    async handle(req: Request, res: Response){
        const updateOperationService = new UpdateOperationService();

        const {cnpj, date, num_cotas, valor_unitario, novo_num_cotas} = req.body;

        const result = updateOperationService.execute({
            cnpj, date, num_cotas, valor_unitario, numCotasNovo: novo_num_cotas
        })

        return res.status(201).json(result);

    }
}

export {UpdateOperationController};