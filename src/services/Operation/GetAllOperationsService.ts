import { AppDataSource } from "../../data-source";
import { Operation } from "../../entities/Operation";


export class GetAllOperationsService{
    async execute(){
        const operationRepository = AppDataSource.getRepository(Operation).extend(Operation);

        const operations = await operationRepository.find();

        return operations;
    }
}