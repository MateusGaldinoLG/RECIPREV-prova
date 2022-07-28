import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Operation } from "../../entities/Operation";
import { makeMockResponse } from "../../mocks/mockResponse";
import { CreateOperationController } from "./CreateOperationController";

describe('CreateOperationController', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM operations;');
        await AppDataSource.destroy();
    })

    const createOperationController = new CreateOperationController();
    const response = makeMockResponse();

    it('Should return 201 if operation is created', async () => {
        const request = {
            body: {
                cnpj: '11.511.517/0001-61',
                razao_social: 'Fundo exemplo',
                tipo: 'COMPRA',
                date: '2021-10-22',
                num_cotas: 1,
                valor_unitario: 1.03000
            }
        } as Request;

        await createOperationController.handle(request, response);

        expect(response.state.status).toBe(201);
        expect(response.state.json).toBeInstanceOf(Operation);
    })

    it('Should throw error if operation type is not valid', async () => {
        const request = {
            body: {
                cnpj: '11.511.517/0001-61',
                razao_social: 'Fundo exemplo',
                tipo: 'ERRO',
                date: '2021-10-22',
                num_cotas: 1,
                valor_unitario: 1.03000
            }
        } as Request;

        await expect(createOperationController.handle(request, response)).rejects.toThrowError('Tipo invalido')
    })
})