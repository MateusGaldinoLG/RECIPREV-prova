import { Request, Response, Router } from "express";
import path from 'path';

const viewsRouter = Router();

viewsRouter.get('/app', (req: Request, res: Response) => {
    // console.log(path.join(__dirname));
    return res.sendFile(path.join(__dirname, '/index.html'))
})

viewsRouter.get('/app/login', (req: Request, res: Response) => {
    // console.log(path.join(__dirname));
    return res.sendFile(path.join(__dirname, '/login.html'))
})

viewsRouter.get('/app/search', (req: Request, res: Response) => {
    // console.log(path.join(__dirname));
    return res.sendFile(path.join(__dirname, '/search.html'))
})

viewsRouter.get('/app/operations', (req: Request, res: Response) => {
    // console.log(path.join(__dirname));
    return res.sendFile(path.join(__dirname, '/operations.html'))
})
viewsRouter.get('/app/create', (req: Request, res: Response) => {
    // console.log(path.join(__dirname));
    return res.sendFile(path.join(__dirname, '/create.html'))
})

export {viewsRouter};