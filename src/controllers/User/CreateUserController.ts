import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";
import { v4 as uuid } from "uuid";

export class CreateUserController{
    async handle(req: Request, res: Response){
        const createUserService = new CreateUserService();
        
        const {email, password} = req.body;
        const admin = req.query ? ((req.query.admin + '').toLowerCase() === 'true') : undefined;


        const id = uuid();

        // validations...

        const user = await createUserService.execute({
            id,
            email,
            password,
            is_admin: admin
        })

        return res.status(201).json(user);
    }
}