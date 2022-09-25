import { DataSource } from "typeorm";
import { Account } from "./entities/Account";
import { Client } from "./entities/Client";
import { Movement } from "./entities/Movement";
import { Person } from "./entities/Person";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host:'localhost',
    username: 'postgres',
    password:'password',
    port: 5432,
    database: 'useraccount',
    entities: [Person, Client, Account, Movement],
    logging: true,
    synchronize: true
})