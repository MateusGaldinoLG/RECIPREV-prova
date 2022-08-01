import { Request, Response } from "express";
import { DeleteOperationService } from "../../services/Operation/DeleteOperationService";

class DeleteOperationController{
    async handle(req: Request, res: Response){
        const deleteOperationService = new DeleteOperationService();

        const {id} = req.params;

        if(isNaN(parseInt(id))){
            return res.status(401).json('Not a Number');
        }

        const result = await deleteOperationService.execute(parseInt(id));

        if(result.affected == 0){
            return res.status(404).json('Operation not found');
        }

        return res.status(201).json(`Operation with id ${id} deleted`);
    }
}

export {DeleteOperationController};