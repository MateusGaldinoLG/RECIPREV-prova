"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Operation_1 = require("./entities/Operation");
const User_1 = require("./entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: process.env.NODE_ENV === 'test' ? 'src/database/CVMTeste.sqlite' : 'src/database/CVMOperacoes.sqlite',
    entities: [User_1.User, Operation_1.Operation],
    migrations: ["src/migrations/*.ts"]
});
