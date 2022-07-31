import { AppDataSource } from "../../data-source";
import { Operation } from "../../entities/Operation";

interface IUpdateOperation{
    cnpj: string;
    date: Date;
    num_cotas: number;
    valor_unitario: number;
    numCotasNovo: number;
}

class UpdateOperationService{
    async execute({cnpj, date, num_cotas, valor_unitario, numCotasNovo}: IUpdateOperation){
        const operationRepository = AppDataSource.getRepository(Operation).extend(Operation);

        const operation = await operationRepository.findOne({
            where: {
                cnpj,
                date,
                num_cotas,
                valor_unitario
            }
        })

        if(!operation){
            throw new Error('No operation was found');
        }

        operation.num_cotas = numCotasNovo;

        const newOperation = await operationRepository.save(operation);

        return newOperation;

        
    }
}

export {UpdateOperationService};