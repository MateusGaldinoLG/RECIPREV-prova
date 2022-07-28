import { AppDataSource } from "../../data-source";
import { CreateUserService } from "./CreateUserService";
import {v4 as uuid} from 'uuid';
import { User } from "../../entities/User";
import { compare } from "bcryptjs";

interface ICompareUser{
    id: string;
    email: string;
    is_admin: boolean;
}

describe('CreateUserService', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM users')
        await AppDataSource.destroy();
    })

    const createUserService = new CreateUserService();

    it('Should return the created user', async () => {
        let id = uuid();
        const result = await createUserService.execute({
            id: id,
            email: 'testing@gmail.com',
            password: '12345678'
        })

        let passwordCompare = await compare('12345678', result.password)

        expect(result).toMatchObject<ICompareUser>({id: id, email: 'testing@gmail.com', is_admin: false});
        expect(passwordCompare).toBe(true);

    })
    it('Should return the created superuser', async () => {
        const result = await createUserService.execute({
            id: uuid(),
            email: 'testing2@gmail.com',
            password: '12345678',
            is_admin: true
        })

        expect(result.is_admin).toBe(true);
        
    })
    it('Should throw error if email is already used', async () => {
        const result = await createUserService.execute({
            id: uuid(),
            email: 'testing3@gmail.com',
            password: '12345678'
        })

        await expect(createUserService.execute({
            id: uuid(),
            email: result.email,
            password: '87654321'
        })).rejects.toThrowError('Email testing3@gmail.com already in use')
    })
})