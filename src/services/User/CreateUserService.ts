import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import {User} from '../../entities/User';

interface IUser{
    id: string;
    email: string;
    password: string;
    is_admin?: boolean;
}

export class CreateUserService{
    async execute({id, email, password, is_admin}: IUser){
        const userRepository = AppDataSource.getRepository(User).extend(User);

        const userAlreadyExists = await userRepository.findOne({
            where: [
                {email: email},
            ]
        })

        if(userAlreadyExists){
            throw new Error(`Email ${email} already in use`);
        }

        const hashedPassword = await hash(password, 8);

        if(typeof is_admin === 'undefined'){
            is_admin = false;
        }

        const user = userRepository.create({
            id,
            email,
            password: hashedPassword,
            is_admin: is_admin
        })

        await userRepository.save(user);

        return user;
    }
}