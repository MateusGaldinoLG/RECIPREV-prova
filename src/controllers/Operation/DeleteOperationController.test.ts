import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { makeMockResponse } from "../../mocks/mockResponse";
import { CreateOperationService } from "../../services/Operation/CreateOperationService";
import { DeleteOperationController } from "./DeleteOperationController";

describe('DeleteOperationController', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM operations;');
        await AppDataSource.destroy();
    })

    const response = makeMockResponse();
    const deleteOperationController = new DeleteOperationController();
    const createOperationService = new CreateOperationService();

    it('Should return 201 if operation was deleted', async () => {
        const operation = await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: new Date('2021-10-22'),
            num_cotas: 1,
            valor_unitario: 1.03000
        });
        const request = {
            body: {
                id: operation.id
            }
        } as Request;

        await deleteOperationController.handle(request, response);

        expect(response.state.status).toBe(201);
        expect(response.state.json).toBe(`Operation with id ${operation.id} deleted`)
    })

    it('Should return 404 if no operation was found', async () => {
        const request = {
            body: {
                id: 15
            }
        } as Request;

        await deleteOperationController.handle(request, response);

        expect(response.state.status).toBe(404);
        expect(response.state.json).toBe(`Operation not found`)
    })
})