import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source";
import { operationRouter } from "./routes/OperationRoutes";
import { userRouter } from "./routes/UserRoutes";
import { viewsRouter } from "./views/viewsRouter";

const app = express();
const PORT: number = 3000;

AppDataSource.initialize().then(() => {
    console.log('Initializing typeorm with sqlite');
}).catch(console.error)

app.use(express.json());

// routes
app.use(userRouter);
app.use(operationRouter);
app.use(viewsRouter);

app.get('/', (req: Request, res: Response) => {
    return res.redirect('/app');
})

console.log(process.env.NODE_ENV);

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof Error){
        if(err.message.includes("not found")){
            return response.status(404).json({
                error: err.message
            })
        }
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server Error"
    })
})

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof Error){
        if(err.message.includes("not found")){
            return response.status(404).json({
                error: err.message
            })
        }
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server Error"
    })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is up http://localhost:${PORT}`)
})