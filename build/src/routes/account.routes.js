"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controllers_1 = require("../controllers/account.controllers");
const router = (0, express_1.Router)();
router.post('/cuentas', account_controllers_1.createAccountUser);
router.put("/cuentas/:id", account_controllers_1.updateAccount);
router.delete("/cuentas/:id", account_controllers_1.deleteAccount);
exports.default = router;
