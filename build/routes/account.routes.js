"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controllers_1 = require("../controllers/account.controllers");
const router = (0, express_1.Router)();
router.post('/cuentas', account_controllers_1.createAccountUser);
exports.default = router;
