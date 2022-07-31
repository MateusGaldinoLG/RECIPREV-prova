import { AppDataSource } from "../../data-source";
import { CreateOperationService } from "./CreateOperationService";
import { UpdateOperationService } from "./UpdateOperationService";

describe('UpdateOperationService', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM operations;');
        await AppDataSource.destroy();
    })

    const createOperationService = new CreateOperationService();
    const updateOperationService = new UpdateOperationService();

    it('Should update operation', async () => {
        const oldOperation = await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: new Date('2021-10-22'),
            num_cotas: 1,
            valor_unitario: 1.03000
        })

        const newOperation = await updateOperationService.execute({
            cnpj: '11.511.517/0001-61',
            date: oldOperation.date,
            num_cotas: oldOperation.num_cotas,
            valor_unitario: oldOperation.valor_unitario,
            numCotasNovo: oldOperation.num_cotas + 4
        });

        expect(newOperation).toMatchObject({
            id: 1,
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: new Date('2021-10-22'),
            num_cotas: 5,
            valor_unitario: 1.03000
        })
    })

    it('Should throw error if no operation was found', async () => {
        await expect(updateOperationService.execute({
            cnpj: '11.511.517/0001-61',
            date: new Date('2020-10-22'),
            num_cotas: 1,
            valor_unitario: 1.03000,
            numCotasNovo: 12341
        })).rejects.toThrowError('No operation was found');
    })
})