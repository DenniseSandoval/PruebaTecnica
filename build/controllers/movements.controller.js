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
exports.createMovement = void 0;
const Account_1 = require("../entities/Account");
const Movement_1 = require("../entities/Movement");
const createMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountNumber, accountType, initialBalance, state, value } = req.body;
        const account = yield Account_1.Account.getRepository().findOneBy({ accountNumber: accountNumber });
        if (!account) {
            return res.status(500).json({ message: "Account not found" });
        }
        const movement = new Movement_1.Movement();
        const balance = initialBalance + value;
        const time = Date.now();
        let dateMovement = new Date(time);
        dateMovement.toLocaleDateString();
        movement.date = dateMovement;
        movement.movementType = accountType;
        movement.balance = balance;
        movement.value = value;
        movement.account = account;
        yield movement.save();
        const movementAccount = {
            accountNumber: accountNumber,
            type: accountType,
            initialBalance: initialBalance,
            state: state,
            movement: value
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
