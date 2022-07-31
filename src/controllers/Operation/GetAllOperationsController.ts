import { Request, Response } from "express";
import { GetAllOperationsService } from "../../services/Operation/GetAllOperationsService";


export class GetAllOperationsController{
    async handle(req: Request, res: Response){
        const getAllOperationsService = new GetAllOperationsService();

        const operations = await getAllOperationsService.execute();

        return res.status(201).json(operations);
    }
}