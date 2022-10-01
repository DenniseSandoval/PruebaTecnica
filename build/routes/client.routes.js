"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controllers_1 = require("../controllers/client.controllers");
const router = (0, express_1.Router)();
router.post('/clientes', client_controllers_1.createClient);
router.put("/clientes/:id", client_controllers_1.updateClient);
router.delete("/clientes/:id", client_controllers_1.deleteClient);
exports.default = router;
