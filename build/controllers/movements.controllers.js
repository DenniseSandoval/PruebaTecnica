"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovement = exports.updateMovement = exports.getAccountState = exports.getMovements = exports.createMovement = void 0;
const Account_1 = require("../entities/Account");
const Client_1 = require("../entities/Client");
const Movement_1 = require("../entities/Movement");
const createMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountNumber, value } = req.body;
        const account = yield Account_1.Account.getRepository().findOneBy({ accountNumber: accountNumber });
        if (!account) {
            return res.status(404).json({ message: "Cuenta no encontrada" });
        }
        const movement = new Movement_1.Movement();
        const lastMovement = yield Movement_1.Movement.createQueryBuilder('m').orderBy('m.movementId', 'DESC').getOne();
        const balance = (lastMovement === null || lastMovement === void 0 ? void 0 : lastMovement.balance) + (value);
        if (balance <= 0 && value < 0) {
            return res.status(404).json({ message: "Saldo no disponible" });
        }
        const time = Date.now();
        let dateMovement = new Date(time);
        dateMovement.toLocaleDateString();
        movement.date = dateMovement;
        movement.balance = balance;
        movement.value = value;
        movement.movementType = account.accountType;
        movement.account = account;
        yield movement.save();
        const movementAccount = {
            accountNumber: accountNumber,
            accountType: account.accountType,
            initialBalance: account.initialBalance,
            state: account.state,
            movement: value,
            lastBalance: lastMovement === null || lastMovement === void 0 ? void 0 : lastMovement.balance,
            availableBalance: balance
        };
        console.log(movementAccount);
        return res.json(movementAccount);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createMovement = createMovement;
const getMovements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield Account_1.Account.createQueryBuilder('a')
            .select('m.date', 'Fecha')
            .addSelect('c.name', 'Cliente')
            .addSelect('a.accountNumber', 'Numero Cuenta')
            .addSelect('a.accountType', 'Tipo')
            .addSelect('a.initialBalance', 'Saldo Inicial')
            .addSelect('a.state', 'Estado')
            .addSelect('m.value', 'Movimiento')
            .addSelect('m.balance', 'Saldo disponible')
            .innerJoin(Movement_1.Movement, 'm', 'a.accountId = m.account_id')
            .innerJoin(Client_1.Client, 'c', 'c.clientId = a.client_id')
            .getRawMany();
        console.log(clients);
        return res.json(clients);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getMovements = getMovements;
const getAccountState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let totalDebit = 0;
        let totalCredit = 0;
        const clients = yield Account_1.Account.createQueryBuilder('a')
            .select('m.date', 'Fecha')
            .addSelect('c.name', 'Cliente')
            .addSelect('a.accountNumber', 'Numero Cuenta')
            .addSelect('a.accountType', 'Tipo')
            .addSelect('a.initialBalance', 'Saldo Inicial')
            .addSelect('a.state', 'Estado')
            .addSelect('m.value', 'Movimiento')
            .addSelect('m.balance', 'Saldo disponible')
            .innerJoin(Movement_1.Movement, 'm', 'a.accountId = m.account_id')
            .innerJoin(Client_1.Client, 'c', 'c.clientId = a.client_id')
            .where("c.name='" + req.params.client + "' and m.date between '" + req.params.dateInitial + "' and '" + req.params.dateEnd + "'")
            .getRawMany();
        return res.json(clients);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getAccountState = getAccountState;
const updateMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movement = yield Movement_1.Movement.findOneBy({ movementId: req.params.id });
        Movement_1.Movement.update({ movementId: req.params.id }, req.body);
        if (!movement)
            return res.status(404).json({ message: 'No existe movimiento' });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateMovement = updateMovement;
const deleteMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movement = yield Movement_1.Movement.delete({ movementId: req.params.id });
        if (movement.affected === 0) {
            return res.status(404).json({ message: 'No existe movimiento' });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteMovement = deleteMovement;
