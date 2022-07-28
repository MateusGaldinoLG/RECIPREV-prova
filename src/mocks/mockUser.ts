import { CreateUserService } from "../services/User/CreateUserService";
import { v4 as uuid } from "uuid";

interface IFakeUser{
    email: string;
    password: string;
}

export class MockUser{
    createUserService = new CreateUserService();
    async createUser(fakeUser: IFakeUser){
        const user = await this.createUserService.execute({
            id: uuid(),
            email: fakeUser.email,
            password: fakeUser.password,
        })

        return user;
    }
}