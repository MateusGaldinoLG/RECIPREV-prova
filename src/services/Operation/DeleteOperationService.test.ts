import { AppDataSource } from "../../data-source";
import { CreateOperationService } from "./CreateOperationService";
import { DeleteOperationService } from "./DeleteOperationService";

describe('DeleteOperationService', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM operations;');
        await AppDataSource.destroy();
    })

    const createOperationService = new CreateOperationService();
    const deleteOperationService = new DeleteOperationService();

    it('Should delete operation', async () => {
        const operation = await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: new Date('2021-10-22'),
            num_cotas: 1,
            valor_unitario: 1.03000
        });

        const result = await deleteOperationService.execute(operation.id);

        expect(result.affected).toBe(1);
    })

    it('Should not delete if operation was not found', async () => {
        const result = await deleteOperationService.execute(15);

        expect(result.affected).toBe(0);
    })
})