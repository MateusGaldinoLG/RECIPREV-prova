import { AppDataSource } from "../../data-source";
import { Operation } from "../../entities/Operation";
import { CreateOperationService } from "./CreateOperationService";
import { GetOperationByDateService } from "./GetOperationByDateService";

describe('GetOperationByDateService', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM operations;');
        await AppDataSource.destroy();
    })

    const createOperationService = new CreateOperationService();
    const getOperationByDateService = new GetOperationByDateService();
    
    it('Should return created operation in given date', async () => {
        const result = await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: new Date('2021-10-22'),
            num_cotas: 1,
            valor_unitario: 1.03000
        })

        const operation = await getOperationByDateService.execute({
            begin_date: new Date('2021-10-22')
        });

        expect(operation).toHaveLength(1);
        expect(operation[0]).toBeInstanceOf(Operation);
    })

    it('Should return created operations in given range', async () => {
        await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: new Date('2021-10-23'),
            num_cotas: 1,
            valor_unitario: 1.03000
        })

        await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: new Date('2021-10-24'),
            num_cotas: 1,
            valor_unitario: 1.03000
        })

        const operations = await getOperationByDateService.execute({
            begin_date: new Date('2021-10-22'),
            end_date: new Date('2021-10-24')
        });

        console.log(operations);

        expect(operations).toHaveLength(3); // 1 do test passado + 2 do test atual

        operations.forEach((operation) => {
            expect(operation).toBeInstanceOf(Operation);
        })        
    })

    it('Should return error if no operation is in date range', async () => {
        await expect(getOperationByDateService.execute({
            begin_date: new Date('2022-07-30')
        })).rejects.toThrowError('No operation in date range')
    })
})