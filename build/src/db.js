"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Account_1 = require("./entities/Account");
const Client_1 = require("./entities/Client");
const Movement_1 = require("./entities/Movement");
const Person_1 = require("./entities/Person");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'password',
    port: 5432,
    database: 'useraccount',
    entities: [Person_1.Person, Client_1.Client, Account_1.Account, Movement_1.Movement],
    logging: true,
    synchronize: true
});
