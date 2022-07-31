import { Request, Response } from "express";
import { DeleteOperationService } from "../../services/Operation/DeleteOperationService";

class DeleteOperationController{
    async handle(req: Request, res: Response){
        const deleteOperationService = new DeleteOperationService();

        const {id} = req.body;

        const result = await deleteOperationService.execute(id);

        if(result.affected == 0){
            return res.status(404).json('Operation not found');
        }

        return res.status(201).json(`Operation with id ${id} deleted`);
    }
}

export {DeleteOperationController};