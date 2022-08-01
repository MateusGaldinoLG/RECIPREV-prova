import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import { makeMockResponse } from "../../mocks/mockResponse";
import { CreateUserController } from "./CreateUserController";

describe('CreateUserController', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM users;')
        await AppDataSource.destroy();
    })

    const createUserController = new CreateUserController();
    const response = makeMockResponse();

    it('Should return 201 if a valid user is created', async () => {
        const request = {
            body: {
                email: 'teste@gmail.com',
                password: '12345678'
            }
        } as Request;

        await createUserController.handle(request, response);

        expect(response.state.status).toBe(201);
        expect(response.state.json).toBeInstanceOf(User);
    })

    it('Should create a superuser if a query is specified', async () => {
        const request = {
            body: {
                email: 'teste2@gmail.com',
                password: '12345678'
            },
            query: {}
        } as Request;
        request.query.admin = 'true';

        await createUserController.handle(request, response);

        expect(response.state.status).toBe(201);
        expect(response.state.json).toBeInstanceOf(User);
        expect((response.state.json as User).is_admin).toBe(true);
    })
})