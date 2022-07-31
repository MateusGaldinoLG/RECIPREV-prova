import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { makeMockResponse } from "../../mocks/mockResponse";
import { CreateOperationService } from "../../services/Operation/CreateOperationService";
import { UpdateOperationController } from "./UpdateOperationController";

describe('UpdateOperationController', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM operations;');
        await AppDataSource.destroy();
    })

    const createOperationService = new CreateOperationService();
    const updateOperationController = new UpdateOperationController();
    const response = makeMockResponse();

    
    it('Should return 201 if user is updated', async () => {
        await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: new Date('2021-10-22'),
            num_cotas: 1,
            valor_unitario: 1.03000
        })
        
        const request = {
            body: {
                cnpj: '11.511.517/0001-61',
                date: new Date('2021-10-22'),
                num_cotas: 1,
                valor_unitario: 1.03,
                novo_num_cotas: 3
            }
        } as Request;

        await updateOperationController.handle(request, response);

        expect(response.state.status).toBe(201);
        expect(response.state.json).toMatchObject({
            id: 1,
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'compra',
            date: new Date('2021-10-22'),
            num_cotas: 5,
            valor_unitario: 1.03000
        })
    })
})