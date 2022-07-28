import { Request, Response } from "express";
import { AuthenticateUserService } from "../../services/User/AuthenticateUserService";

export class AuthenticateUserController{
    async handle(req: Request, res: Response){
        const authenticateUserService = new AuthenticateUserService();

        const {email, password} = req.body;

        const token = await authenticateUserService.execute({
            email, password
        });

        return res.status(201).json(token);
    }
}