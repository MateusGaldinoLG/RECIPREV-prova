"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRouter = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const viewsRouter = (0, express_1.Router)();
exports.viewsRouter = viewsRouter;
viewsRouter.get('/app', (req, res) => {
    console.log(path_1.default.join(__dirname));
    return res.sendFile(path_1.default.join(__dirname, '/index.html'));
});
viewsRouter.get('/app/login', (req, res) => {
    console.log(path_1.default.join(__dirname));
    return res.sendFile(path_1.default.join(__dirname, '/login.html'));
});
viewsRouter.get('/app/search', (req, res) => {
    console.log(path_1.default.join(__dirname));
    return res.sendFile(path_1.default.join(__dirname, '/search.html'));
});
viewsRouter.get('/app/operations', (req, res) => {
    console.log(path_1.default.join(__dirname));
    return res.sendFile(path_1.default.join(__dirname, '/operations.html'));
});
viewsRouter.get('/app/create', (req, res) => {
    console.log(path_1.default.join(__dirname));
    return res.sendFile(path_1.default.join(__dirname, '/create.html'));
});
