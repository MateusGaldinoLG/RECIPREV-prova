import { AppDataSource } from "../../data-source";
import { Operation } from "../../entities/Operation";


class DeleteOperationService{
    async execute(id: number){
        const operationRepository = AppDataSource.getRepository(Operation).extend(Operation);

        const result = await operationRepository.delete({
            id
        });

        return result;
    }
}

export {DeleteOperationService};