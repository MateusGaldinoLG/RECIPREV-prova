"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const data_source_1 = require("./data-source");
const OperationRoutes_1 = require("./routes/OperationRoutes");
const UserRoutes_1 = require("./routes/UserRoutes");
const viewsRouter_1 = require("./views/viewsRouter");
const app = (0, express_1.default)();
const PORT = 3000;
data_source_1.AppDataSource.initialize().then(() => {
    console.log('Initializing typeorm with sqlite');
}).catch(console.error);
app.use(express_1.default.json());
// routes
app.use(UserRoutes_1.userRouter);
app.use(OperationRoutes_1.operationRouter);
app.use(viewsRouter_1.viewsRouter);
app.use((err, request, response, next) => {
    if (err instanceof Error) {
        if (err.message.includes("not found")) {
            return response.status(404).json({
                error: err.message
            });
        }
        return response.status(400).json({
            error: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server Error"
    });
});
app.use((err, request, response, next) => {
    if (err instanceof Error) {
        if (err.message.includes("not found")) {
            return response.status(404).json({
                error: err.message
            });
        }
        return response.status(400).json({
            error: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server Error"
    });
});
app.listen(PORT, () => {
    console.log(`Server is up http://localhost:${PORT}`);
});
