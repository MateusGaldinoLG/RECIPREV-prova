import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";

interface IAutUser{
    email: string;
    password: string;
}

const JWTKey = 'RECIPREV'

export class AuthenticateUserService{
    async execute({email, password}: IAutUser){
        const userRepository = AppDataSource.getRepository(User).extend(User);

        const user = await userRepository.findOne({
            where: [
                {email: email}
            ]
        })

        if(!user){
            throw new Error('Incorrect Email/Password');
        }

        const passwordMatch: boolean = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error('Incorrect Email/Password');
        }

        const token: string = sign({
            email: user.email,
            admin: user.is_admin
        }, JWTKey!, {
            subject: user.id,
            expiresIn: "1d"
        })

        return token;
    }
}