import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { userRouter } from "./routes/UserRoutes";

const app = express();
const PORT: number = 3000;

AppDataSource.initialize().then(() => {
    console.log('Initializing typeorm with sqlite');
}).catch(console.error)

app.use(express.json());

// routes
app.use(userRouter);

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

app.listen(PORT, () => {
    console.log(`Server is up http://localhost:${PORT}`)
})