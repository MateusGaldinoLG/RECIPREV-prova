import { verify } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { MockUser } from "../../mocks/mockUser";
import { AuthenticateUserService } from "./AuthenticateUserService";

interface ITokenPayload{
    email: string;
    admin: string;
    sub: string; // id
}

describe('AuthenticateUserService', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM users;')
        await AppDataSource.destroy();
    })

    const authenticateUserService = new AuthenticateUserService();
    const mockUser = new MockUser();

    it('Should receive token if user logs in correctly', async () => {
        const user = await mockUser.createUser({
            email: 'testingauth@gmail.com',
            password: '12345678'
        })

        const token = await authenticateUserService.execute({email: 'testingauth@gmail.com', password: '12345678'});

        const {email, admin, sub} = verify(token, 'RECIPREV') as ITokenPayload;

        expect(email).toBe('testinauthg@gmail.com');
        expect(admin).toBe(false);
        expect(sub).toBe(user.id);
    })

    it('Should throw error if email is wrong', async () => {
        await expect(authenticateUserService.execute({
            email: 'wrongemail@wrong.com',
            password: '87654321'
        })).rejects.toThrowError('Incorrect Email/Password')
    })
    it('Should throw error if password is wrong', async () => {
        await expect(authenticateUserService.execute({
            email: 'testingauth@gmail.com',
            password: '12345677'
        })).rejects.toThrowError('Incorrect Email/Password')
    })
})