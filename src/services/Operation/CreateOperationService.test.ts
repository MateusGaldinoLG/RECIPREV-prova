import { AppDataSource } from "../../data-source";
import { Operation } from "../../entities/Operation";
import { CreateOperationService } from "./CreateOperationService";

describe('CreateOperationService', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM operations;');
        await AppDataSource.destroy();
    })

    const createOperationService = new CreateOperationService();

    it('Should create operation', async () => {
        const result = await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: '2021-10-22',
            num_cotas: 1,
            valor_unitario: 1.03000
        })

        expect(result).toMatchObject<Operation>({
            id: 1,
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: '2021-10-22',
            num_cotas: 1,
            valor_unitario: 1.03000
        })
    })

    it('Should create operation with current time if date is not specified', async () => {
        const result = await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            num_cotas: 1,
            valor_unitario: 1.03000
        })

        expect(result.date).toBe(new Date().toISOString().split('T')[0]); //can't compare two now operations directly
    })
})