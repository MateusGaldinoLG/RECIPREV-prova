import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const JWTKey = 'RECIPREV';

interface IAdminPayload{
    is_admin: boolean;
}

function ensureUser(req: Request, res: Response, next: NextFunction){
    const jwtoken = req.headers.authorization;

    if(!jwtoken){
        return res.status(401).end();
    }

    const token = jwtoken.split(" ")[1];

    try{
        verify(token, JWTKey);
        // req.user_id = sub;
    } catch (error) {
        return res.status(401).end();
    }

    return next();
}

function ensureAdmin(req: Request, res: Response, next: NextFunction){
    const jwtoken = req.headers.authorization;

    if(!jwtoken){
        return res.status(401).end();
    }

    const token = jwtoken.split(" ")[1];

    try{
        const {is_admin} = verify(token, JWTKey) as IAdminPayload;
        if(!is_admin){
            res.status(401).end();
        }
    } catch (error) {
        return res.status(401).end();
    }

    return next();
}

export {ensureAdmin, ensureUser};