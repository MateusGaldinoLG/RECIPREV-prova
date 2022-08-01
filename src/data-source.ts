import { DataSource } from "typeorm";
import { Operation } from "./entities/Operation";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.NODE_ENV === 'test' ? 'src/database/CVMTeste.sqlite' : 'src/database/CVMOperacoes.sqlite',
    entities: [User, Operation],
    migrations: [`${__dirname}/migrations/*{.js, .ts}`]
})