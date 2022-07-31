import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const JWTKey = 'RECIPREV';

interface IAdminPayload{
    admin: boolean;
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
    // console.log(req);

    if(!jwtoken){
        return res.status(401).json('No Token was Found');
    }

    const token = jwtoken.split(" ")[1];

    try{
        const {admin} = verify(token, JWTKey) as IAdminPayload;
        if(!admin){
            return res.status(401).json('Not Admin');
        }
    } catch (error) {
        return res.status(401).end();
    }

    return next();
}

export {ensureAdmin, ensureUser};