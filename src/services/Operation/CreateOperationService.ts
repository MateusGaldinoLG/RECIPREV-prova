import { AppDataSource } from "../../data-source";
import {Operation} from "../../entities/Operation";


interface IOperation{
    cnpj: string;
    razao_social: string;
    tipo: string;
    date?: Date;
    num_cotas: number;
    valor_unitario: number;
}

class CreateOperationService{
    async execute({cnpj, razao_social, tipo, date, num_cotas, valor_unitario}: IOperation){
        const operationRepository = AppDataSource.getRepository(Operation).extend(Operation);

        const operation = operationRepository.create({
            cnpj,
            razao_social,
            tipo,
            date,
            num_cotas,
            valor_unitario
        })

                
        await operationRepository.save(operation);
        
        operation.date = new Date(operation.date); // transform to yyyy-mm-dd

        return operation;
    }

}

export {CreateOperationService};