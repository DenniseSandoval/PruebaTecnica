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
exports.createAccountUser = void 0;
const Account_1 = require("../entities/Account");
const Client_1 = require("../entities/Client");
const createAccountUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountNumber, accountType, initialBalance, state, name } = req.body;
        let userInfo = new Client_1.Client();
        const userId = yield Client_1.Client.getRepository().findOneBy({ name: name });
        if (!userId) {
            return res.status(500).json({ message: "Client not found" });
        }
        const accountUser = new Account_1.Account();
        accountUser.accountNumber = accountNumber;
        accountUser.accountType = accountType;
        accountUser.initialBalance = initialBalance;
        accountUser.state = state;
        accountUser.client = userId !== null && userId !== void 0 ? userId : userInfo;
        yield accountUser.save();
        const user = {
            accountNumber: accountNumber,
            type: accountType,
            initialBalance: initialBalance,
            state: state,
            client: name
        };
        console.log(accountUser);
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createAccountUser = createAccountUser;
