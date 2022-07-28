import express from "express";
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

app.listen(PORT, () => {
    console.log(`Server is up http://localhost:${PORT}`)
})