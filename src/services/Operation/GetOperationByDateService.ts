import { Between, LessThan, LessThanOrEqual } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Operation } from "../../entities/Operation";

interface IOperationDates{
    cnpj: string;
    begin_date?: Date;
    end_date: Date;
}

class GetOperationByDateService{
    async execute({cnpj, begin_date, end_date}: IOperationDates){
        const operationRepository = AppDataSource.getRepository(Operation).extend(Operation);

        let operations: Operation[] | Operation;

        if(!begin_date){
            operations = await operationRepository.find({
                where: {
                        cnpj: cnpj,
                        date: LessThanOrEqual(
                            end_date
                        )
                    }
            })
            // console.log(operations);
        } else {
            operations = await operationRepository.find({
                where: [ 
                    {
                        cnpj: cnpj,
                        date: Between(
                            begin_date,
                            end_date
                        )
                    }
                ]
            })
        }


        if(operations.length == 0){
            throw new Error('No operation in date range');
        }

        return operations;      
    }
}

export {GetOperationByDateService};