import { Between } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Operation } from "../../entities/Operation";

interface IDates{
    begin_date: Date;
    end_date?: Date;
}

class GetOperationByDateService{
    async execute({begin_date, end_date}: IDates){
        const operationRepository = AppDataSource.getRepository(Operation).extend(Operation);

        if(!end_date){
            end_date = begin_date;
        }

        const operations = await operationRepository.find({
            where: [ 
                {
                    date: Between(
                        begin_date,
                        end_date
                    )
                }
            ]
        })

        if(operations.length == 0){
            throw new Error('No operation in date range');
        }

        return operations;      
    }
}

export {GetOperationByDateService};