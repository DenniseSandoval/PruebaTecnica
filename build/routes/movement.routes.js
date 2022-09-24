"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movements_controllers_1 = require("../controllers/movements.controllers");
const router = (0, express_1.Router)();
router.post('/movimientos', movements_controllers_1.createMovement);
router.get('/movimientos', movements_controllers_1.getMovements);
exports.default = router;
