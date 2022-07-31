import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { OperationDTO } from "../../DTO/OperationDTO";
import { makeMockResponse } from "../../mocks/mockResponse";
import { CreateOperationService } from "../../services/Operation/CreateOperationService";
import { GetOperationByDateController } from "./GetOperationByDateController";

describe('GetOperationByDateController', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM operations;');
        await AppDataSource.destroy();
    })

    const getOperationByDateController = new GetOperationByDateController();
    const createOperationService = new CreateOperationService();
    const response = makeMockResponse();

    it('should return 201 if operation was found', async () => {
        await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'COMPRA',
            date: new Date('2021-07-22'),
            num_cotas: 1,
            valor_unitario: 1.00
        })

        await createOperationService.execute({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            tipo: 'COMPRA',
            date: new Date('2021-07-23'),
            num_cotas: 2,
            valor_unitario: 1.04000
        })

        const request = {
            body: {
                end_date: new Date('2021-07-23'),
                valor_cotas: 1.04,
            },
            params: {}
        } as Request;
        request.params.cnpj = '11.511.517/0001-61'

        await getOperationByDateController.handle(request, response);
        console.log(response.state.json);

        expect(response.state.status).toBe(201);
        expect(response.state.json).toMatchObject({
            cnpj: '11.511.517/0001-61',
            razao_social: 'Fundo exemplo',
            date: new Date('2021-07-23'),
            valor_unitario: 1.04,
            num_cotas: 3,
            preco_medio: 1.026667,
            retorno: 1.2987,
            saldo: 3.12
        });
    })

    it('Should return 401 if date is wrong', async () => {
        const request = {
            body: {
                end_date: new Date('2023-01-01'),
                valor_cotas: 1.04,
            },
            params: {}
        } as Request;
        request.params.cnpj = '11.511.517/0001-61'

        await getOperationByDateController.handle(request, response);

        expect(response.state.status).toBe(401);
        expect(response.state.json).toBe('Invalid Date')
    })

    it('Should return 401 if quota value is wrong', async () => {
        const request = {
            body: {
                end_date: new Date('2021-01-01'),
            },
            params: {}
        } as Request;
        request.params.cnpj = '11.511.517/0001-61'

        await getOperationByDateController.handle(request, response);

        expect(response.state.status).toBe(401);
        expect(response.state.json).toBe('No quota value')
    })

    it('Should return 401 if quota value is wrong', async () => {
        const request = {
            body: {
                end_date: new Date('2021-01-01'),
                valor_cotas: 1.04
            },
            params: {}
        } as Request;
        // request.params.cnpj = '11.511.517/0001-61'

        await getOperationByDateController.handle(request, response);

        expect(response.state.status).toBe(401);
        expect(response.state.json).toBe('No CPNJ informed');
    })
})